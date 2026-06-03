/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      borderImage: {
        "gradient-radial":
          "radial-gradient(rgba(114, 125, 161, 0.20), transparent)",
      },
    },
  },
  plugins: [],
};
