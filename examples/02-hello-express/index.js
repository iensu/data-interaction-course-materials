import express from "express";
import fs from "fs";

const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello there!").end();
});

app.get("/another-page", (req, res) => {
  const contents = fs.readFileSync("beautiful-page.html").toString();

  res.send(contents).end();
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
