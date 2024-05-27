/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}", "./*.{html,js}"],
  theme: {
    screens:{
      'mobile': '600px',
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    extend: {},
  },
  plugins: [],
}

