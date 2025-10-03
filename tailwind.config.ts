/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#eadbc0",
        ink: "#122738",
        rust: "#8b3a3a",
      },
    },
  },
  plugins: [],
};
export default config;
