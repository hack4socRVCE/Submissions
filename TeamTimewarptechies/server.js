import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hack',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error: ', err);
  } else {
    console.log('Connected to the database');
  }
});

app.post('/login', async (req, res) => {
    const sql = 'SELECT * FROM signup WHERE email = ?';
    db.query(sql,[req.body.email],(err,data) =>{
      if(err)
      return res.json({Error:"Login error in server"});
    if(data.length>0){
            console.log("password entered", req.body.password)
            console.log("password in db",data[0].password)
          if(req.body.password!=data[0].password)
          {
          return res.status(401).json({ success: false, message: 'Invalid credentials' });
          }
        if(req.body.password==data[0].password)
        {
          res.json({ success: true, message: 'Login successful', redirect: '/home' });
        }
        else {
          return res.json({Error:"Login error in server"});
        }
        
    }
    else {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    })
});

// Define your API endpoints for handling signup, login, etc.
// Example:
app.post('/signup', (req, res) => {
    const {fname, lname,aadhar,dob,email,phoneno,age,sex,address,password,isdoctor,lickey } = req.body;
  
    // Check if the email is already registered
    db.query('SELECT * FROM signup WHERE email = ?', [email], (error, results) => {
      if (error) {
        console.error('Database query error: ', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
  
      if (results.length > 0) {
        // Email is already registered
        return res.status(400).json({ success: false, message: 'Email is already registered' });
      }
  
      // If email is not registered, proceed with user registration
      db.query('INSERT INTO signup (fname, lname,aadhar,dob,email,phoneno,age,sex,address,password,isdoctor,lickey) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', [fname, lname,aadhar,dob,email,phoneno,age,sex,address,password,isdoctor,lickey], (error) => {
        if (error) {
          console.error('Database query error: ', error);
          return res.status(500).json({ success: false, message: 'Internal server error' });
        }
  
        // User registration successful
        res.json({ success: true, message: 'User signed up successfully' });
      });
    });
  });

// Start the server
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});