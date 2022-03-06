import express, { Express } from "express";
import { Db } from "mongodb";
import { routes } from "./modules/movies.js";

/**
 * Returns a bootstrapped Express server
 * @param db {Db} A connected MongoDB instance
 * @returns {Express}
 */
export function createServer(db) {
  const app = express();

  // A middleware which makes sure that the body of requests of
  // `application/json` content type are parsed as JSON automatically.
  app.use(express.json());

  app.use("/movies", routes(db));

  return app;
}
