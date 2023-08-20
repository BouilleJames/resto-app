const express = require("express");
const router = express.Router();
const Table = require("../models/Table");

router.post("/api/tables", async (req, res) => {
  try {
    const { tableNumber, totalCovers } = req.body;

    // Create a new table entry in the database
    const newTable = await Table.create({
      tableNumber: tableNumber,
      totalCovers: totalCovers,
    });

    res.status(201).json(newTable);
  } catch (error) {
    console.error("Error creating table:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
