/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#151D72",
        secondary: "#2E3EA1",
        "secondary-light": "#EEF1FF",
      },
      gridTemplateColumns: {
        fit: "repeat(auto-fit, 14rem)",
      },
      fontFamily: {
        inter: ["Inter"],
      },
    },
  },
  plugins: [],
};
