const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const utilities = require("./src/utilities");

const from = "./src/main.css";
const to = "./dist/main.css";

fs.readFile(from, function (err, styles) {
  postcss([utilities])
    .process(styles, { from, to })
    .then((result) => {
      if (!fs.existsSync(to)) {
        fs.mkdirSync(path.dirname(to), { recursive: true })
      }

      fs.writeFile(to, result.css, "utf-8", (err) => console.error(err));
    });
});
