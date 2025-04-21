module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-preset-env": {
      features: {
        "nesting-rules": true,
        "custom-properties": false,
        "gap-properties": true,
        "logical-properties-and-values": true,
        "custom-media-queries": true,
      },
      stage: 1,
    },
    ...(process.env.NODE_ENV === "production"
      ? {
          cssnano: {
            preset: "default",
            plugins: [["postcss-preset-env", { preset: "advanced" }]],
          },
        }
      : {}),
  },
};
