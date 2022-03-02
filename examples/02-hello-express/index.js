import express from "express";

const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello there!").end();
});

app.get("/another-page", (req, res) => {
  res.send("Another page!").end();
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
