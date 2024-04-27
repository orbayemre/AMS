/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'first': '#1C4B82',
      'second': '#F9C784',
      'third': '#EBF2FA',
    },
    extend: {},
  },
  plugins: [],
}

//npx tailwindcss -i ./src/styles/global.css -o ./src/styles/globalO.css --watch 