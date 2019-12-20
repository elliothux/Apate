const path = require("path");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

module.exports = function override(config, env) {
  config.plugins.push(
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, "src/wasm-lib")
    })
  );
  return config;
};
