// src/HomePage.js
import React, { useState, useEffect } from "react";
import { ref as databaseRef, onValue } from "firebase/database";
import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase/firebaseConfig";
import logo from "./images/image 4.png";

const HomePage = () => {
  return (
    <div className="w-full h-[100vh] p-4">
      <div className="flex">
        <div className="w-1/2 flex flex-col justify-center items-center">
          <h1 className="text-6xl font-bold mb-2 text-gray-800">
            <span className="text-indigo-900">Wel</span>come{" "}
            <span className="text-indigo-900">fEEsh</span>ers!
          </h1>
          <p className="w-2/3 text-md text-center">
            Discover the future of aquaculture management with our Web-Based
            Optimal Aquaculture Monitoring and Management platform, enhanced by
            a Solar-Powered Fish Feeder.
          </p>
        </div>
        <div className="flex w-1/2 justify-center">
          <img src={logo} className="w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
