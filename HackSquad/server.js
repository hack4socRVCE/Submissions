const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/hacksoc', { useNewUrlParser: true, useUnifiedTopology: true });


//schema 
//-----------------------------------------------------------------------
const UserSchema = new mongoose.Schema({
  UPI_id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  report: {
    type: [{ upiId_of_fraudster: String, reportDetails: String }],
    required: false,
  },
  balance: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
  }
});

const User = mongoose.model('User', UserSchema);
//------------------------------------------------------------------------------

app.use(bodyParser.json());

//------------------------------------------------------------------------------
app.post('/signup', async (req, res) => {
  const { UPI_id, password, initialBalance } = req.body;

  try {
    // Check if the UPI_id already exists
    const existingUser = await User.findOne({ UPI_id });

    if (existingUser) {
      return res.status(400).json({ error: 'UPI_id already exists' });
    }

    // Create a new user with initial balance
    const newUser = new User({
      UPI_id,
      password, // In a production environment, you should hash the password
      report: [],
      balance: parseInt(initialBalance), // Convert initialBalance to an integer
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//-----------------------------------------------------------------------------

app.post('/report', async (req, res) => {
  const { reportedUPIID, report } = req.body;

  try {
    const reportedUser = await User.findOne({ UPI_id: reportedUPIID });

    if (!reportedUser) {
      return res.status(400).json({ error: 'User not found' });
    }

    reportedUser.report.push({ upiId: reportedUPIID, reportDetails: report });
    await reportedUser.save();

    res.status(201).json({ message: 'Report submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//------------------------------------------------------------------------------
app.post('/login', async (req, res) => {
  const { UPI_id, password } = req.body;

  try {
    const user = await User.findOne({ UPI_id });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // In a production environment, you should compare hashed passwords using a library like bcrypt
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // You can add more checks or generate a token for authentication

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//-------------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:"+PORT);
});