// GetSymptoms.js

import React, { useState } from "react";
import "./GetSymptoms.css"; // Import the external CSS file
import NavBar from "./NavBar";

const GetSymptoms = () => {
  const [diseaseName, setDiseaseName] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setDiseaseName(event.target.value);
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/get_symptoms?disease=${diseaseName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setSymptoms(result);
      } else {
        console.error("Error fetching symptoms:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="get-started-container">
        <NavBar />
      </div>
    <div className="container">
      <input
        type="text"
        value={diseaseName}
        onChange={handleInputChange}
        placeholder="Type disease name..."
        className="inputField"
        />
      <button onClick={handleSearch} disabled={loading} className="searchButton">
        {loading ? "Searching..." : "Search"}
      </button>

      {symptoms.length > 0 && (
          <div className="symptomsContainer">
          <h2>Symptoms for {diseaseName}:</h2>
          <ul className="symptomList">
            {symptoms.map((symptom, index) => (
                <li key={index} className="symptomItem">
                {symptom}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
      </>
  );
};

export default GetSymptoms;
