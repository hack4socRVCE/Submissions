import React from 'react';
import './style.css'; // Import your CSS file

const Loader = () => {
  return (
    <>
      <div id="loader">
        <div className="image-stack">
          <img className="img-1" src="https://img.icons8.com/external-ddara-fill-ddara/64/external-yoga-yoga-poses-ddara-fill-ddara-52.png" alt="Icon 1" />
          <img className="img-2" src="https://img.icons8.com/external-ddara-fill-ddara/64/external-yoga-yoga-poses-ddara-fill-ddara-42.png" alt="Icon 2" />
          <img className="img-3" src="https://img.icons8.com/external-ddara-fill-ddara/64/external-yoga-yoga-poses-ddara-fill-ddara-24.png" alt="Icon 3" />
          <img className="img-4" src="https://img.icons8.com/external-ddara-fill-ddara/64/external-yoga-yoga-poses-ddara-fill-ddara-16.png" alt="Icon 4" />
        </div>
      </div>
    </>
  );
};

export default Loader;
