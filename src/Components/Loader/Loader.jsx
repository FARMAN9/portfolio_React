import React from 'react';
import './Loader.css';
import bac from '../../assets/bac.svg';

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <img src={bac} alt="Loading..." className="loader-spinner" />
        <h2>Loading Portfolio...</h2>
      </div>
    </div>
  );
}

export default Loader;
