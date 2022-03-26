import express from "express";
import mongodb from "mongodb";
import cors from "cors";

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017";
const PORT = process.env.PORT || 4649;

// Configuring the MongoClient to talk to MongoDB
const mongoClient = new mongodb.MongoClient(MONGODB_URL);
// Connecting the client to the database
mongoClient.connect();
// Grabbing the woofwoof-api database
const db = mongoClient.db("woofwoof-api");
// Picking out the dogs collection
const collection = db.collection("dogs");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

const requestLogger = (request, response, next) => {
  const timestamp = new Date().toISOString();
  const method = request.method;
  const url = request.url;

  const currentTimeMs = Date.now();

  const logString = `${timestamp} ${method} ${url}`;
  console.log(logString);

  request.on("end", () => {
    const elapsedTimeMs = Date.now() - currentTimeMs;

    console.log(`${logString} ${elapsedTimeMs}ms`);
  });

  next();
};

app.use(requestLogger);

app.get("/dogs", async (request, response) => {
  const query = request.query;

  let filter = {};
  if (query.containsPuppy) {
    filter.containsPuppy = query.containsPuppy === "true";
  }
  if (query.breed) {
    // Case-insensitive substring matching using regular expressions
    filter.breed = { $regex: new RegExp(query.breed, "i") };
  }

  const dogs = await collection.find(filter).toArray();

  response.json(dogs);
});

app.get("/dogs/:dogId", async (request, response) => {
  const dogId = request.params.dogId;

  const dog = await collection.findOne({ _id: dogId });

  if (dog) {
    response.json(dog);
  } else {
    response.sendStatus(404);
  }
});

app.patch("/dogs/:dogId", async (request, response) => {
  const dogId = request.params.dogId;
  const requestBody = request.body;

  const documentCount = await collection.count({ _id: dogId });
  const dogExists = documentCount === 1;

  if (dogExists) {
    await collection.updateOne({ _id: dogId }, { $set: requestBody });
    response.sendStatus(200);
  } else {
    response.sendStatus(404);
  }
});

app.delete("/dogs/:dogId", async (request, response) => {
  const dogId = request.params.dogId;

  const documentCount = await collection.count({ _id: dogId });
  const dogExists = documentCount === 1;

  if (dogExists) {
    await collection.deleteOne({ _id: dogId });
    // response.status(200).end();
    response.sendStatus(200);
  } else {
    response.sendStatus(404);
  }
});

app.post("/dogs", async (request, response) => {
  const dogPic = request.body;

  await collection.insertOne(dogPic);

  response.status(200).end();
});

app.listen(PORT, () => {
  console.log(`WoofWoof is up and running @ http://localhost:${PORT}`);
});
