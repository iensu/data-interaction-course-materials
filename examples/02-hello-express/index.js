import express from 'express';

const app = express();

app.get('/hello', (req, res) => {
  res.send('Hello there!').end();
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
});
