/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "secondary-text": "var(--secondary-text)",
        accent: {
          blue: "var(--accent-blue)",
          hover: "var(--accent-hover)",
          softblue: "var(--accent-softblue)",
          aqua: "var(--accent-aqua)",
          seaglass: "var(--accent-seaglass)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  darkMode: "media", // or 'class' if you want manual toggling
  plugins: [],
};
