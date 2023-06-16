const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBar = require("webpackbar");
module.exports = {
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.[hash:8].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  mode: process.env.NODE_ENV,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  externals: {
    jquery: "jQuery",
    lodash: "_",
  },
  devServer: {
    open: true,
    proxy: {
      "^api": {
        target:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:3000"
            : process.env.NODE_ENV === "production"
            ? "http://api.ee45.top:3000"
            : "",
        pathRewrite: { "/api": "" },
      },
      "^api1": {
        target: "http://127.0.0.1:3008",
        pathRewrite: { "/api1": "" },
      },
    },
    client: {
      overlay: false, //在浏览器中是否展示编译错误信息，为false时不展示
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.[contenthash:8].css",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      cdn: {
        script: [
          "https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.min.js",
          "https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.core.min.js",
        ],
      },
    }),
    new WebpackBar(),
  ],
};
