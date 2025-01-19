import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/client", (req, res) => {
  const { name, email, companyid } = req.body;

  pool.query(
    "INSERT INTO Contacts (contactname,contactemail,companyid) VALUES (?, ?,?)",
    [name, email, companyid],
    (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "An error occured please try again" });
      }

      res.status(200).json({ message: "Contact successfully added!" });
    }
  );
});

export default router;
