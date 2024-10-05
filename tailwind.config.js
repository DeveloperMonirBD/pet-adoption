/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      fontFamily: {
        Lato: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
