import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/company", (req, res) => {
  const { name, email } = req.body;

  pool.query(
    "INSERT INTO KeyAccounts (companyname,companyemail) VALUES (?, ?)",
    [name, email],
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

router.get("/company", async (req, res) => {
  try {
    pool.query(
      "SELECT * FROM KeyAccounts",

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
