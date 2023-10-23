import React, { useState } from "react";
import "./RoundCheckbox.css"; // Import the CSS file for styling

const RoundCheckbox = ({ value, selectedValue, onCheckboxChange, name }) => {
  const isChecked = value === selectedValue;

  const toggleCheckbox = () => {
    onCheckboxChange(value);
  };

  return (
    <label className="round-checkbox-label">
      <input
        type="checkbox"
        className="round-checkbox-input"
        checked={isChecked}
        onChange={toggleCheckbox}
      />
      <span className="round-checkbox-custom"> </span>
      <span className="label">{name}</span>
    </label>
  );
};

export default RoundCheckbox;
