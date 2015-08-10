module.exports = {
    entry: {
        app: ['./app/client/main.js']
    },
    output: {
        path: './assets',
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    resolve: {
        alias: {
          websocketUrl: '../../servers/remote.js'
        }
    }
};
