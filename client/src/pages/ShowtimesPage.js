import React, { useState, useEffect } from "react";
import { fetchTheatreAreas, fetchShowtimes } from "../services/FinnkinoAPI";
import TimeSelector from "../components/TimeSelector";
import LocationSelector from "../components/LocationSelector";
import Header from "../components/Header";
import Footer from "../components/Footer";
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
  const [isMessageVisible, setIsMessageVisible] = useState(true); // Track message visibility

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
        setIsMessageVisible(true); // Show loading message while fetching
        try {
          const showtimesData = await fetchShowtimes(
            selectedArea,
            selectedDate
          );
          if (showtimesData.length === 0) {
            setError("No showtimes available for the selected date and area.");
            setShowtimes([]); // Clear showtimes
          } else {
            setShowtimes(groupShowtimesByTime(showtimesData));
            setError(null); // Clear any previous error
          }
        } catch (err) {
          setError("Failed to load showtimes.");
          setShowtimes([]); // Clear showtimes on error
        } finally {
          setLoadingShowtimes(false);
          setIsMessageVisible(false); // Hide loading message after data is fetched
        }
      }
    };

    fetchShowtimesData();
  }, [selectedArea, selectedDate]);

  const groupShowtimesByTime = (showtimes) => {
    const grouped = {};
    showtimes.forEach((show) => {
      const startTime = new Date(show.startTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }); // Format time as HH:MM:SS AM/PM
      if (!grouped[startTime]) {
        grouped[startTime] = [];
      }
      grouped[startTime].push(show);
    });
    return grouped;
  };

  // Function to format date in DD.MM.YYYY format
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, "0")}.${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${d.getFullYear()}`;
  };

  return (
    <>
      <Header />
      <h1 className="showtimes-title">Show Times</h1>
      <div className="container">
        {error && <p className="error-message">{error}</p>}

        <div className="selector-container">
          <TimeSelector
            selectedDate={selectedDate}
            onDateChange={(newDate) => setSelectedDate(newDate)}
            disabled={loadingAreas || loadingShowtimes}
          />

          <LocationSelector
            areas={areas}
            selectedArea={selectedArea}
            onAreaChange={(newArea) => setSelectedArea(newArea)}
            disabled={loadingAreas || loadingShowtimes}
          />
        </div>

        {/* Loading message visible only during data fetch */}
        {loadingShowtimes && isMessageVisible && (
          <p className="loading-message">Loading showtimes...</p>
        )}

        {/* Showtimes list */}
        {!loadingShowtimes && !error && (
          <div className="showtimes-list">
            {Object.keys(showtimes).length > 0 ? (
              <div className="date-container">
                <div className="date-image-container">
                  <h2 className="date-title">{formatDate(selectedDate)}</h2>
                </div>
              </div>
            ) : (
              <p className="no-showtimes-message">
                No showtimes available for the selected date and area.
              </p>
            )}
            {Object.keys(showtimes).map((time, index) => (
              <div key={index} className="showtime-group">
                <h3 className="showtime-header">{time}</h3>
                {showtimes[time].map((show, idx) => (
                  <div key={idx} className="showtime-item">
                    <h3>{show.title}</h3>
                    <p>
                      <strong>Theatre:</strong> {show.theatre}
                    </p>
                    <p>
                      <strong>Start Time:</strong>{" "}
                      {new Date(show.startTime).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* No showtimes message */}
        {showtimes.length === 0 && !loadingShowtimes && !error && (
          <p>No showtimes available for the selected date and area.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ShowtimesPage;
