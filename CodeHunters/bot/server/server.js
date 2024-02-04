// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a mongoose schema for reminders
const reminderSchema = new mongoose.Schema({
  date: Date,
  time: String,
  reminder: String,
});

const Reminder = mongoose.model('Reminder', reminderSchema);

// API endpoints

// GET all reminders
app.get('/api/reminders', async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST a new reminder
app.post('/api/reminders', async (req, res) => {
  const newReminder = req.body;

  try {
    const createdReminder = await Reminder.create(newReminder);
    res.json(createdReminder);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE a reminder by ID
app.delete('/api/reminders/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deletedReminder = await Reminder.findByIdAndDelete(id);

    if (deletedReminder) {
      res.json(deletedReminder);
    } else {
      res.status(404).json({ error: 'Reminder not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
