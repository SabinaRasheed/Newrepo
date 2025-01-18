import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  const query = "SELECT * FROM users where useremail=? and userpassword=?";
  pool.query(query, [email, password], (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "An error occured please try again" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Invalid email or password" });
    }
    updateLoginStatus(results[0].userid);
    updateCheckInTime(results[0].userid);
    results[0].useravailability = "Available";
    results[0].userpassword = undefined;
    res.status(200).json(results[0]);
  });
});

router.put("/logout", (req, res) => {
  const { userid } = req.body;

  const query = "UPDATE users SET useravailability='Offline' where userid=?";
  pool.query(query, [userid], (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "An error occured please try again" });
    }

    updateCheckOutTime(userid);

    res.status(200).json({ message: "Logged out successfully" });
  });
});

router.get("/users", (req, res) => {
  const query = "SELECT * FROM users where userrole='User'";
  pool.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "An error occured please try again" });
    }

    res.status(200).json(results);
  });
});

router.put("/userstatus", (req, res) => {
  const { userid, newStatus } = req.body;

  const query = "UPDATE users SET useravailability=? where userid=?";
  pool.query(query, [newStatus, userid], (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "An error occured please try again" });
    }

    res.status(200).json({ message: "Logged out successfully" });
  });
});

function updateLoginStatus(userId) {
  const query = "UPDATE users SET useravailability='Available' WHERE userid=?";
  pool.query(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
    }
  });
}

function manageAttendance(userId) {
  // Query to fetch the latest check-in where checkouttime is not set yet
  const query = `SELECT * 
    FROM attendance 
    WHERE userid = ? 
    ORDER BY checkin DESC
    LIMIT 1;`;

  pool.query(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
    }
    if (results.length > 0) {
      const latestAttendance = results[0];

      // Calculate the time difference between check-in and check-out
      const checkInTime = new Date(latestAttendance.checkin);
      const checkOutTime = new Date(latestAttendance.checkout);
      const timeDiff = (checkOutTime - checkInTime) / (1000 * 60 * 60); // Difference in hours

      // Log the time difference for debugging
      console.log(`Time difference: ${timeDiff} hours`);

      // Mark attendance based on the time difference (9 hours)
      const attendancestatus = timeDiff >= 9 ? true : false;

      // Update attendance status
      const updateQuery = `UPDATE attendance 
        SET attendance = ? 
        WHERE userid = ? AND checkin = ?`;

      pool.query(
        updateQuery,
        [attendancestatus, userId, latestAttendance.checkin],
        (updateErr, updateResults) => {
          if (updateErr) {
            console.error(updateErr);
            return;
          }
        }
      );
    } else {
      console.log("No completed check-in and checkout found for the user");
    }
  });
}

function updateCheckOutTime(userId) {
  let query =
    "UPDATE attendance SET checkout=NOW() WHERE userid=? AND checkout IS NULL";
  pool.query(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
    }
    manageAttendance(userId);
  });
}

function updateCheckInTime(userId) {
  const query = "insert into attendance (userid) values (?)";
  pool.query(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
    }
  });
}

export default router;
