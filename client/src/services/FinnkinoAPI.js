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

export const fetchShowtimes = async (areaId, date) => {
  try {
    const url = `https://www.finnkino.fi/xml/Schedule/?area=${areaId}&dt=${date}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch showtimes");
    }
    const data = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");

    const showtimes = Array.from(xmlDoc.getElementsByTagName("Show")).map(
      (show) => ({
        title: show.getElementsByTagName("Title")[0]?.textContent ?? "Unknown",
        theatre:
          show.getElementsByTagName("Theatre")[0]?.textContent ?? "Unknown",
        startTime: show.getElementsByTagName("dttmShowStart")[0]?.textContent,
      })
    );

    return showtimes;
  } catch (error) {
    console.error("Error fetching showtimes:", error);
    return [];
  }
};
