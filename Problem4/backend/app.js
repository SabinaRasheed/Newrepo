const express = require("express");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");
const cors = require("cors");
const session = require("express-session");

const app = express();
const port = 5000;

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sabina123",
  database: "hackathon",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the MySQL database");
  }
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies to be sent with requests
  })
);

// Session setup
app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true }, // Set secure: true in production with HTTPS
}));

// Login API
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const [user] = await db.promise().query("SELECT * FROM users WHERE username = ?", [username]);
    
    if (user.length === 0) {
      return res.status(401).json({ message: "Incorrect username." });
    }

    // Check password (assuming plaintext in the database)
    if (password === user[0].password) {
      // Store user info in session
   
      res.json({ user: user[0], message: "Login successful!" });
    } else {
      return res.status(401).json({ message: "Incorrect password." });
    }
  } catch (err) {
    console.error("Error during login", err);
    return res.status(500).json({ error: "Something went wrong during authentication." });
  }
});

// Endpoint to fetch performance summary data
app.get('/api/performance-summary/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const [rows] = await db.promise().query("SELECT * FROM performance_summary WHERE user_id = ? ORDER BY call_date DESC LIMIT 1", [userId]);
    
    if (rows.length > 0) {
      res.json(rows[0]);  // Send the latest performance summary data for the user
    } else {
      res.status(404).json({ message: 'No performance data found for this user.' });
    }
  } catch (err) {
    console.error('Error fetching performance data:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
