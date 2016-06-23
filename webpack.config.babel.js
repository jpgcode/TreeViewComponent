const path              = require('path');
const webpack           = require('webpack');
const merge             = require('webpack-merge');
const NpmInstallPlugin  = require('npm-install-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
    nodeModules: path.join(__dirname, 'node_modules')
};

const common = {
    entry:{
        app: PATHS.app
    },
    resolve: {
        extentions: ['', '.js'],
        modulesDirectories: [
        'node_modules'
        ]
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                include: PATHS.app,
                exclude: [
                    PATHS.nodeModules
                ]
            }
        ],
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel?compact=false',
                include: PATHS.app,
                exclude: /(node_modules)/
            }
        ]
    }
};

if (TARGET === 'start' || !TARGET ) {
    module.exports = merge(common, {
        devTools: 'eval-source-map',
        devServer: {
            contentBase: PATHS.build,
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            stats: 'errors-only'
        },
        plugins: [
            new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
            new webpack.HotModuleReplacementPlugin(),
            new NpmInstallPlugin({
                save: true
            })
        ]
    });
}

if (TARGET === 'build') {
    module.exports = merge(common, {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
              compress: { warnings: false }
            })
        ]
    });
}
