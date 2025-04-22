const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const HISTORY_FILE = path.join(__dirname, "../data/history.json");

function readHistory() {
  if (!fs.existsSync(HISTORY_FILE)) return [];
  return JSON.parse(fs.readFileSync(HISTORY_FILE, "utf-8"));
}

function writeHistory(data) {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(data, null, 2), "utf-8");
}

router.post("/", (req, res) => {
  const { username, query, results } = req.body;

  if (!username || !query || !Array.isArray(results)) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const history = readHistory();
  const entry = {
    username,
    query,
    timestamp: new Date().toISOString(),
    results,
  };

  history.push(entry);
  writeHistory(history);

  res.status(201).json({ message: "Search history saved." });
});

router.get("/:username", (req, res) => {
  const history = readHistory();
  const userHistory = history.filter(
    (item) => item.username === req.params.username
  );
  res.json(userHistory);
});

module.exports = router;
