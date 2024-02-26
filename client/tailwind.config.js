/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      main: ["Roboto", "sans-serif"]
    },
    extend: {
      width: {
        main: "1170px"
      },
      backgroundColor: {
        main: "#ed1c24",
        main2: "#0089ff"
      },
      colors: {
        main: "#0089ff"
      },
      keyframes: {
        "slide-up": {
          "0%" : {
            "-webkit-transform":" scale(0.5);",
            transform: "scale(0.5);"
          },
          "100%" : {
            "-webkit-transform": "scale(-100);",
            transform: "scale(1);"
          }
        }
      },
      animation: {
        "slide-up" : "scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;"
      }
    },
  },
  plugins: [],
}
