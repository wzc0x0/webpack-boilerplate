module.exports = {
    presets: [
        ["@babel/preset-env", { modules: false }]
    ],
    plugins: [
        [
            "@babel/plugin-transform-runtime",
            {
                corejs: 3
            }
        ],
        "@babel/plugin-syntax-dynamic-import", [
            "component",
            {
                libraryName: "element-ui",
                styleLibraryName: "theme-chalk"
            }
        ]
    ]
};