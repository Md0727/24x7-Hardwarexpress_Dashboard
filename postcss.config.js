module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: ['last 2 versions', '> 1%'],
      ignoreUnknownVersions: false, // This line suppresses the warning about mixed support
    }),
  ],
};

// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
    
//   },
// }

