const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const nested = require("postcss-nested");

const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

const plugins = [];
plugins.push(tailwindcss);
plugins.push(autoprefixer);
plugins.push(nested);

if (!IS_DEVELOPMENT) {
  const purgecss = require("@fullhuman/postcss-purgecss");
  const purgeFrom = content => content.match(/[A-z0-9-:\/]+/g) || [];

  plugins.push(
    purgecss({
      content: ["src/*.html", "src/**/*.tsx"],
      extractors: [
        {
          extractor: purgeFrom,
          extensions: ["html", "tsx"]
        }
      ]
    })
  );
}

module.exports = { plugins };
