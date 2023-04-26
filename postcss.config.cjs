// postcss.config.mjs

// Import the required dependencies
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

// Export the PostCSS plugins
module.exports = {
  plugins: [
    tailwindcss,
    autoprefixer,
  ],
};
