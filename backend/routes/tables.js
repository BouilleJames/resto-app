const express = require("express");
const router = express.Router();
const Table = require("../models/Table");
const tablesController = require("../controllers/tablesController");

router.post("/api/tables", async (req, res) => {
  try {
    const { tableNumber, totalCovers, status } = req.body;

    // Create a new table entry in the database
    const newTable = await Table.create({
      tableNumber: tableNumber,
      totalCovers: totalCovers,
      status: status,
    });

    res.status(201).json(newTable);
  } catch (error) {
    console.error("Error creating table:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/api/tables", tablesController.getTableStatus);

router.get("/api/tables/status", tablesController.getTableStatus);

module.exports = router;
