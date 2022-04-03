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
    name: 'commonjs',
    mode: "development",
    entry: {
        'store/devices': {
            import: './src/store/devices.ts',
            dependOn: 'store/contexts',
        },
        'store/call': './src/store/call.ts',
        'store/contexts': './src/store/contexts.ts',
        // 'store/devices': './src/store/devices.ts',
        // 'store/call': {import: './src/store/call.ts', dependOn: 'store/contexts', /*chunkLoading: false,*/},
    },
    devtool: false,
    context: __dirname,
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
        'mobx': 'mobx',
        'mobx-react-lite': 'mobx-react-lite',
        'voximplant-websdk': 'voximplant-websdk',
        'react': 'react',
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
        libraryTarget: 'umd',
    }
}

module.exports = [merge(base, commonjs), merge(base, umd)];