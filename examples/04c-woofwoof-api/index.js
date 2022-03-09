import express from "express";
import mongodb from "mongodb";

// Configuring the MongoClient to talk to our local MongoDB
const mongoClient = new mongodb.MongoClient("mongodb://localhost:27017");
// Connecting the client to the database
mongoClient.connect();
// Grabbing the woofwoof-api database
const db = mongoClient.db("woofwoof-api");
// Picking out the dogs collection
const collection = db.collection("dogs");

const PORT = 4649;

const app = express();

app.use(express.json());

app.get("/dogs", async (request, response) => {
  const dogs = await collection.find({}).toArray();

  response.json(dogs);
});

app.post("/dogs", async (request, response) => {
  const dogPic = request.body;

  await collection.insertOne(dogPic);

  response.status(200).end();
});

app.listen(PORT, () => {
  console.log(`WoofWoof is up and running @ http://localhost:${PORT}`);
});
