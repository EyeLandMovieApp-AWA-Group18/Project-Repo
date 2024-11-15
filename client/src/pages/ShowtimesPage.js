import React, { useState, useEffect } from "react";
import { fetchTheatreAreas, fetchShowtimes } from "../services/FinnkinoAPI";
import TimeSelector from "../components/TimeSelector";
import LocationSelector from "../components/LocationSelector";
import "../ShowtimesPage.css";

const ShowtimesPage = () => {
  const [areas, setAreas] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0] // Default to today
  );
  const [loadingAreas, setLoadingAreas] = useState(true);
  const [loadingShowtimes, setLoadingShowtimes] = useState(false);
  const [error, setError] = useState(null);

  // Fetch theatre areas
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const areas = await fetchTheatreAreas();
        setAreas(areas);
        if (areas.length > 0) {
          setSelectedArea(areas[0].id); // Default to the first area
        }
      } catch (err) {
        setError("Failed to load theatre areas.");
      } finally {
        setLoadingAreas(false);
      }
    };

    fetchAreas();
  }, []);

  // Fetch showtimes based on selected area and date
  useEffect(() => {
    const fetchShowtimesData = async () => {
      if (selectedArea && selectedDate) {
        setLoadingShowtimes(true);
        try {
          console.log(
            "Fetching showtimes for area:",
            selectedArea,
            "and date:",
            selectedDate
          ); // Debug log
          const showtimesData = await fetchShowtimes(
            selectedArea,
            selectedDate
          );
          console.log("Showtimes data:", showtimesData); // Debug log
          setShowtimes(showtimesData);
        } catch (err) {
          setError("Failed to load showtimes.");
        } finally {
          setLoadingShowtimes(false);
        }
      }
    };

    fetchShowtimesData();
  }, [selectedArea, selectedDate]); // Re-run when selected area or date changes

  return (
    <div className="container">
      <h1>Showtimes</h1>

      {error && <p className="error-message">{error}</p>}

      <div className="selector-container">
        <TimeSelector
          selectedDate={selectedDate}
          onDateChange={(newDate) => setSelectedDate(newDate)} // Update the date
          disabled={loadingAreas} // Disable date selector while loading areas
        />

        <LocationSelector
          areas={areas}
          selectedArea={selectedArea}
          onAreaChange={(newArea) => setSelectedArea(newArea)} // Update the area
          disabled={loadingAreas} // Disable area selector while loading areas
        />
      </div>

      {loadingShowtimes ? (
        <p>Loading showtimes...</p>
      ) : (
        <div className="showtimes-list">
          {showtimes.length > 0 ? (
            showtimes.map((show, index) => (
              <div key={index} className="showtime-item">
                <h3>{show.title}</h3>
                <p>
                  <strong>Theatre:</strong> {show.theatre}
                </p>
                <p>
                  <strong>Start Time:</strong>{" "}
                  {new Date(show.startTime).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="no-showtimes-message">
              No showtimes available for the selected date and area.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowtimesPage;
