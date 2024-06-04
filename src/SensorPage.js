import React, { useState, useEffect } from "react";
import { ref as databaseRef, set, onValue } from "firebase/database";
import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase/firebaseConfig";

const SensorPage = () => {
  const [sensorData, setSensorData] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [captureStatus, setCaptureStatus] = useState("Idle");
  const [isCaptureInitiated, setIsCaptureInitiated] = useState(false);

  const fetchImage = async () => {
    try {
      const imageRef = storageRef(storage, "data/photo.jpg");
      const url = await getDownloadURL(imageRef);
      setImageUrl(url);
    } catch (error) {
      console.error("Error fetching image URL:", error);
    }
  };

  const handleCaptureImage = async () => {
    try {
      await set(databaseRef(db, "AutoFeeder/captureSwitch"), 1);
      setCaptureStatus("Processing...");
      setIsCaptureInitiated(true);
      console.log("Capture image trigger set successfully");
    } catch (error) {
      console.error("Error setting capture image trigger:", error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  useEffect(() => {
    const sensorRef = databaseRef(db, "sensors/");
    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      setSensorData(data);
    });
  }, []);

  useEffect(() => {
    const captureSwitchRef = databaseRef(db, "AutoFeeder/captureSwitch");
    onValue(captureSwitchRef, (snapshot) => {
      const captureSwitchValue = snapshot.val();
      if (isCaptureInitiated && captureSwitchValue === 0) {
        setCaptureStatus("Completed");
        setIsCaptureInitiated(false);
      }
    });
  }, [isCaptureInitiated]);

  return (
    <div className="w-full p-4">
      <div className="flex">
        <div className="w-1/2 flex flex-col justify-center items-center bg-indigo-900 rounded h-[80vh]">
          <h1 className="text-5xl font-light mb-2 text-white">Sensor Data</h1>
          <p className="text-lg font-light p-2 w-2/3 border-black border text-blue-600 bg-white">
            pH: {sensorData.ph}
          </p>
          <p className="text-lg font-light p-2 w-2/3 border-black border text-gray-500 bg-white">
            Turbidity: {sensorData.turbidity}
          </p>
          <p className="text-lg font-light p-2 w-2/3 border-black border text-red-500 bg-white">
            Temperature: {sensorData.temperature} Celsius
          </p>
          <div className="mt-3 flex w-2/3 justify-between">
            <button
              className="btn bg-gray-400 rounded p-2 text-indigo-900 text-lg hover:text-indigo-600"
              onClick={handleCaptureImage}
            >
              Feed Fish
            </button>
            <button
              className="btn bg-gray-400 rounded p-2 text-indigo-900 text-lg hover:text-indigo-600"
              onClick={fetchImage}
            >
              Refresh Image
            </button>
          </div>
          {isCaptureInitiated && (
            <div className="mt-3 text-lg text-white">
              Status: {captureStatus}
            </div>
          )}
        </div>
        <div className="flex flex-col w-1/2 justify-center items-center">
          <h1 className="w-100 text-center text-3xl font-light text-indigo-700">
            Camera
          </h1>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Firebase"
              className="w-3/4 h-3/4 rounded mt-5"
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SensorPage;
