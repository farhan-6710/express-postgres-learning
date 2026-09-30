import { Router } from "express";
import pool from "../db/pool.js";

const router = Router();

router.get("/ping-db", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT 1 AS ok");
    res.json({ connected: true, result: rows[0] });
  } catch (error) {
    console.error("Database ping failed:", error.message);
    res.status(500).json({ connected: false });
  }
});

export default router;
