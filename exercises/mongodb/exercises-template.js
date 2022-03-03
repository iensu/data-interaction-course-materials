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

// EASIER
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

// INTERMEDIATE
export const find_all_fire_champions = async (db) => {
  throw Error("Not implemented");
};

export const find_all_digimons_with_lv50Health_below_100 = async (db) => {
  throw Error("Not implemented");
};

export const find_all_free_wind_rookie_digimons = async (db) => {
  throw Error("Not implemented");
};

// HARDER
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
