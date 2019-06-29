const path = require('path');

module.exports = {
    entry: './src/pigment.js',
    mode: 'production',
    output: {
        filename: 'pigment.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'pigmentjs',
        libraryTarget: 'umd',
    },
};
