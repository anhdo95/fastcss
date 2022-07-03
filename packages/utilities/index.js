const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const utilities = require("./src/utilities");
const defaultConfig = require("./src/default.config.js");

const from = "./src/main.css";
const to = "./dist/main.css";
const toMap = "./dist/main.css.map";

fs.readFile(from, function (err, styles) {
  const opts = { from, to, map: { inline: false }, config: defaultConfig };

  postcss([utilities])
    .process(styles, opts)
    .then((result) => {
      if (!fs.existsSync(to)) {
        fs.mkdirSync(path.dirname(to), { recursive: true });
      }

      fs.writeFileSync(to, result.css);
      if (result.map) {
        fs.writeFileSync(toMap, JSON.stringify(result.map));
      }
    });
});
