const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  entry: path.resolve(__dirname, "./main.js"),
  mode: "development",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "index.js",
  },
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  devServer: {
    static: "/dist",
    port: 8080,
    hot: true,

    open: true,
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
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpe?g|png|git|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              // name: '[name].[ext]',
              limit: 8192,
              esModule: false,
            },
          },
        ],
        type: "javascript/auto",
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "./index.html"),
      inject: true,
    }),
  ],
};
