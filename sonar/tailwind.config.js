/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "red-custom": "#d03f0a",
        "gray-primary": "#f9f9f9",
        "gray-secondary": "#f3f3f3",
        "gray-accent": "#d4e3ec",
        "gray-selected": "#eaeaea",
        "orange-custom": "#ff8801",
      },
    },
  },
  plugins: [],
};
