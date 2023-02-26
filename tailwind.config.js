/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "login-background": "url('./src/Assest/Login.jpg')",
        "singup-background": "url('./src/Assest/Signup.png')",
      },
      fontFamily: {
        display: ["Montserrat"],
      },
    },
  },
  plugins: [],
};
