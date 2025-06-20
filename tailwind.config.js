/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        glow: "glow 3s ease-in-out infinite",
        // fireball: "fireball 0.8s ease-out forwards",
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
        // fireball: {
        //   "0%": {
        //     transform: "translateX(0) rotate(0deg)",
        //     opacity: "1",
        //   },
        //   "100%": {
        //     transform: "translateX(800px) rotate(720deg)",
        //     opacity: "0",
        //   },
        // },
      },
    },
  },
  plugins: [],
  rotate: {
    1: "1deg",
  },
};
