import React from 'react';
import { Link } from 'react-router-dom';

const Level1 = () => {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="font-weight-bold">Level 1</h1>
        {/* Add your visually appealing content here */}
      </div>

      {/* Button at the bottom of the screen */}
      <div className="fixed-bottom text-center mb-3">
        <Link to="/activate" className="btn btn-primary">
          Next page
        </Link>
      </div>
    </div>
  );
};

export default Level1;
