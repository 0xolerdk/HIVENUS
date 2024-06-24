import React, { useState, useEffect } from 'react';
import './FoxCircle.css';

export default function FoxCircle() {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChecked(prevChecked => !prevChecked);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

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
