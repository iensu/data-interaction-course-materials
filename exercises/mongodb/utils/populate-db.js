import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parse } from "csv-parse/sync";
import mongodb from "mongodb";

const thisFileDirectory = path.dirname(fileURLToPath(import.meta.url));

const csvFile = fs.readFileSync(
  path.join(thisFileDirectory, "../data-sets/digimon.csv")
);

/**
 * Populate the database with Digimon data.
 */
export async function populateDb(url, dbName, collectionName) {
  const contents = parse(csvFile, { columns: true });

  const textFields = ["digimon", "stage", "type", "attribute"];
  const cleanedData = contents.map((entry) => {
    return Object.keys(entry).reduce((modifiedEntry, key) => {
      const value = textFields.includes(key)
        ? entry[key]
        : parseInt(entry[key]);

      return {
        ...modifiedEntry,
        [key]: value,
      };
    }, {});
  });

  const client = new mongodb.MongoClient(url);
  await client.connect();
  const db = client.db(dbName);

  const collections = await db
    .listCollections({ name: collectionName })
    .toArray();

  if (collections.length > 0) {
    await db.collection(collectionName).deleteMany({});
  }

  await db.collection(collectionName).insertMany(cleanedData);

  client.close();
}
