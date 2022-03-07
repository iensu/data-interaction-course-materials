import express from "express";

const app = express();
app.use(express.json());

let dataStore = [];

app.put("/object/:objectid", (req, res) => {
    dataStore[req.params.objectid] = req.body;
    res.send(dataStore).end();
});

app.patch("/object/:objectid", (req, res) => {
    dataStore[req.params.objectid] = {
        ...dataStore[req.params.objectid],
        ...req.body
    };
    res.send(dataStore).end();
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
