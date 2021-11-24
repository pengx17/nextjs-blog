module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./posts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Only Emoji", "Source Sans Pro", "Noto Sans SC", "sans-serif"],
      serif: ["Only Emoji", "Source Serif Pro", "Noto Serif SC", "serif"],
      mono: ["Only Emoji", "Fira Code", "monospace"],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
