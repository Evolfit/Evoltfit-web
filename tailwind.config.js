/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'source': ['Source Sans Pro'],
      'heebo':['Heebo'],
      'bebas':['Bebas Neue'],
      'catamaran':['Catamaran'],
    },

  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/line-clamp')
  ],
}
