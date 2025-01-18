import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/assigntask", (req, res) => {
  const { selectedUser, taskTitle, taskDescription, taskDeadline } = req.body;

  pool.query(
    "INSERT INTO tasks (userid, tasktitle, taskdescription, taskdeadline) VALUES (?, ?, ?, ?)",
    [selectedUser, taskTitle, taskDescription, taskDeadline],
    (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "An error occured please try again" });
      }

      res.status(200).json({ message: "Task successfully assigned!" });
    }
  );
});

router.get("/tasks/:id", async (req, res) => {
  const userId = req.params.id; // Assuming userId is available in req.user
  console.log("🚀 ~ router.get ~ userId:", userId);

  try {
    pool.query(
      "SELECT * FROM tasks WHERE userid = ?",
      [userId],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Server Error");
        }
        res.json(results); // Return tasks as JSON
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

export default router;
