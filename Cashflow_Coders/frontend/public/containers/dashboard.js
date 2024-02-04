import React from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  render() {
    const containerStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundImage: `url(${require('../assets/img/header.jpg')})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };

    // Define custom button styles
    const buttonStyle = {
      borderRadius: '30px', // Adjust border-radius for curved edges
      padding: '10px 30px', // Increase padding for bigger buttons
      fontSize: '1.5rem', // Adjust font size for bigger buttons
    };

    return (
      <div style={containerStyle}>
        {/* Render buttons in the middle */}
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-3 text-center">
              {/* Use Link component to navigate to Level 1 page */}
              <Link to="/stock">
                {/* Apply custom button style */}
                <button className="btn btn-primary btn-lg mb-2" style={buttonStyle}>Level1</button>
              </Link>
            </div>
            <div className="col-md-3 text-center">
              <Link to="/level2">
                <button className="btn btn-secondary btn-lg mb-2" style={buttonStyle}>Level2</button>
              </Link>
            </div>
            <div className="col-md-3 text-center">
              <Link to='/level3'>
                <button className="btn btn-success btn-lg mb-2" style={buttonStyle}>Level3</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
