/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  mode: "development",
  devtool: "source-map",
  devServer: {
    port: 1337,
    open: true,
    host: "0.0.0.0"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        loaders: ["html-loader"]
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img/",
              publicPath: "img/",
              useRelativePath: true
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 95
              },
              optipng: {
                enabled: true
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              }
            }
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              autoprefixer: {
                browsers: ["last 2 versions"]
              },
              sourceMap: true,
              plugins: () => [autoprefixer]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      title: "DEV - Project Name",
      template: "./src/index.html"
    })
  ]
};
