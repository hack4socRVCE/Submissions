import React from 'react';
import './style.css'; // Import your CSS file

const Loader = () => {
  return (
    <>
      <div id="loader">
        <div className="image-stack">
          <img className="img-1" src="https://icons8.com/icon/M0Lg9WEve1cw/police" alt="Icon 1" />
          <img className="img-2" src="https://icons8.com/icon/5383/police-badge" alt="Icon 2" />
        </div>
      </div>
    </>
  );
};

export default Loader;
