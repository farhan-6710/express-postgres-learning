import express from "express";
import pingRouter from "./routes/ping.js";
import usersRouter from "./routes/users.js";

const app = express();

app.use(express.json());
app.use(pingRouter);
app.use(usersRouter);

export default app;
