import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0c",
        panel: "#151518",
        line: "#2b2b31",
        accent: "#d6f36a",
      },
      boxShadow: {
        card: "0 18px 50px rgba(0,0,0,.18)",
        sheet: "0 -20px 60px rgba(0,0,0,.5)",
      },
    },
  },
  plugins: [],
};

export default config;
