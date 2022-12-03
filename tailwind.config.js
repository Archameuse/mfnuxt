/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'chartable': 'repeat(4, 90px)',
        'playertable': 'repeat(auto-fill, 220px)',
      }
    },
    fontFamily: {
      'open-sans': ['Open Sans', 'sans-serif'],
      'cuprum': ['Cuprum', 'Impact', 'sans-serif'],
      'kelly-slab': ['kelly slab', 'Impact', 'sans-serif'],
    },
  }
}
