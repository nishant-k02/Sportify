const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const eventsFilePath = path.join(__dirname, '../data/data.json');

const readEvents = () => {
  const data = fs.readFileSync(eventsFilePath, 'utf8');
  return JSON.parse(data);
};

const writeEvents = (events) => {
  fs.writeFileSync(eventsFilePath, JSON.stringify(events, null, 2), 'utf8');
};

// GET all or filtered
router.get('/', (req, res) => {
  const category = req.query.category;
  let events = readEvents();

  if (category) {
    events = events.filter(event =>
      event.title.toLowerCase().includes(category.toLowerCase())
    );
  }

  res.json(events);
});

// GET single event by id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const events = readEvents();
  const event = events.find(e => e.id === id);

  if (!event) return res.status(404).json({ error: 'Event not found' });

  res.json(event);
});

// POST review
router.post('/:id/review', (req, res) => {
  const id = parseInt(req.params.id);
  const { reviewer, comment } = req.body;

  if (!reviewer || !comment) {
    return res.status(400).json({ error: 'Reviewer and comment required' });
  }

  const events = readEvents();
  const event = events.find(e => e.id === id);

  if (!event) return res.status(404).json({ error: 'Event not found' });

  event.reviews = event.reviews || [];
  event.reviews.push({ reviewer, comment, date: new Date().toISOString() });

  writeEvents(events);

  res.status(201).json({ message: 'Review added successfully' });
});

module.exports = router;
