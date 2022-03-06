import { MongoClient } from "mongodb";
import { createServer } from "./server.js";

// Use a MongoDB url from the environment if it exists,
// otherwise use a locally running one.
const DB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017";
const DB_NAME = "mongodb-express-api";

// Use PORT from the environment or default to 8080.
const PORT = process.env.PORT || 8080;

/**
 * The main startup function.
 *
 * This function connects to MongoDB and starts the server. Wrapping the startup
 * in an async function allows us to use `await` syntax instead of promises.
 */
async function main() {
  // We want to connect to the database before we start the server
  // since the server depends on a working database connection.
  const client = new MongoClient(DB_URL);
  await client.connect();

  const db = client.db(DB_NAME);

  // We pass the connected database to the server
  // so it becomes available to all handlers.
  const server = createServer(db);

  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// We make sure to catch any unhandled errors, log them and exit.
main().catch((err) => {
  console.error("Something went wrong!", err);

  // process.exit() takes an exit code. 0 indicates that everything went
  // OK, anything else indicates an error.
  process.exit(1);
});
