import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#09090b",
        panel: "#18181b",
        line: "#303036",
        accent: "#d9ff43",
      },
      boxShadow: {
        sheet: "0 -16px 50px rgba(0,0,0,.5)",
      },
    },
  },
  plugins: [],
};

export default config;
