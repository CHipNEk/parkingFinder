/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  content: [
    "./src/**/*.{html,ts,scss}" // Quét tất cả các file HTML, TS, và SCSS trong thư mục src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

