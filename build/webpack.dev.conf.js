const os = require("os");
const ifaces = os.networkInterfaces();
const webpack = require("webpack");
const merge = require("webpack-merge");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const portfinder = require("portfinder");
const baseWebpackConfig = require("./webpack.base.conf");
const config = require("../config");
const utils = require("./utils");

let local_network = null;
for (let dev in ifaces) {
    ifaces[dev].forEach(function(details) {
        if (details.family == "IPv4" && details.address.indexOf("192.168") > -1) {
            local_network = details.address;
            return;
        }
    });
}

const devWebpackConfig = {
    mode: "development",
    devtool: "#cheap-module-eval-source-map",
    module: {
        rules: [
            ...utils.generateStyleLoaders({
                sourceMap: config.dev.sourceMap,
                extract: false
            })
        ]
    },
    devServer: {
        contentBase: config.dev.staticPath,
        publicPath: config.dev.assetsPublicPath,
        hot: true,
        quiet: true,
        overlay: true,
        clientLogLevel: "warning",
        historyApiFallback: true,
        proxy: config.dev.proxyTable,
        open: config.dev.autoOpenBrowser,
        host: config.dev.host,
        port: config.dev.port
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            filename: "index.html",
            template: "index.html"
        }),
        new webpack.DefinePlugin({
            "process.env": config.dev.env
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};

/**
 * use portfinder to avoid
 * http server port conflict!
 */

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = devWebpackConfig.devServer.port;
    portfinder.getPortPromise().then(port => {
        devWebpackConfig.devServer.port = port;
        devWebpackConfig.plugins.push(
            new FriendlyErrorsWebpackPlugin({
                compilationSuccessInfo: {
                    clearConsole: true,
                    messages: [
                        "You application is running here",
                        `localhost: http://localhost:${port}`,
                        `network: http://${local_network}:${port}`
                    ]
                }
            })
        );
        resolve(merge(baseWebpackConfig, devWebpackConfig));
    });
});
