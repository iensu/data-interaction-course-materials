/**
 * This script follows the examples from the Intro to Mongo section in
 * the main README file.
 */

import mongodb from "mongodb";

const MONGODB_URL = "mongodb://localhost:27017";
const DATABASE = "mongo-intro";
const COLLECTION = "languages";

/**
 * This is an example of an Immediately Invoked Function Expression.
 * We are declaring and invoking the function at the same time (see
 * the empty parentheses at the bottom of this file).
 *
 * This is a common pattern when you want to use async/await on the
 * top-level of a script without creating an additional named function
 * to do so. Note that we are still wrapping everything in a function,
 * we just don't have to give it a name.
 *
 * Read more here: https://developer.mozilla.org/en-US/docs/Glossary/IIFE
 */
(async () => {
  const client = new mongodb.MongoClient(MONGODB_URL);
  await client.connect(); // We wait for the client to connect before we proceed

  // You don't need to create the database before hand, it will be created
  // as needed when you start adding documents to one of its collections.
  const db = client.db(DATABASE);

  // A database is made up of one or more collections of documents. Collections
  // are also created as documents are added to them.
  const collection = db.collection(COLLECTION);

  await clearCollectionIfExists(db, COLLECTION);

  /*
    Inserting one document
  */
  let receipt = await db.collection(COLLECTION).insertOne({
    name: "JavaScript",
    family: "C",
    year: 1995,
  });

  console.log("🐙 Receipt after inserting JavaScript", receipt);

  /*
    Inserting multiple documents
  */
  const languages = [
    {
      name: "Haskell",
      family: "ML",
      year: 1990,
    },
    {
      name: "Rust",
      family: "ML",
      year: 2010,
    },
    {
      name: "Java",
      family: "C",
      year: 1995,
    },
    {
      name: "Common Lisp",
      family: "Lisp",
      year: 1984,
    },
  ];

  receipt = await db.collection(COLLECTION).insertMany(languages);

  console.log("🐌 Receipt after inserting multiple languages", receipt);

  /*
    Finding: Empty filter returns all documents
   */
  let cursor = db.collection(COLLECTION).find({});
  let result = await cursor.toArray();

  console.log("🦑 All documents", result);

  /*
    Finding: Filtering with a specific property value
  */
  let filter = {
    family: "C", // Matching property exactly
  };
  result = await db.collection(COLLECTION).find(filter).toArray();

  console.log("🐠 All C languages", result);

  /*
    Finding one document
  */
  filter = {
    family: "ML",
  };
  result = await db.collection(COLLECTION).findOne(filter);

  console.log("🐊 Finding one ML language", result);

  /*
    Finding all languages with Java in their name
   */
  filter = {
    name: { $regex: /Java/ },
  };
  result = await db.collection(COLLECTION).find(filter).toArray();

  console.log("🐳 All languages matching Java", result);

  /*
    Sorting: All programming languages sorted by year
  */
  cursor = await db.collection(COLLECTION).find({});
  result = cursor.sort({ year: 1 }).toArray();

  console.log("🦕 Languages sorted by year", result);

  /*
    Delete Java
  */
  receipt = await db.collection(COLLECTION).deleteOne({
    name: "Java",
  });

  console.log("🐡 Receipt after deleting Java", receipt);

  /*
    Updating: Bringing JavaScript to the 2000s
  */
  filter = { name: "JavaScript" };
  const modification = { $set: { year: 2022 } };

  receipt = await db.collection(COLLECTION).updateOne(filter, modification);

  console.log("🦈 Receipt after updating JavaScript", receipt);

  result = await db.collection(COLLECTION).find({}).sort({ name: 1 }).toArray();

  console.log("🦄 Final state of our database", result);

  // Disconnect from the database, try commenting this out and see what happens
  // when you run the script.
  await client.close();
})();

/**
 * Remove all documents from the collection if it already exists,
 * otherwise do nothing.
 * @param db {mongodb.MongoClient}
 * @param collectionName {string}
 */
async function clearCollectionIfExists(db, collectionName) {
  const collections = await db
    .listCollections({ name: collectionName })
    .toArray();

  if (collections.length > 0) {
    await db.collection(collectionName).deleteMany({});
  }
}
