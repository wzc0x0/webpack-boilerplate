const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const baseWebpackConfig = require("./webpack.base.conf");
const config = require("../config");
const utils = require("./utils");

const prodWebpackConfig = {
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
    const CompressionPlugin = require("compression-webpack-plugin");
    prodWebpackConfig.plugins.push(
        new CompressionPlugin({
            threshold: 10240,
            minRatio: 0.8
        })
    );
}

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
        .BundleAnalyzerPlugin;
    prodWebpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(baseWebpackConfig, prodWebpackConfig);
