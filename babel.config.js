// This babel config is required to use Jest.
export default function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo']],
  };
}
