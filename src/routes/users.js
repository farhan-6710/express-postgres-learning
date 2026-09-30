import { Router } from "express";
import pool from "../db/pool.js";

const router = Router();

router.get("/users", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, name, email, phone_number FROM users ORDER BY id"
    );
    res.json({ users: rows });
  } catch (error) {
    console.error("Get users failed:", error.message);
    res.status(500).json({ error: "could not fetch users" });
  }
});

router.post("/users", async (req, res) => {
  const { name, email, phone_number } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO users (name, email, phone_number)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, phone_number`,
      [name, email, phone_number ?? null]
    );

    res.status(201).json({ user: rows[0] });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ error: "email already exists" });
    }
    console.error("Create user failed:", error.message);
    res.status(500).json({ error: "could not create user" });
  }
});

export default router;
