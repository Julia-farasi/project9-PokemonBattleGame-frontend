/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        glow: "glow 3s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%": {
            transform: "translateX(-100%) rotate(25deg)",
            opacity: "0",
          },
          "50%": {
            opacity: "0.3",
          },
          "100%": {
            transform: "translateX(200%) rotate(25deg)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
  rotate: {
    1: "1deg",
  },
};
