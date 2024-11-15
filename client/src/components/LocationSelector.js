import React from "react";

const LocationSelector = ({ areas, selectedArea, onAreaChange }) => {
  return (
    <div>
      <label htmlFor="location-selector">Select Theatre Area:</label>
      <select
        id="location-selector"
        value={selectedArea}
        onChange={(e) => onAreaChange(e.target.value)} // Call parent handler on change
      >
        {areas.map((area) => (
          <option key={area.id} value={area.id}>
            {area.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationSelector;
