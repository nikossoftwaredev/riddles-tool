/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = (env, argv) => {
  const config = {
    mode: "production",
    context: __dirname, // to automatically find tsconfig.json
    entry: "./src/index.tsx",
    output: {
      clean: true,
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[contenthash:8].js",
      chunkFilename: "[name].[contenthash:8].js",
      publicPath: "/"
    },
    optimization: {
      minimize: true,
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`
      },
      splitChunks: {
        chunks: "all",
        name: false,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all"
          }
        }
      }
    },
    plugins: [
      new WorkboxWebpackPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: new RegExp(".*"),
            handler: "CacheFirst",
            options: {
              cacheName: "cache-every-file"
            }
          }
        ]
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: "Caching",
        inject: true,
        template: `${__dirname}/public/index.html`,
        filename: `${__dirname}/index.html`,
        favicon: `${__dirname}/public/favicon.svg`,
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
      }),
      new ForkTsCheckerWebpackPlugin({
        async: false,
        devServer: true,
        typescript: {
          configFile: path.resolve(__dirname, "tsconfig.json"),
          configOverwrite: {
            compilerOptions: {
              incremental: true,
              sourceMap: false,
              skipLibCheck: true,
              inlineSourceMap: false,
              declarationMap: false,
              noEmit: true,
              tsBuildInfoFile: path.resolve(__dirname, "node_modules/.cache/tsconfig.tsbuildinfo")
            }
          }
        }
      }),
      new CopyPlugin({
        patterns: [{ context: "public/", from: "assets/**/*", to: "./" }]
      }),
      new webpack.optimize.SplitChunksPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash:8].css",
        chunkFilename: "[name].[contenthash:8].css"
      })
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, "src"),
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /.tsx?$/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, "src"),
          use: [{ loader: "ts-loader", options: { transpileOnly: true } }]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              // css is located in `static/css`, use '../../' to locate index.html folder
              // in production `paths.publicUrlOrPath` can be a relative path
              options: { publicPath: "../../" }
            },
            {
              loader: require.resolve("css-loader"),
              options: {
                url: false
              }
            }
          ],
          sideEffects: true
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // fallback to style-loader in development
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
          use: [
            {
              loader: "file-loader"
            },
            {
              loader: "url-loader"
            }
          ]
        },
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false
          }
        }
      ]
    },
    resolve: {
      extensions: [".mjs", ".tsx", ".ts", ".js", ".jsx", ".css", ".scss", ".json"],
      modules: [path.resolve(__dirname, "./src"), "node_modules"],
      alias: {
        components: path.resolve(__dirname, "./src/components"),
        pages: path.resolve(__dirname, "./src/pages"),
        data: path.resolve(__dirname, "./src/data"),
        types: path.resolve(__dirname, "./src/types"),
        utils: path.resolve(__dirname, "./src/utils")
      }
    }
  };

  return config;
};
