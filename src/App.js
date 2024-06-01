// src/App.js
import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from "./HomePage";
import FishSelectionPage from "./FishSelectionPage";
import Navbar from "./Navbar";

function App() {
  return (
    <div className="w-screen h-screen bg-orange-50">
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/fish-selection" element={<FishSelectionPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
