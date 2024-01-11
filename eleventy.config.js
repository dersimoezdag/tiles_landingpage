const sass = require('sass');

module.exports = function (eleventyConfig) {
  // Copy `img/` to `_site/img`
  eleventyConfig.addPassthroughCopy('img');

  // Copy `css/fonts/` to `_site/css/fonts`
  // Keeps the same directory structure.
  eleventyConfig.addPassthroughCopy('css/fonts');

  // Copy any .jpg file to `_site`, via Glob pattern
  // Keeps the same directory structure.
  eleventyConfig.addPassthroughCopy('**/*.jpg');

  eleventyConfig.addTemplateFormats('scss');

  // Creates the extension for use
  eleventyConfig.addExtension('scss', {
    outputFileExtension: 'css', // optional, default: "html"

    // `compile` is called once per .scss file in the input directory
    compile: async function (inputContent) {
      let result = sass.compileString(inputContent);

      // This is the render function, `data` is the full data cascade
      return async data => {
        return result.css;
      };
    }
  });

  return {
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};
