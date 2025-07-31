module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Optimize CSS for production
    ...(process.env.NODE_ENV === "production" && {
      cssnano: {
        preset: [
          "default",
          {
            discardComments: {
              removeAll: true,
            },
            normalizeWhitespace: true,
            minifySelectors: true,
            minifyParams: true,
            mergeLonghand: true,
            mergeRules: true,
          },
        ],
      },
    }),
  },
  // Remove problematic parser setting
}