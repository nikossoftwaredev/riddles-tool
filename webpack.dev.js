/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

dotenv.config({ path: ".env" });

module.exports = (env, argv) => {
  const devServer = {
    open: true,
    historyApiFallback: true,
    port: env.port || 3000,
    hot: true,
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
  };

  const config = {
    context: __dirname,
    mode: "development",
    devServer,
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index.js",
      publicPath: "/"
    },
    devtool: "cheap-module-source-map",
    module: {
      rules: [
        {
          test: /\.(jsx?)$/,
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
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env)
      }),
      new ForkTsCheckerWebpackPlugin({
        async: true,
        typescript: {
          configFile: path.resolve(__dirname, "tsconfig.json")
        }
      }),
      new HtmlWebpackPlugin({
        title: "Caching",
        inject: true,
        template: `${__dirname}/public/index.html`,
        filename: `${__dirname}/index.html`,
        favicon: `${__dirname}/public/favicon.svg`
      })
    ],
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
