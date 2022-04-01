/** @type {import('next').NextConfig} */
module.exports = {
    poweredByHeader: false,
    webpack: (config, { dev }) => {
        // disable sourcemaps of webpack
        config.devtool = false

        // disable soucemaps of babel-loader
        for (const r of config.module.rules) {
            if (r.loader === 'babel-loader') {
                r.options.sourceMaps = false
            }
        }

        return config
    }
};