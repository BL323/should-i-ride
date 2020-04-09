module.exports = {
    devServer: {
        proxy: {
            '/.netlify': {
            target: 'http://localhost:34567',
            pathRewrite: { '^/.netlify/functions': '' },
            },
        },
    },
    lintOnSave: false,
    };