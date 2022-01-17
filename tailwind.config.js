module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@themesberg/flowbite/**/*.js",
  ],
  theme: {
    fontFamily: {
      roboto: "'Roboto', sans-serif",
      caveat: "'Caveat', cursive"
    },
    extend: {},
  },
  plugins: [require("@themesberg/flowbite/plugin")],
};
