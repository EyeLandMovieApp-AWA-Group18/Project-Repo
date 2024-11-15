import React from "react";

const TimeSelector = ({ selectedDate, onDateChange, disabled }) => {
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    console.log("Date changed to:", newDate); // Debug log
    onDateChange(newDate); // Update parent component's selected date
  };

  return (
    <div>
      <label htmlFor="date">Select Date:</label>
      <input
        type="date"
        id="date"
        value={selectedDate}
        onChange={handleDateChange} // Trigger date change
        min={new Date().toISOString().split("T")[0]} // Minimum date is today
        disabled={disabled} // Disable the date picker if data is loading
      />
    </div>
  );
};

export default TimeSelector;
