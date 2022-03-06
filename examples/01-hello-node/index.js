import fs from "fs";
import randomElement from "./random-element.js";
import "./modifying-global-scope.js";

// import.meta.url gives the path to the current file
global.ourGlobalFunction(import.meta.url);

// Since the scope is global we can even call it directly as well
ourGlobalFunction(import.meta.url);

const databases = [
  { name: "MongoDB", type: "document" },
  { name: "PostgreSQL", type: "relational" },
  { name: "Neo4j", type: "graph" },
  { name: "Redis", type: "in-memory" },
];

fs.writeFileSync("test.txt", JSON.stringify(databases));

const contents = fs.readFileSync("test.txt").toString();

console.log(`File contents: ${contents}`);

const randomDatabase = randomElement(databases);

console.log("Got database:", randomDatabase);

// Reading environment variables:
console.log("USER:", process.env.USER);
console.log("MY_VARIABLE", process.env.MY_VARIABLE);
