const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Serve data.json
router.get('/events', (req, res) => {
  const filePath = path.join(__dirname, '../data/data.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  res.json(data);
});

// Serve history.json
router.get('/history', (req, res) => {
  const filePath = path.join(__dirname, '../data/history.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  res.json(data);
});

module.exports = router;
