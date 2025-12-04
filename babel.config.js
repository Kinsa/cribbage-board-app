// This babel config is required to use Jest.
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo']],
  };
};
