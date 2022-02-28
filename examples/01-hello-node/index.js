console.log("Hello node! \(>O<)/")

// We can use the import syntax since the package type being set to "module" in package.json
import fs from 'fs';

fs.writeFileSync("test.txt", "Here's some text in a file!");
const contents = fs.readFileSync("test.txt").toString();
console.log(contents);
