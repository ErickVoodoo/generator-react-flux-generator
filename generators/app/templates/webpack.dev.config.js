var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var path = require("path");

var devServerPort = require("./package.json").devServerPort;

var publicFolderName = ".public";
var localhost = "http://localhost:" + devServerPort + "/";

module.exports = {
    entry: [
        'webpack-dev-server/client?' + localhost,
        'webpack/hot/only-dev-server',
        'babel-polyfill',
        './src/app/main',
    ],
    resolve: {
        extensions: ['', '.js', '.json', '.jsx', '.scss'],
    },
    devtool: "source-map",
    output: {
        path: __dirname + '/' + publicFolderName,
        publicPath: localhost + 'src/',
        filename: 'application.js',
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
    ],
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loaders: ['jscs-loader'],
                include: path.join(__dirname, 'src')
            }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['react-hot', 'babel'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.(scss|css)$/,
                loader: 'style-loader!css-loader?localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader?sourceMap'
            },
            {
                test: /\.(png|jpg|gif)$//*, loader: 'file-loader'*/,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ],
            },
            {
                test: /\.(json)$/, loader: 'json-loader'
            },
            {
                test   : /\.(ttf|eot|svg|woff|otf)(\?[a-z0-9]+)?$/,
                loader : 'file'
            }
        ]
    },
    postcss: [
        autoprefixer({ browsers: ['Android >= 2.3', 'iOS >= 7', 'Chrome >= 46'] })
    ],
    eslint: {
        configFile: './.eslintrc',
    },
    jscs: {
        // JSCS errors are displayed by default as warnings.
        // Set `emitErrors` to `true` to display them as errors.
        emitErrors: false,

        // JSCS errors do not interrupt the compilation.
        // Set `failOnHint` to `true` if you want any file with
        // JSCS errors to fail.
        failOnHint: false,
    }
};
