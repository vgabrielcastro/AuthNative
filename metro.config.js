const {withNativeWind} = require('nativewind/metro');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = mergeConfig(getDefaultConfig(__dirname), {
  resolver: {
    extraNodeModules: {
      'react-dom': path.resolve(__dirname, 'shim', 'react-dom.js'),
    },
  },
});

module.exports = withNativeWind(config, {
  input: './global.css',
});
