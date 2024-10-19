module.exports = {
    darkMode: ['class'],
    content: [
    './frontend/**/*.{html,js,css}',  // Adjust the path to point to your actual project structure
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
