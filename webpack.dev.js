/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const path = require("path");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

dotenv.config({ path: ".env" });

module.exports = (env, argv) => {
  const config = {
    mode: "development",
    context: __dirname, // to automatically find tsconfig.json
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "build"),
      // filename: 'index.js',
      filename: "[name].[contenthash:8].js",
      chunkFilename: "[name].[contenthash:8].js",
      publicPath: "/"
    },
    devServer: {
      open: true,
      compress: true,
      historyApiFallback: true,
      port: 3000,
      hot: true,
      liveReload: true,
      watchFiles: ["src/**/*"],
      client: {
        progress: true,
        overlay: {
          errors: true,
          warnings: false
        }
      },
      static: {
        directory: path.join(__dirname, "public")
      }
    },
    optimization: {
      usedExports: true,
      splitChunks: {
        chunks: "all",
        name: false
      },
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`
      }
    },
    devtool: "cheap-module-source-map",
    plugins: [
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env)
      }),
      new HtmlWebpackPlugin({
        title: "Caching",
        inject: true,
        template: "./public/index.html",
        filename: "./index.html",
        favicon: "./public/favicon.svg"
      }),
      new ForkTsCheckerWebpackPlugin({
        async: true,
        devServer: true,
        typescript: {
          configFile: path.resolve(__dirname, "tsconfig.json")
        }
      })
    ],
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
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, "src"),
          use: [{ loader: "ts-loader", options: { transpileOnly: true } }]
        },
        {
          test: /\.css$/,
          use: [
            require.resolve("style-loader"),
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
          use: ["style-loader", "css-loader", "sass-loader"]
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
      extensions: [".tsx", ".ts", ".js", ".jsx", ".css", ".scss", ".json"],
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
