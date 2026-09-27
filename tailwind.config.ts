import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // CareerOS Intelligence System Design Tokens
        primary: {
          DEFAULT: "#004ac6",
          hover: "#003ea8",
          container: "#2563eb",
          "container-hover": "#1d4ed8",
          fixed: "#dbe1ff",
          "fixed-dim": "#b4c5ff",
        },
        "on-primary": "#ffffff",
        "on-primary-fixed": "#00174b",
        "on-primary-container": "#eeefff",

        secondary: {
          DEFAULT: "#006c49",
          container: "#6cf8bb",
          fixed: "#6ffbbe",
          "fixed-dim": "#4edea3",
        },
        "on-secondary": "#ffffff",
        "on-secondary-container": "#00714d",
        "on-secondary-fixed": "#002113",

        tertiary: {
          DEFAULT: "#784b00",
          container: "#996100",
          fixed: "#ffddb8",
          "fixed-dim": "#ffb95f",
        },
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#ffeedd",
        "on-tertiary-fixed": "#2a1700",

        surface: {
          DEFAULT: "#f8f9ff",
          dim: "#cbdbf5",
          bright: "#f8f9ff",
          "container-lowest": "#ffffff",
          "container-low": "#eff4ff",
          container: "#e5eeff",
          "container-high": "#dce9ff",
          "container-highest": "#d3e4fe",
        },
        "on-surface": "#0b1c30",
        "on-surface-variant": "#434655",

        outline: {
          DEFAULT: "#737686",
          variant: "#c3c6d7",
        },

        error: {
          DEFAULT: "#ba1a1a",
          container: "#ffdad6",
        },
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "Fira Code", "monospace"],
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.04)",
        elevated: "0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04)",
        modal: "0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
