# Should I Ride?

A simple JAMstack app to tell me if I should ride my bike based on local weather conditions. The front end implementation is Vue.js SPA, while the backend is provided by Netlify serverless functions.

This app can be run via the [Netlify CLI](https://cli.netlify.com/getting-started). This will need to be installed globally as a prerequisite:
```
npm install netlify-cli -g
```

## Run Development
This command will start the Netlify Dev environment. Additionally it will also start the webpack development server for the Vue.js SPA, this has been configured in `netlify.toml`.
```
netlify dev
```

The Webpack dev server proxy has been configured within `vue.config.js`. Netlify functions can then be accessed via the webpack dev server url. This mimics the production environment and keeps the dev experience consistent. 
```
 http://localhost:8080/.netlify/functions/getDate
 ```

## Deploy
Once the site is linked it can be deployed via the Netlify CLI. The built front end client will be deployed from the `dist` directory as specified as in the `netlify.toml`. 
```
netlify deploy
```
Functions will be automatically deployed with their dependencies. In the future these could be bundled as part of the build process into a single file per function.