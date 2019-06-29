module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true
    },
    'extends': [
        'airbnb'
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'plugins': [
        'react'
    ],
    'rules': {
        'indent': ['error', 4],
        'no-underscore-dangle': ['error', {'allowAfterThis': true}],
        'class-methods-use-this': ['off'],
        'no-param-reassign': ['off'],
        'default-case': ['off'],
        'yoda': ['off'],
    }
};
