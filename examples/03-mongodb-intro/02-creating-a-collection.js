const getConnectedClient = require("./01-connecting-to-mongodb");

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
  const client = await getConnectedClient("mongodb://localhost:27017");

  // You don't need to create the database before hand, it will be created
  // as needed when you start adding documents to one of its collections.
  const db = client.db("mongodb-intro");

  // A database is made up of one or more collections of documents. Collections
  // are also created as documents are added to them.
  const collection = db.collection("todos");

  const todos = require("./todos.json");

  const receipt = await collection.insertMany(todos);

  console.log("Receipt:", receipt);

  // Disconnect from the database, try commenting this out and see what happens
  // when you run the script.
  await client.close();
})();
