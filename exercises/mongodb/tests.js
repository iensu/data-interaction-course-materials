import { describe, it } from "mocha";
import { expect } from "chai";
import mongodb from "mongodb";
import { populateDb } from "./utils/populate-db.js";
import * as exercises from "./exercises.js";

const MONGODB_URL = "mongodb://localhost:27017";
const MONGODB_DB = "mongodb-exercises";
const MONGODB_COLLECTION = "expectedDigimons";

describe("Digimon data tests!", () => {
  let client;
  let db;

  before(async () => {
    await populateDb(MONGODB_URL, MONGODB_DB, MONGODB_COLLECTION);

    const mongoClient = new mongodb.MongoClient(MONGODB_URL);
    await mongoClient.connect();

    client = mongoClient;
    db = mongoClient.db(MONGODB_DB);
  });

  after(async () => {
    await client.close();
  });

  it("find_all_digimons", async () => {
    const result = await exercises.find_all_digimons(db);

    expect(result).to.have.lengthOf(249);
  });

  it("find_all_water_digimons", async () => {
    const result = await exercises.find_all_water_digimons(db);

    expect(result).to.all.satisfy(
      (ds) => ds.every((d) => d.attribute === "Water"),
      "All must be Water"
    );
    expect(result).to.have.lengthOf(24);
  });

  it("find_all_baby_digimons", async () => {
    const result = await exercises.find_all_baby_digimons(db);

    expect(result).to.all.satisfy(
      (ds) => ds.every((d) => d.stage === "Baby"),
      "All must be Baby"
    );
    expect(result).to.have.lengthOf(5);
  });

  it("find_bakemon", async () => {
    const result = await exercises.find_bakemon(db);

    expect(result).to.have.property("digimon", "Bakemon");
  });

  it("find_all_fire_champions", async () => {
    const result = await exercises.find_all_fire_champions(db);

    expect(result).to.all.satisfy(
      (ds) => ds.every((d) => d.stage === "Champion"),
      "All must be Champions"
    );
    expect(result).to.all.satisfy(
      (ds) => ds.every((d) => d.attribute === "Fire"),
      "All must be Fire"
    );
    expect(result).to.have.lengthOf(10);
  });

  it("find_all_digimons_with_lv50HP_below_540", async () => {
    const result = await exercises.find_all_digimons_with_lv50HP_below_540(db);

    expect(result).to.have.lengthOf(1);
    expect(result[0]).to.have.property("digimon", "Impmon");
  });

  it("find_all_free_wind_rookie_digimons", async () => {
    const result = await exercises.find_all_free_wind_rookie_digimons(db);

    expect(result).to.have.lengthOf(1);
    expect(result[0]).to.have.property("digimon", "Hawkmon");
  });

  it("find_the_digimon_with_the_strongest_attack", async () => {
    const result = await exercises.find_the_digimon_with_the_strongest_attack(
      db
    );

    expect(result).to.have.property("digimon", "Chaosmon");
  });

  it("find_the_least_intelligent_digimon", async () => {
    const result = await exercises.find_the_least_intelligent_digimon(db);

    expect(result).to.have.property("digimon", "Punimon");
  });

  it("find_digimons_number_196_to_200", async () => {
    const expectedDigimons = [
      "Diaboromon",
      "Creepymon",
      "Gallantmon",
      "Dynasmon",
      "Leopardmon",
    ];

    const result = await exercises.find_digimons_number_196_to_200(db);
    const names = result.map((d) => d.digimon);

    expect(result).to.have.lengthOf(5);
    expectedDigimons.forEach((digimon) => {
      expect(names).to.include(digimon);
    });
  });

  it("find_all_digimons_with_name_beginning_with_F", async () => {
    const expectedDigimons = ["Falcomon", "Frigimon", "Flamedramon"];

    const result = await exercises.find_all_digimons_with_name_beginning_with_F(
      db
    );
    const names = result.map((d) => d.digimon);

    expect(result).to.have.lengthOf(3);
    expectedDigimons.forEach((digimon) => {
      expect(names).to.include(digimon);
    });
  });
});
