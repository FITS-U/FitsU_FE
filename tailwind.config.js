import scrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        red: "#FC6060",
        blue: "#4E8AFF",
        orange: {
          100: "#FFF8EA",
          200: "#FFE7B6",
          300: "#FFD57E",
          400: "#FFC95A",
          500: "#FFC03D",
          600: "#FFB419",
          700: "#FFAC00",
          800: "#F3A501",
        },
        contrast: {
          100: "#FFFFFF",
          200: "#D7D7D7",
          300: "#949494",
          400: "#949494",
          500: "#505050",
          600: "#3D3D3D",
          700: "#272727",
          800: "#1C1B18",
        }
      }
    },
  },
  plugins: [scrollbarHide],
};
