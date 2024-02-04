import React, { useEffect, useState } from "react";
import home_background from "../images/homepage_bg.jpg";
import { Link } from 'react-router-dom';

const Home = () => {
  const backgroundStyle = {
    // backgroundImage: `url(${home_background})`, // Use backticks to create a template literal
    // backgroundColor: 'black',
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  };
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch('http://localhost:5000/')
  //     .then(response => response.text())
  //     .then(data => {
  //       // Set the data in state
  //       setData(data);

  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // }, []);  // Empty dependency array means this effect runs once on mount

  return (
    <div style={backgroundStyle}>
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.55)",
          color: "black",
          margin: "20px",
          padding: "20px",
        }}
      >
        <div className="container mt-5">
          <h1>Welcome to Your AgriBot</h1>
          <p className="lead">Your personalized crop recommendation system!</p>

          <div className="row mt-4">
            <div className="col-md-6">
              <h2>Machine Learning</h2>
              {/* <p>
              Explore with us the wonders of AI powered tools.
            </p> */}
              <p>
                Our ML model helps you predict crop yield after analyzing
                factors such as temperature, rainfall, and soil composition of a
                particular region.
                {/* The model can provide an estimate of the yield for a specific crop */}
              </p>
            </div>

            {/* <div className="col-md-6">
            <h2>About Us</h2>
            <p>
              Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue.
            </p>
            <p>
              Vestibulum id ligula porta felis euismod semper.
            </p> */}
            {data && <p>{data}</p>}
            {/* </div> */}
          </div>
        </div>
        <div>
          <h4>
            <Link to="/prediction" style={{ color: "green" }}>
              Click here to predict your future
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Home;
