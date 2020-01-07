const fs = require("fs");
const path = require("path");

const base = "/Users/huqingyang/Desktop/IMP/filter/X";
fs.readdirSync(base).map(name => {
  if (name.includes(".cube")) {
    const n = name
      .replace(" Bw", "-BW")
      .split(" ")[1]
      .replace(".cube", "");
    const old = path.resolve(base, name);
    const new_ = path.resolve(base, `${n}.cube`);
    fs.renameSync(old, new_);
  }
});
