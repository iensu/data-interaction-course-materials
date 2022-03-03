const readline = require("readline");
const getConnectedClient = require("./01-connecting-to-mongodb");

/**
 * Pauses execution and prompts user for input.
 */
const nextQuery = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(`Run query ${JSON.stringify(query, null, 2)}?`, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
};

(async () => {
  const client = await getConnectedClient("mongodb://localhost:27017");
  const db = client.db("mongodb-intro");
  const collection = db.collection("todos");

  let query = {}; // An empty query object ({}) matches all documents
  await nextQuery(query);

  // Use the collection.find() method to find documents.
  const allTodos = await collection.find(query).toArray(); // We turn the result into an array
  console.log(allTodos);

  // We can use the query object to find specific documents
  query = { isDone: true };
  await nextQuery(query);
  const doneTodos = await collection.find(query).toArray();

  console.log(doneTodos);

  // On numeric fields we can use the $gte (greater-than-or-equal) operator
  // to filter out high priority TODOs.
  query = { priority: { $gte: 6 } };
  await nextQuery(query);
  const highPrioTodos = await collection.find(query).toArray();
  console.log(highPrioTodos);

  // There are MANY different operators:
  // https://docs.mongodb.com/manual/reference/operator/query/
  // We can use the $regex (regular expression) operator to match
  // on partial strings
  // Read more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
  query = { task: { $regex: /laundry/ } };
  await nextQuery(query);
  const laundryTodos = await collection.find(query).toArray();

  console.log(laundryTodos);

  await client.close();
})();
