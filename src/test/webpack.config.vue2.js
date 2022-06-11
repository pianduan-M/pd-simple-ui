const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader2/lib/plugin");

module.exports = {
  entry: path.resolve(__dirname, "./vue2/main.js"),
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
    port: 8080,
    hot: true,

    open: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader2",
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
        test: /\.(jpe?g|png|git|svg)$/,
        type: "assets",
        generator: {
          filename: "img/[name]_[hash:8].[ext]",
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
