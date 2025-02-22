/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
const cracoSwcPlugin = require('./plugins/craco-swc.js');

module.exports = {
  plugins: [{ plugin: cracoSwcPlugin }],
  webpack: {
    configure: (webpackConfig) => ({
      ...webpackConfig,
      ignoreWarnings: [
        /Failed to parse source map/,
        /Replace color-adjust to print-color-adjust./,
      ],
      resolve: {
        ...webpackConfig.resolve,
        fallback: {
          ...webpackConfig.resolve.fallback,
          path: require.resolve('path-browserify'),
          util: false,
        },
      },
    }),
  },
};
