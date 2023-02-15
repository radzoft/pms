const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    join(__dirname,'../../node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        primary:'rgb(29 78 216 / var(--tw-text-opacity))'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
