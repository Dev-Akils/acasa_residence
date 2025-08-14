/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {

      screens: {
      sm: '640px',   
      md: '768px',   
      lg: '1024px',  
      xl: '1280px',  
      '2xl': '1536px', 
    },


    animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

