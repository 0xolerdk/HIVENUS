// FoxCircle.js
import React from 'react';
import './FoxCircle.css';

export default function FoxCircle({ isChecked }) {
  return (
    <div className="the-container">
      <div className={`c-window ${isChecked ? 'night' : 'day'}`}>
        <span className="the-sun"></span>
        <span className="the-moon"></span>

        <div className="the-fox">
          <div className="fox-face">
            <section className="eyes left"></section>
            <section className="eyes right"></section> 
            <span className="nose"></span>
            <div className="white-part">
              <span className="mouth"></span>
            </div>
          </div>  
        </div>
      </div>
    </div>
  );
}
