import express from "express";
import fs from "fs";

const app = express();

app.get("/get-what", (req, res) => {
  res.send("https://youtu.be/4m48GqaOz90?t=9").end();
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
