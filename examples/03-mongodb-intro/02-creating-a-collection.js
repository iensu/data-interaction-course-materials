const getConnectedClient = require("./01-connecting-to-mongodb");

(async () => {
  const client = await getConnectedClient("mongodb://localhost:27017");

  // You don't need to create the database before hand, it will be created
  // as needed when you start adding documents to one of its collections.
  const db = client.db("temp-db");

  // A database is made up of one or more collections of documents. Collections
  // are also created as documents are added to them.
  const collection = db.collection("todos");

  const todo = {
    task: "Do laundry",
    isDone: false,
    createdAt: new Date().toUTCString(),
  };

  const receipt = await collection.insertOne(todo);

  console.log("Receipt:", receipt);

  // Disconnect from the database, try commenting this out and see what happens
  // when you run the script.
  await client.close();
})();
