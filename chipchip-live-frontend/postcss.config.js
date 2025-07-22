module.exports = {
  plugins: {
    // First load the new PostCSS plugin…
    '@tailwindcss/postcss': {},
    // …then Tailwind itself, then autoprefixer
    tailwindcss: {},
    autoprefixer: {},
  }
}
