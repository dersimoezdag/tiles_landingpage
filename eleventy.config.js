const path = require('path');
const eleventySass = require('eleventy-sass');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy('src/style/fonts');
  eleventyConfig.addPassthroughCopy('src/**/*.jpg');

  eleventyConfig.addPlugin(eleventySass, {
    compileOptions: {
      permalink: function (contents, inputPath) {
        return data => data.page.filePathStem.replace(/^\/scss\//, '/css/') + '.css';
      }
    },
    sass: {
      style: 'compressed',
      sourceMap: false
    },
    rev: true
  });

  eleventyConfig.addPassthroughCopy('src/script/bundle.js');

  return {
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};
