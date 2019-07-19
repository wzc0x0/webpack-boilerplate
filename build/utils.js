const path = require("path");
const config = require("../config");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

exports.resolve = dir => path.join(__dirname, "..", dir);

exports.assetsPath = function(_path) {
    const assetsSubDirectory =
        process.env.NODE_ENV === "production" ?
        config.build.assetsSubDirectory :
        config.dev.assetsSubDirectory;
    return path.posix.join(assetsSubDirectory, _path);
};

exports.generateStyleLoaders = function(options) {
    const output = [],
        { sourceMap, extract } = options,
        generateLoaders = (loader, loaderOption = {}) => {
            const firstLoader = extract ?
                miniCssExtractPlugin.loader :
                "vue-style-loader",
                cssLoader = {
                    loader: "css-loader",
                    options: {
                        sourceMap
                    }
                },
                postcssLoader = {
                    loader: "postcss-loader",
                    options: {
                        sourceMap
                    }
                },
                otherLoader = loader ?
                {
                    loader: loader + "-loader",
                    options: Object.assign({}, {
                            sourceMap
                        },
                        loaderOption
                    )
                } :
                [];
            return [firstLoader, cssLoader, postcssLoader].concat(otherLoader);
        },
        loaders = {
            css: generateLoaders(),
            less: generateLoaders("less").concat(),
            sass: generateLoaders("sass", {
                indentedSyntax: true
            }),
            scss: generateLoaders("sass"),
            stylus: generateLoaders("stylus"),
            styl: generateLoaders("stylus")
        };

    for (const extension in loaders) {
        const loader = loaders[extension];
        output.push({
            test: new RegExp("\\." + extension + "$"),
            use: loader
        });
    }
    return output;
};
