const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: "none",
  entry: {
    index: "./src/index.js",
    "index.min": "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "../lib"),
    filename: "[name].js",
    libraryTarget: "umd",
    libraryExport: "default",
  },
  resolve: {
    extensions: [".js", ".vue"],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
      }),
    ],
  },
  plugins: [new CleanWebpackPlugin(), new VueLoaderPlugin()],
};
