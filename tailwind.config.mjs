/** @type {import('@tailwindcss/postcss').Config} */
export default {
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
      },
      spacing: {
        '140': '140px', // For the top back-to-top button
        '80': '80px',   // For the middle cookie policy widget
        '20': '20px'    // For the bottom accessibility widget
      }
    }
  },
  darkMode: "class"
}