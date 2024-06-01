// src/FishSelectionPage.js
import React, {useState} from "react";
import {ref, set} from "firebase/database";
import {db} from "./firebase/firebaseConfig";

const FishSelectionPage = () => {
  const [fishType, setFishType] = useState("");
  const [weight, setWeight] = useState("");
  const [numberOfFishes, setNumberOfFishes] = useState("");

  const handleSubmit = () => {
    const feederRef = ref(db, "AutoFeeder/");
    set(feederRef, {
      fishType,
      weight,
      numberOfFishes,
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Fish Selection</h1>
      <div className="mb-4">
        <label className="block mb-2">Fish Type:</label>
        <input
          type="text"
          value={fishType}
          onChange={(e) => setFishType(e.target.value)}
          className="p-2 border border-gray-400 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Weight:</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="p-2 border border-gray-400 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Number of Fishes:</label>
        <input
          type="number"
          value={numberOfFishes}
          onChange={(e) => setNumberOfFishes(e.target.value)}
          className="p-2 border border-gray-400 rounded w-full"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default FishSelectionPage;
