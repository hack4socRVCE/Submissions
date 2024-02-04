// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import GetStarted from './GetStarted';
import GetSymptoms from "./GetSymptoms";
import PredictDisease from "./PredictDisease";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Schedular from './Schedular';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/get-symptoms" element={<GetSymptoms />} />
        <Route path="/predict-disease" element={<PredictDisease />} />
        <Route path="/schedular" element={<Schedular />} />
      </Routes>
    </>
  );
}

export default App;