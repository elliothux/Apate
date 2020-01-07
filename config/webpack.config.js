const path = require("path");
const express = require("express");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const WorkerPlugin = require("worker-plugin");

const dist = path.resolve(__dirname, "../dist");
const isEnvDevelopment = process.env === "development";
const isEnvProduction = process.env === "production";

const filterPath = path.resolve(__dirname, "../filter");

module.exports = {
  mode: "production",
  entry: {
    index: path.resolve(__dirname, "../app/index.tsx")
  },
  output: {
    path: dist,
    filename: "[name].js",
    globalObject: "this"
  },
  devServer: {
    contentBase: dist,
    before(app) {
      app.use("/filter", express.static(filterPath));
    }
  },
  resolve: {
    modules: [path.resolve(__dirname, "../app"), "node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /@babel(?:\/|\\{1,2})runtime/,
        loader: require.resolve("babel-loader"),
        options: {
          customize: require.resolve(
            "babel-preset-react-app/webpack-overrides"
          ),
          cacheDirectory: true,
          cacheCompression: false,
          compact: isEnvProduction
        }
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: require.resolve("style-loader")
          },
          {
            loader: require.resolve("css-loader"),
            options: { sourceMap: true }
          },
          {
            loader: require.resolve("sass-loader"),
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.(css)$/,
        use: [
          "style-loader",
          {
            loader: require.resolve("css-loader"),
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        loader: require.resolve("url-loader"),
        options: {
          limit: 10000,
          name: "static/media/[name].[hash:8].[ext]"
        }
      },
      {
        test: [/\.cube$/],
        use: "raw-loader"
      }
    ]
  },
  plugins: [
    new WorkerPlugin(),
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, "../"),
      extraArgs: "--out-name index"
    }),
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: path.resolve(__dirname, "../static/index.html")
        },
        isEnvProduction
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
              }
            }
          : undefined
      )
    ),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development")
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ].filter(Boolean),
  performance: false
};
