module.exports = {
  variants: {
    extend: {
      backgroundImage: ["dark"],
    },
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
          background: "#0f0b15",
          sidebar: "#520303",
          subBackground: "#323232",
          primary: "#FFC400",
          secondary: "#830ff8",
          customGrayHeavy: "#424242",
          customGrayLight: "#999999",
          text: "#CCCCCC",
          input: "#453b55",
          subInput: "#524a5e",
          placeholder: "#7F788D",
        },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      },
      fontFamily:  {
        arimo: ['Arimo','sans-serif'],
        play: ['Play','sans-serif'],
        spacemono: ['Space Mono',' monospace'],
        fredericka: ['Fredericka the Great', 'cursive'],
        arapey: ["Arapey", "serif"],
        petit: ["Petit Formal Script", "cursive"],
        oswald: ["Oswald"],
        vastshadow: ['Vast Shadow', 'cursive'],
        mulish: ["Mulish", "sans-serif"],
        alegreya: ["Alegreya Sans SC", "sans-serif"],
        oxygen: ["Oxygen", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        inter:["Inter", "sans-serif"],
        'roboto':'"Roboto", sans-serif',
        'montserrat':'"Montserrat", sans-serif',
        'spartan':'"Spartan", sans-serif',
        'biryani':'"Biryani", sans-serif',
      },
      backgroundImage: {
        'my_bg_img' : "url('/bg.jpeg')",
        'light_bg' : "url('/bglite.jpg')",
        'mobileRedirect_bg' : "url('/mobileRedirectbg.jpg')",
        'bglite' : "url('/lightbg.jpg')",
        'landing' : "url('/landing.png')",
        'lightbg' : "url('/lightbg1.jpg')",
        'lite' : "url('/lite2.jpg')",
      },
      backgroundColor: theme => ({
        'neon': '#ccff00',
        'cetacean': '#001440',
        'metagold': '#d4af37',
      }),
      textColor: theme => ({
        'metagold': '#d4af37',
      }),
      borderColor: theme => ({
        'metagold': '#d4af37',
      }),
      'animation': {
        'text':'text 5s ease infinite',
        },
        'keyframes': {
            'text': {
                '0%, 100%': {
                  'background-size':'200% 200%',
                    'background-position': 'left center'
                },
                '50%': {
                  'background-size':'200% 200%',
                    'background-position': 'right center'
                }
            },
        },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}