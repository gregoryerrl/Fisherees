// src/HomePage.js
import React, {useState, useEffect} from "react";
import {ref as databaseRef, onValue} from "firebase/database";
import {ref as storageRef, getDownloadURL} from "firebase/storage";
import {db, storage} from "./firebase/firebaseConfig";

const HomePage = () => {
  const [sensorData, setSensorData] = useState({});
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = storageRef(storage, "data/photo.jpg");
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    };

    fetchImage();
  }, []);

  useEffect(() => {
    const sensorRef = databaseRef(db, "sensors/");
    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      setSensorData(data);
    });
  }, []);

  return (
    <div className="p-20 w-full">
      <div className="w-1/3">
        <h1 className="text-4xl font-light mb-4">Sensor Data</h1>
        <p className="p-2 border">pH: {sensorData.ph}</p>
        <p className="p-2 border">Turbidity: {sensorData.turbidity}</p>
        <p className="p-2 border">Temperature: {sensorData.temperature}</p>
      </div>
      {imageUrl ? (
        <img src={imageUrl} alt="Firebase" className="w-60 h-60 rounded" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HomePage;
