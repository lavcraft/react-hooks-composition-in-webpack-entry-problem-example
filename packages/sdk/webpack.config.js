const path = require('path');
const fs = require('fs');
const merge = require('webpack-merge').merge;
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

/** @type {import('webpack').Configuration} */
const base = {
    mode: "development",
    entry: {
        'index': './src/store/index.ts',
        // 'index': [
        //     './src/store/contexts.ts',
        //     './src/store/devices.ts',
        //     './src/store/call.ts',
        // ],
        // 'store/': './src/store/contexts.ts',
        // 'store/devices': './src/store/devices.ts',
        // 'store/call': './src/store/call.ts',
        // 'store/devices': {
        //     import: './src/store/devices.ts',
        //     dependOn: 'store/contexts', /*chunkLoading: false,*/
        //     // library: {type: 'this'}
        // },
        // 'store/call': {import: './src/store/call.ts', dependOn: 'store/contexts', /*chunkLoading: false,*/},
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                    options: {
                        // transpileOnly: true,
                        projectReferences: true
                    }
                }
            },
        ],
    },
    externals: {
        'undici': 'undici',
        'mobx': 'commonjs mobx',
        'mobx-react-lite': 'commonjs mobx-react-lite',
        'voximplant-websdk': 'voximplant-websdk',
        'react': 'commonjs react',
    },
    resolve: {
        modules: [
            path.resolve(__dirname, "./node_modules"),
            path.resolve(__dirname, "../../node_modules"),
        ],
        extensions: ['.ts', '.js'],
        plugins: [new TsconfigPathsPlugin()],
    },
    optimization: {
        minimize: false,
        // runtimeChunk: 'single',
    },
    output: {
        path: path.resolve(__dirname, 'lib-sdk'),
        globalObject: 'this',
    },
}

const commonjs = {
    name: 'commonjs',
    output: {
        filename: '[name].cjs.js',
        libraryTarget: 'commonjs',
    }
}

const umd = {
    name: 'umd',
    output: {
        filename: '[name].esm.js',
        libraryTarget: 'this',
    }
}

module.exports = [merge(base, commonjs), merge(base, umd)];