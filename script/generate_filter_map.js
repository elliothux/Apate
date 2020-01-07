const fs = require("fs");
const path = require("path");

const filterPath = path.resolve(__dirname, "../filter");
const targePath = path.resolve(filterPath, "./index.ts");

const filters = {};
fs.readdirSync(filterPath).map(collectionName => {
  const folder = path.resolve(filterPath, collectionName);
  if (fs.statSync(folder).isFile()) {
    return;
  }

  filters[collectionName] = fs
    .readdirSync(folder)
    .filter(i => /\.cube/.test(i))
    .map(i => i.replace(".cube", ""))
    .sort(i => i.length);
});

const result = `export const filters = ${JSON.stringify(filters, null, 2)}`;

fs.writeFileSync(targePath, result);
