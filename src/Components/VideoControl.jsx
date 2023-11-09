import React, { useState } from "react";

const VideoControl = ({ onSelectTime }) => {
  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");

  const handleStartInputChange = (e) => {
    setStartInput(e.target.value);
  };

  const handleEndInputChange = (e) => {
    setEndInput(e.target.value);
  };

  const handleSelectTime = () => {
    // Convert the input values to numeric values (in seconds)
    const startTime = parseFloat(startInput);
    const endTime = parseFloat(endInput);

    if (!isNaN(startTime) && !isNaN(endTime)) {
      // Ensure that the start time is less than the end time
      if (startTime < endTime) {
        onSelectTime(startTime, endTime);
        
      } else {
        alert("Start time must be less than end time.");
      }
    } else {
      alert("Invalid input. Please enter numeric values.");
    }
  };

  return (
    <div style={{marginTop:"2rem",display:"flex", flexDirection:"column", gap:".2rem"}}>
      <label>Start Time (seconds):</label>
      <input type="text" value={startInput} onChange={handleStartInputChange} />
      <br />
      <label>End Time (seconds):</label>
      <input type="text" value={endInput} onChange={handleEndInputChange} />
      <br />
      <button onClick={handleSelectTime}>Select Time</button>
    </div>
  );
};

export default VideoControl;
