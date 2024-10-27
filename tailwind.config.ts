import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF7000",
          100: "#FF7000",
          800: "#FFF1E6",
        },
        light: {
          DEFAULT: "#FFFFFF",
          400: "#858EAD",
          500: "#7B8EC8",
          700: "#DCE3F1",
          800: "#F4F6F8",
          850: "#FDFDFD",
          900: "#FFFFFF",
        },
        dark: {
          DEFAULT: "#000000",
          500: "#3F4354",
          400: "#212734",
          300: "#151821",
          200: "#151821",
          100: "#0000",
       
        },
      },
      spacing: {},
      baxShadow: {
        
      },
      screens: {
        "xs":"420px",
        
      }
    },
  },
  plugins: [],
};
export default config;
