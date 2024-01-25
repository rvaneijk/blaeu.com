/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        'big-john': ['big_johnregular', 'Raleway', 'Helvetica', 'sans-serif'],
        'ambleregular': ['ambleregular', 'Raleway', 'Helvetica', 'Arial', 'sans-serif'],
        'amblebold': ['amblebold', 'Raleway', 'Helvetica', 'Arial', 'sans-serif'],
        'amblelight': ['amblelight', 'Raleway', 'Helvetica', 'Arial', 'sans-serif'] 
      },
       letterSpacing: {
        'extra-tight': '.05em',
      }
   }
  },
  darkMode: "class"
}