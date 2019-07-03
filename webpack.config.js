const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    output: {
        filename: 'pigment.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'pigmentjs',
        libraryTarget: 'umd',
    },
};
