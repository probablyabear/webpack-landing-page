/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "bundle.[contenthash].js"
  },
  mode: "production",
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 6,
          compress: true,
          output: {
            comments: false,
            beautify: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ["default", { discardComments: { removeAll: true } }]
        }
      })
    ]
  },
  module: {
    rules: [
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
              publicPath: "img/"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 85
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
        exclude: "/node_modules/",
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                postcssPresetEnv({
                  stage: 2,
                  browsers: "last 2 versions",
                  autoprefixer: { grid: true }
                })
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      title: "An awesome landing page",
      template: "./src/index.html",
      minify: {
        html5: true,
        collapseWhitespace: true,
        caseSensitive: true,
        removeComments: true,
        removeEmptyElements: false
      }
    })
  ]
};
