import express from "express";

const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello there!").end();
});

app.get("/another-page", (req, res) => {
  res
    .send(
      `
<html>
<head>
  <style>
  body {
    margin: 32px;
    background: hotpink;
    color: darkgreen;
    font-family: arial;
  }
  </style>
</head>
<body>
  <h1>Our beautiful page</h1>
  <marquee>We're serving a string which is rendered as a web page!</marquee>
</body>
</html>
`
    )
    .end();
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
