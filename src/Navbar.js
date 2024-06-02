// src/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 text-indigo-950">
      <div className="container mx-auto flex items-center">
        <div className=" text-xl font-bold w-1/3">fEEsheries </div>
        <div className="">
          <div className="space-x-10 text-black font-bold">
            <Link to="/" className="text-lg font-medium hover:text-indigo-300">
              Home
            </Link>
            <Link
              to="/sensor"
              className="text-lg font-medium hover:text-indigo-300"
            >
              Sensor
            </Link>
            <Link
              to="/fish-selection"
              className="text-lg font-medium hover:text-indigo-300"
            >
              Fish Selection
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
