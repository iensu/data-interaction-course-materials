/**
   !! MAKE A COPY OF THIS FILE CALLED exercises.js !!

   Find the Digimons!

   You are going to use your mad MongoDB skillz to find the lost Digimons in
   the data set. Can you collect them all??!

   Running the tests will populate your database:

     npm test

   Example of a Digimon:

     {
       "_id": "62212bbf189c7a88b12e3586",
       "number": 1,
       "digimon": "Kuramon",
       "stage": "Baby",
       "type": "Free",
       "attribute": "Neutral",
       "memory": 2,
       "equipSlots": 0,
       "lv50HP": 590,
       "lv50SP": 77,
       "lv50Atk": 79,
       "lv50Def": 69,
       "lv50Int": 68,
       "lv50Spd": 95
     }

   Once your database has been populated you can use MongoDB Compass to investigate
   the data set more easily.
*/

const COLLECTION = "digimons";

//// FINDING DIGIMONS

// Easier
export const find_all_digimons = async (db) => {
  const result = await db.collection(COLLECTION).find({}).toArray();

  return result;
};

export const find_all_water_digimons = async (db) => {
  throw Error("Not implemented");
};

export const find_all_baby_digimons = async (db) => {
  throw Error("Not implemented");
};

export const find_bakemon = async (db) => {
  throw Error("Not implemented");
};

export const add_mongomon = async (db) => {
  const mongomon = {
    number: 250,
    digimon: "Mongomon",
    stage: "Ultimate",
    type: "Data",
    attribute: "Electric",
    memory: 50,
    equipSlots: 2,
    lv50HP: 1000,
    lv50SP: 60,
    lv50Atk: 70,
    lv50Def: 80,
    lv50Int: 90,
    lv50Spd: 100,
  };

  throw Error("Not implemented");
};

// Intermediate
export const find_all_fire_champions = async (db) => {
  throw Error("Not implemented");
};

export const find_all_digimons_with_lv50HP_below_540 = async (db) => {
  throw Error("Not implemented");
};

export const find_all_free_wind_rookie_digimons = async (db) => {
  throw Error("Not implemented");
};

export const increase_beelzemons_hp_with_320 = async (db) => {
  throw Error("Not implemented");
};

// Harder
export const find_the_digimon_with_the_strongest_attack = async (db) => {
  throw Error("Not implemented");
};

export const find_the_least_intelligent_digimon = async (db) => {
  throw Error("Not implemented");
};

export const find_digimons_number_196_to_200 = async (db) => {
  throw Error("Not implemented");
};

export const find_all_digimons_with_name_beginning_with_F = async (db) => {
  throw Error("Not implemented");
};

export const calculate_the_total_attack = async (db) => {
  throw Error("Not implemented");
};

export const calculate_the_total_SP_for_all_dark_digimons = async (db) => {
  throw Error("Not implemented");
};
