let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");

let DIST_PATH = path.resolve(__dirname, "dist");

// https://www.jianshu.com/p/afbec9ae84e7

let commonCssLoaders = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: "../"
    }
  },
  "css-loader",
  {
    loader: "postcss-loader",
    options: {
      ident: "postcss",
      plugins: () => [
        require("postcss-preset-env")()
      ]
    }
  }
];

module.exports = {
  entry: ["./src/js/index.js", "./src/index.html"],

  output: {
    filename: "[hash:10].js",
    path: DIST_PATH
  },

  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: commonCssLoaders
          },
          {
            test: /\.less$/,
            use: [
              ...commonCssLoaders,
              "less-loader"
            ]
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: {
                      version: 3
                    },
                    targets: {
                      chrome: "60",
                      firefox: "60",
                      ie: "9",
                      safari: "10",
                      edge: "17"
                    }
                  }
                ]
              ],

              // 开启babel缓存，第二次构建时会读取之前的缓存
              cacheDirectory: true
            }
          },
          {
            test: /\.(jpg|jpeg|gif|png)$/,
            loader: "url-loader",
            options: {
              limit: 9 * 1024,
              name: "[hash:12].[ext]",
              outputPath: "./img"
            }
          },
          {
            test: /\.html$/,
            loader: "html-loader"
          },
          {
            exclude: /\.(html|css|less|js|png|jpg|jpeg|png)$/,
            loader: "file-loader",
            options: {
              outputPath: "./assets",
              name: "[hash:12].[ext]"
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),

    new MiniCssExtractPlugin({
      filename: "./css/app.css"
    })
  ],

  /**
   * 1. 可将node_modules中的代码打包成一个chunk输出 
   */
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },

  mode: "development",

  devServer: {
    contentBase: DIST_PATH,
    port: 4443,
    open: true,
    compress: true,
    host: "0.0.0.0",
    useLocalIp: true,
    hot: true
  },

  devtool: "eval-cheap-module-source-map"
}