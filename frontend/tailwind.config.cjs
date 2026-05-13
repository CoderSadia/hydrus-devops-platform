module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gh-bg': '#0d1117',
        'gh-surface': '#161b22',
        'gh-border': '#30363d',
        'gh-text': '#e6edf3',
        'gh-muted': '#8b949e',
        'gh-blue': '#58a6ff',
        'gh-green': '#3fb950',
        'gh-yellow': '#d29922',
        'gh-red': '#f85149',
      }
    },
  },
  plugins: [],
}
