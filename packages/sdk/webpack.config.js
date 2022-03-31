const path = require('path');
const fs = require('fs');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');


function files(dir = '.', exclude = ['__tests__']) {
    return fs.readdirSync(path.resolve(__dirname, `src/${dir}`))
        .reduce((prev, current) => {
            if (exclude.includes(current)) return prev;
            const targetName = current.replace('\.ts', '');
            prev[`${dir}/${targetName}`] = `./src/${dir}/${current}`;
            return prev;
        }, {})
}

module.exports = {
    mode: process.env.NODE_ENV ?? 'development',
    entry: {
        'vox/index': './src/vox/index.ts',
        'store/contexts': './src/store/contexts.ts',
        'store/devices': './src/store/devices.ts',
        'store/call': './src/store/call.ts',

        // 'store/call': {
        //     dependOn: ['store/devices'],
        //     import: './src/store/call.ts',
        //     library: {
        //         type: 'this',
        //     }
        // },

        ...files('call'),
        // ...files('domain'),
        // ...files('vk'),
        // ...files('media'),
        // ...files('hardware'),
        // ...files('utils'),
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                    options: {
                        projectReferences: true
                    }
                }
            },
        ],
    },
    externals: {
        'undici': 'undici',
        'mobx': 'mobx',
        'mobx-react-lite': 'mobx-react-lite',
        'voximplant-websdk': 'voximplant-websdk',
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "React",
            root: "React"
        },
    },
    resolve: {
        modules: [
            path.resolve(__dirname, "./node_modules"),
            path.resolve(__dirname, "../../node_modules"),
            path.resolve(__dirname, "./src")
        ],
        extensions: ['.ts', '.js'],
        plugins: [new TsconfigPathsPlugin()],
    },
    output: {
        filename: '[name].esm.js',
        path: path.resolve(__dirname, 'lib-sdk'),
        globalObject: 'this',
        library: {
            type: 'umd',
        },
    },
};