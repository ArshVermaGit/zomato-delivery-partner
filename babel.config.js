module.exports = function (api) {
  api.cache(true);
  return {
    // Use babel-preset-expo specifically for Expo projects to handle JSX, TS, and flow
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            // Ensure worklets-core is used for consistency across platforms
            'react-native-worklets': 'react-native-worklets-core',
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          allowUndefined: true,
        },
      ],
      // Reanimated plugin must be listed last
      'react-native-reanimated/plugin',
    ],
  };
};
