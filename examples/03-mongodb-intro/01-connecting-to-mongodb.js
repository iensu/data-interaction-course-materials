const mongodb = require("mongodb");

/**
 * Takes a MongoDB url and returns a connected MongoDB client.
 * @param url {string}
 * @returns {mongodb.MongoClient}
 */
async function getConnectedMongoClient(url) {
  const client = new mongodb.MongoClient(url);

  await client.connect();

  return client;
}

module.exports = getConnectedMongoClient;
