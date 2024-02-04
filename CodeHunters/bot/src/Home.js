// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
  return (
    <div className="home-container">
      <h1 id="h1">Holistic Health Care Hub</h1>
      <Link to="/get-started">
        <button className="get-started-button">Get Started</button>
      </Link>
    </div>
  );
};

export default Home;