const express = require("express");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");
const cors = require("cors");
const session = require("express-session");

const app = express();
const port = 5000;

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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, 
  })
);


app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }, 
  })
);

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const [user] = await db
      .promise()
      .query("SELECT * FROM users WHERE username = ?", [username]);

    if (user.length === 0) {
      return res.status(401).json({ message: "Incorrect username." });
    }

    if (password === user[0].password) {

      res.json({ user: user[0], message: "Login successful!" });
    } else {
      return res.status(401).json({ message: "Incorrect password." });
    }
  } catch (err) {
    console.error("Error during login", err);
    return res
      .status(500)
      .json({ error: "Something went wrong during authentication." });
  }
});

app.get("/api/performance-summary/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const [rows] = await db
      .promise()
      .query(
        "SELECT * FROM performance_summary WHERE user_id = ? ORDER BY call_date DESC LIMIT 1",
        [userId]
      );

    if (rows.length > 0) {
      res.json(rows[0]); 
    } else {
      res
        .status(404)
        .json({ message: "No performance data found for this user." });
    }
  } catch (err) {
    console.error("Error fetching performance data:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/performance-metrics", async (req, res) => {
  try {
    const userId = req.query.userId; 
    console.log(userId);

    const query = `
  
             SELECT 
    DAYOFWEEK(call_timestamp) AS day_of_week,
    COUNT(*) AS total_calls,
    SUM(call_duration) AS total_call_duration,
    AVG(call_duration) AS average_call_duration,
    SUM(CASE WHEN call_outcome = 'connected' THEN 1 ELSE 0 END) AS connected_calls,
    SUM(CASE WHEN call_outcome IN ('answered', 'agent_hung_up', 'missed') THEN 1 ELSE 0 END) AS not_connected_calls,
    SUM(CASE WHEN call_type = 'inbound' THEN 1 ELSE 0 END) AS inbound_calls,
    SUM(CASE WHEN call_type = 'outbound' THEN 1 ELSE 0 END) AS outbound_calls,
    SUM(CASE WHEN call_outcome = 'missed' THEN 1 ELSE 0 END) AS missed_calls,
    SUM(CASE WHEN call_outcome = 'user_busy' THEN 1 ELSE 0 END) AS user_busy_calls,
    SUM(CASE WHEN call_outcome = 'not_attended' THEN 1 ELSE 0 END) AS not_attended_calls
FROM calls
WHERE 
    user_id = ?
    AND call_timestamp BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
GROUP BY day_of_week;
    `;


    const [results] = await db.promise().query(query, [userId]);


    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const metrics = {
      days: [],
      totalCalls: [],
      totalCallDuration: [],
      avgCallDuration: [],
      connectedCalls: [],
      notConnectedCalls: [],
    };

    results.forEach((row) => {
      metrics.days.push(days[row.day_of_week - 1]); 
      metrics.totalCalls.push(row.total_calls);
      metrics.totalCallDuration.push(row.total_call_duration);
      metrics.avgCallDuration.push(row.average_call_duration); 
      metrics.connectedCalls.push(row.connected_calls);
      metrics.notConnectedCalls.push(row.not_connected_calls);
    });

    res.json(metrics); 
  } catch (error) {
    console.error("Error fetching performance metrics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
