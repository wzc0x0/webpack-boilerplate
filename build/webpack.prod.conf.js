var path = require("path");
var webpack = require("webpack");
var merge = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var { CleanWebpackPlugin } = require("clean-webpack-plugin");
var TerserPlugin = require("terser-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var baseWebpackConfig = require("./webpack.base.conf");
var config = require("../config");
var utils = require("./utils");

var prodWebpackConfig = {
    mode: "production",
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath("js/[name].[contenthash].js")
    },
    module: {
        rules: [
            ...utils.generateStyleLoaders({
                sourceMap: config.build.sourceMap,
                extract: true
            })
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false
                    }
                },
                cache: true,
                parallel: true,
                sourceMap: config.build.sourceMap
            }),
            new OptimizeCSSAssetsPlugin()
        ],
        runtimeChunk: "single",
        splitChunks: {
            name: false,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "chunk-vendors",
                    chunks: "all"
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, "../static"),
            to: config.build.assetsSubDirectory,
            ignore: [".*"]
        }]),
        new HtmlWebpackPlugin({
            inject: true,
            filename: "index.html",
            template: "index.html",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                    // more options:
                    // https://github.com/kangax/html-minifier#options-quick-reference
            }
        }),
        new MiniCssExtractPlugin({
            filename: utils.assetsPath("css/[name].[contenthash].css")
        }),
        new webpack.DefinePlugin({
            "process.env": config.build.env
        }),
        new webpack.HashedModuleIdsPlugin()
    ]
};

if (config.build.productionGzip) {
    var CompressionPlugin = require("compression-webpack-plugin");
    prodWebpackConfig.plugins.push(
        new CompressionPlugin({
            threshold: 10240,
            minRatio: 0.8
        })
    );
}

if (config.build.bundleAnalyzerReport) {
    var BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
        .BundleAnalyzerPlugin;
    prodWebpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(baseWebpackConfig, prodWebpackConfig);