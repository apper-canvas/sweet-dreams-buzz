/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D4A574",
        secondary: "#8B4513",
        accent: "#FFB6C1",
        surface: "#FFF8F3",
        background: "#FAFAFA",
        success: "#4CAF50",
        warning: "#FF9800",
        error: "#F44336",
        info: "#2196F3"
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}