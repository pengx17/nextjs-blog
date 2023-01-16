module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./posts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Source Sans Pro", "Noto Sans SC", "sans-serif"],
      serif: ["Source Serif Pro", "Noto Serif SC", "serif"],
      mono: ["Fira Code", "monospace"],
    },
    extend: {
      lineHeight: {
        ease: "1.8",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
