// src/FishSelectionPage.js
import React, { useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "./firebase/firebaseConfig";

const FishSelectionPage = () => {
  const [selectedFish, setSelectedFish] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [weight, setWeight] = useState("");
  const [numberOfFishes, setNumberOfFishes] = useState("");
  const [click, setClick] = useState("");
  const [displayFeed, setDisplayFeed] = useState(1);
  const [batch, setBatch] = useState(1);

  let BW;
  let interval;

  const handleFishSelect = (event) => {
    setSelectedFish(event.target.value);
    console.log(`${event.target.value} selected`);
  };

  const handleAgeSelect = (event) => {
    setSelectedAge(event.target.value);
    console.log(`${event.target.value} selected`);
  };

  const calculateClick = async () => {
    switch (selectedAge) {
      case "Fingerling":
        BW = 0.08;
        interval = 6;
        break;
      case "Juvenile":
        BW = 0.06;
        interval = 4;
        break;
      case "Grown-Out":
        BW = 0.04;
        interval = 3;
        break;
      default:
        BW = 0;
    }
    const rawClickValue =
      ((parseFloat(weight) * parseFloat(numberOfFishes) * BW) / 3) * 25;
    const roundedClickValue = Math.ceil(rawClickValue / 25) * 25;
    const displayFeed = roundedClickValue / 25;

    console.log(interval);
    console.log(displayFeed);
    setClick(roundedClickValue.toString());
    setDisplayFeed(displayFeed);
    setBatch(interval);

    // Set feeder steps and interval in Firebase
    await setFeeder(interval, roundedClickValue);
  };

  return (
    <div className="pb-4 pt-6 px-8 h-[100vh]">
      <h1 className="text-4xl font-light w-full text-center">Set Feeder</h1>
      <div className="w-full px-20">
        <div className="mb-4">
          <label className="block mb-2 text-md">Select Type of Fish:</label>
          <select
            value={selectedFish}
            onChange={handleFishSelect}
            className="p-2 border border-gray-400 rounded w-full text-md"
          >
            <option value="">Select Fish</option>
            <option value="Tilapia">Tilapia</option>
            <option value="Maya-Maya">Maya-Maya</option>
            <option value="Hito">Hito</option>
            <option value="Bangus">Bangus</option>
          </select>
        </div>

        <div className="mb-4 text-md">
          <label className="block mb-2">Select Age Range:</label>
          <select
            value={selectedAge}
            onChange={handleAgeSelect}
            className="p-2 border border-gray-400 rounded w-full"
          >
            <option value="">Select Age</option>
            <option value="Fingerling">Fingerling</option>
            <option value="Juvenile">Juvenile</option>
            <option value="Grown-Out">Grown-Out</option>
          </select>
        </div>

        <div className="mb-4 text-md">
          <label className="block mb-2">Weight:</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="p-2 border border-gray-400 rounded w-full"
          />
        </div>

        <div className="mb-4 text-md">
          <label className="block mb-2">Number of Fishes:</label>
          <input
            type="number"
            value={numberOfFishes}
            onChange={(e) => setNumberOfFishes(e.target.value)}
            className="p-2 border border-gray-400 rounded w-full"
          />
        </div>

        <button
          onClick={calculateClick}
          className="bg-indigo-500 text-white text-md p-2 rounded mb-4"
        >
          Submit
        </button>

        {click && (
          <div className="mb-4">
            <p className="block mb-2">
              Feeding {displayFeed * 3} grams per interval
            </p>
            <p className="block mb-2">
              Feeding {displayFeed} {displayFeed > 1 ? "times" : "time"} per
              interval
            </p>

            <p className="block mb-2">
              Feeding {batch} {batch > 1 ? "times" : "time"} per day
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const setFeeder = async (interval, clickValue) => {
  try {
    await set(ref(db, "AutoFeeder/feederInterval"), interval);
    await set(ref(db, "AutoFeeder/feederSteps"), clickValue);
    console.log("Feeder settings updated successfully");
  } catch (error) {
    console.error("Error setting feeder values:", error);
  }
};

export default FishSelectionPage;
