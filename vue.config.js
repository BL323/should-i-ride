module.exports = {
    devServer: {
        proxy: {
            '/.netlify': {
            target: 'http://localhost:34567',
            // make netlify functions accessible from webpack dev server 
            // i.e http://localhost:8080/.netlify/functions/getDate
            pathRewrite: { '^/.netlify/functions': '' },
            },
        },
    },
    css: {
        loaderOptions: {
          sass: {
            data: `
              @import "@/scss/_variables.scss";
            `
          }
        }
      },
    lintOnSave: true,
};