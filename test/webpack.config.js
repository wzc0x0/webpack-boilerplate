const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const BabelEsmPlugin = require("babel-esm-plugin");

module.exports = {
    entry: {
        app: path.resolve(__dirname, "./main.js")
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js",
        publicPath: "/"
    },
    resolve: {
        extensions: [".js", ".vue", ".json"],
        alias: {
            vue$: "vue/dist/vue.esm.js"
        }
    },
    module: {
        rules: [{
                test: /\.vue$/,
                use: {
                    loader: "vue-loader"
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    targets: {
                                        browsers: ["last 2 versions", "safari >= 7"]
                                    }
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    },
    plugins: [new VueLoaderPlugin(), new BabelEsmPlugin()]
};
