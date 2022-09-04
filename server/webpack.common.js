const nodeExternals = require('webpack-node-externals')

module.exports = {
    entry: {
        main: "./src/main.ts"
    },
    target: 'node',
    node: {
        __dirname: false,
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/dist"
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".js", ".json"],
        // alias: {
        //     '@': path.resolve(__dirname, 'src/'),
        // }
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: "ts-loader"
        }, ]
    },
    externals: nodeExternals({ modulesFromFile: true }),
};
