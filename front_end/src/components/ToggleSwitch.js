import React from 'react';
import './ToggleSwitch.css';

export default function ToggleSwitch({ isChecked, handleToggle }) {
  return (
    <label className="switch">
      <input type="checkbox" checked={isChecked} onChange={handleToggle} />
      <span className="slider round"></span>
    </label>
  );
}
