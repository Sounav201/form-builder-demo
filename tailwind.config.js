module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:  {
        arimo: ['Arimo','sans-serif'],
        play: ['Play','sans-serif'],
        spacemono: ['Space Mono',' monospace'],
        fredericka: ['Fredericka the Great', 'cursive']
      },
      backgroundImage: {
        'my_bg_img' : "url('/bg.jpeg')",
      },
      backgroundColor: theme => ({
        'neon': '#ccff00',
        'cetacean': '#001440',
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
  plugins: [],
}