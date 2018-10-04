module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
    },
    extends: 'standard',
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module'
    },
    parser: 'typescript-eslint-parser',
    plugins: ['typescript', 'tslint'],
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always']
    }
};
