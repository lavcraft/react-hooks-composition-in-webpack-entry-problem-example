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

const base = {
    mode: "development",
    entry: {
        'store/b-module': './src/store/b-module.ts',
        'store/a-module': {
            import: './src/store/a-module.ts',
            dependOn: 'store/b-module',
        },
        'store/contexts': './src/store/contexts.ts',
        'store/call': {
            import: './src/store/call.ts',
            dependOn: 'store/contexts',
        },
        'store/devices': {
            import: './src/store/devices.ts',
            dependOn: 'store/contexts',
        },
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
        // runtimeChunk: 'single',
    },
    output: {
        filename: '[name].cjs.js',
        path: path.resolve(__dirname, 'lib-sdk'),
        globalObject: `(typeof window==='undefined'?this:window)`,
        library: {
            type: "commonjs"
        },
    },
}

module.exports = base;
