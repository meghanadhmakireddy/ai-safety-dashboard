// tailwind.config.js
module.exports = {
  darkMode: 'class', // ✅ REQUIRED!
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
