module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      'styled-components',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@components': './src/components',
            '@config': './src/config',
            '@store': './src/store',
            '@router': './src/router',
            '@hooks': './src/hooks',
            '@types': './src/types',
            '@utils': './src/utils',
            '@pages': './src/pages',
            '@api': './src/api',
            '@translate': './src/translate',
          },
        },
      ],
    ],
  };
};
