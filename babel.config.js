module.exports = function(api) {
  api.cache(true);

  const presets = ["babel-preset-react-app"];
  const plugins = ["emotion"];

  return {
    presets,
    plugins
  };
};
