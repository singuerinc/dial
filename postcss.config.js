const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const nested = require("postcss-nested");

const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

const plugins = [];
plugins.push(tailwindcss);
plugins.push(autoprefixer);
plugins.push(nested);
// plugins.push(tailwindcss('tailwind.config.js'))
// This is if you want to include your custom config

if (!IS_DEVELOPMENT) {
  const purgecss = require("@fullhuman/postcss-purgecss");

  class TailwindExtractor {
    static extract(content) {
      return content.match(/[A-z0-9-:\/]+/g) || [];
    }
  }

  plugins.push(
    purgecss({
      content: ["src/*.html", "src/**/*.tsx"],
      extractors: [
        {
          extractor: TailwindExtractor,
          extensions: ["html"]
        }
      ]
    })
  );
}

module.exports = { plugins };
