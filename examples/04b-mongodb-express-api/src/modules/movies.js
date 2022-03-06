import { Router } from "express";
import { Db } from "mongodb";

//////////////////
// Route handlers
//////////////////

/**
 * All handler functions take a MongoDB instance and returns an Express
 * handler function which can be registered on the router below. This is
 * one example of higher-order functions.
 */

const addMovieHandler = (db) => async (req, res) => {
  const movie = req.body;

  const result = await db.collection("movies").insertOne(movie);

  res.json({
    id: result.insertedId,
  });
};

const findMovieByIdHandler = (db) => async (req, res) => {
  const movieId = req.params.id;

  if (!ObjectId.isValid(movieId)) {
    res.sendStatus(404);
    return;
  }

  const movie = await db.collection("movies").findOne({
    // We need to wrap our id string in a MongoDB ObjectId
    // for the match to work.
    _id: new ObjectId(movieId),
  });

  if (movie) {
    res.json(movie);
  } else {
    res.sendStatus(404);
  }
};

const findAllMoviesHandler = (db) => async (req, res) => {
  const movies = await db.collection("movies").find({}).toArray();

  res.json(movies);
};

const searchMoviesHandler = (db) => async (req, res) => {
  const { year, title } = req.query;

  // Constructing our filter to find entries in the database
  let filter = {};
  if (year) {
    // We need to make sure the year is a number (integer)
    filter.year = parseInt(year);
  }
  if (title) {
    // We use regular expressions to allow case-insensitive partial matches
    filter.title = { $regex: new RegExp(title, "i") };
  }

  // We don't want to use an empty filter object
  // since that will match everything.
  // So in that case we just return an empty array directly.
  if (Object.keys(filter).length < 1) {
    res.json([]);
  }

  const movies = await db.collection("movies").find(filter).toArray();

  res.json(movies);
};

//////////////////
// Exports
//////////////////

/**
 * Returns movie routes.
 * @param db {Db} A connected MongoDB instance.
 * @returns {Router}
 */
export function routes(db) {
  const router = new Router();

  router.get("/search", searchMoviesHandler(db));
  router.post("/", addMovieHandler(db));
  router.get("/:id", findMovieByIdHandler(db));
  router.get("/", findAllMoviesHandler(db));

  return router;
}
