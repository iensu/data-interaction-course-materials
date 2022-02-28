// We can use the import syntax since the package type being set to "module" in package.json
import fs from 'fs';
import { addMeaning } from './add-meaning.js';

console.log("Hello node! \(>O<)/")

fs.writeFileSync("test.txt", "Here's some text in a file!");
const contents = fs.readFileSync("test.txt").toString();
console.log(contents);

const x = addMeaning(0);

console.log(`x=${x}`);
