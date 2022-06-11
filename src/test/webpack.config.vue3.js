const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader3/dist/index");

module.exports = {
  entry: path.resolve(__dirname, "./vue3/main.js"),
  mode: "development",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "index.js",
  },
  resolve: {
    extensions: [".js", ".vue"],
  },
  devServer: {
    static: "/dist",
    port: 8081,
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader3",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
      {
        test: /\.(scss|csss)$/,
        use: ["style-loader", "css-loader", "scss-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        type: "asset",
        generator: {
          filename: "img/[name]_[hash:6][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
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
