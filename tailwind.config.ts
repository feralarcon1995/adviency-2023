import type {Config} from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        red: "#DC3845",
        gold: "#efb810",
      },
    },
  },
  plugins: [],
};

export default config;
