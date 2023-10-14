import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Noto Sans", "sans-serif"],
      },
      letterSpacing: {
        1: "-0.84px",
        2: "-0.63px",
        3: "-0.49px",
        4: "-0.42px",
        5: "-0.56px",
      },
      fontSize: {
        xs: "24px",
        sm: "18px",
        base: "16px",
        lg: "14px",
        xl: "12px",
      },
      colors: {
        black: {
          DEAFULT: "#000000",
        },
        white: {
          DEFAULT: "#FFFFFF",
        },
        gray: {
          100: "#333333",
          200: "#4F4F4F",
          300: "#828282",
          400: "#BDBDBD",
          500: "#E0E0E0",
          600: "#F2F2F2",
          700: "#FAFAFA",
        },
        red: {
          DEFAULT: "#EB5757",
        },
        green: {
          DEFAULT: "#27AE60",
        },
        primary: {
          DEFAULT: "#2F80ED",
          100: "#2D9CDB",
        },
      },
      boxShadow: {
        DEFAULT: "0px 2px 4px 0px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
export default config;
