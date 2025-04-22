const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Path to data.json
const dataPath = path.join(__dirname, "../data/data.json");

// Read events data
const readEvents = () => {
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading events data:", err);
    return [];
  }
};

router.post("/", (req, res) => {
  const { query } = req.body;
  if (!query) return res.json({ results: [] });

  try {
    const events = readEvents();
    const searchQuery = query.toLowerCase();

    const results = events
      .filter((event) => {
        return (
          event.title.toLowerCase().includes(searchQuery) ||
          event.location.toLowerCase().includes(searchQuery)
        );
      })
      .map((event) => ({
        id: event.id,
        title: event.title,
        location: event.location,
      }));

    res.json({ results });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ results: [] });
  }
});

module.exports = router;
