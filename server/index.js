import express from "express";

const app = express();

// Set up the root route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server and listen on a specified port
const PORT = process.env.PORT || 5000; // Use environment port or default to 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
