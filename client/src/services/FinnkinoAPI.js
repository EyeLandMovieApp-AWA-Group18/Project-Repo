// Fetch theatre area information (cities, etc.)
export const fetchTheatreAreas = async () => {
  try {
    const response = await fetch("https://www.finnkino.fi/xml/TheatreAreas/");
    if (!response.ok) {
      throw new Error("Failed to fetch theatre areas");
    }
    const data = await response.text(); // Parse the XML response
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");
    const areas = Array.from(xmlDoc.getElementsByTagName("TheatreArea")).map(
      (area) => ({
        id: area.getElementsByTagName("ID")[0].textContent,
        name: area.getElementsByTagName("Name")[0].textContent,
      })
    );
    return areas;
  } catch (error) {
    console.error("Error fetching theatre areas:", error);
    return []; // Return an empty array in case of error
  }
};

// Fetch showtimes for a specific date and theatre area
export const fetchShowtimes = async (areaId, date) => {
  try {
    const url = `https://www.finnkino.fi/xml/Schedule/?area=${areaId}&dt=${date}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch showtimes");
    }
    const data = await response.text(); // Parse the XML response
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");

    const showtimes = Array.from(xmlDoc.getElementsByTagName("Show"))
      .map((show) => {
        const showStart =
          show.getElementsByTagName("dttmShowStart")[0].textContent;
        const showDate = showStart.split("T")[0]; // Extract only the date part

        // Check if the show date matches the selected date
        if (showDate === date) {
          return {
            title: show.getElementsByTagName("Title")[0].textContent,
            theatre: show.getElementsByTagName("Theatre")[0].textContent,
            startTime: showStart,
          };
        }
        return null;
      })
      .filter(Boolean); // Filter out null values (shows that don't match the date)

    // If no showtimes are found, return an empty array
    return showtimes.length > 0 ? showtimes : []; // Return an empty array if no shows
  } catch (error) {
    console.error("Error fetching showtimes:", error);
    return []; // Return an empty array in case of error
  }
};
