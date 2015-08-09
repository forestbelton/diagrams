module.exports = {
    entry: {
        app: ['webpack/hot/dev-server', './app/main.js']
    },
    output: {
        path: './assets/built',
        publicPath: '/built',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    }
};
