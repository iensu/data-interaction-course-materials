import express from "express";
import fs from "fs";

const app = express();

// GET
app.get("/get-what", (req, res) => {
  res.send("https://youtu.be/4m48GqaOz90?t=9").end();
});

// STATUS CODES
{
  app.get("/make-world-peace", (req, res) => {
    res.status(421).send("It's not that simple.").end();
  });
  
  
  app.get("/download/car", (req, res) => {
    res.status(507).end();
  });
}

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
