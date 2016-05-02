import Express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { RouterContext, match } from 'react-router';

import { createMemoryHistory, useQueries } from 'history';
import compression from 'compression';
import Promise from 'bluebird';

import configureStore from 'store/configureStore';
import createRoutes from 'routes/index';

import { Provider } from 'react-redux';

import apiRoutes from './routes';

let server = new Express();
let port = process.env.PORT || 4000;
let scriptSrcs;

let styleSrc;

if ( process.env.NODE_ENV === 'production' ) {
  let refManifest = require('../../dist/rev-manifest.json');
  scriptSrcs = [
    `/vendor.js`,
    `/app.js`
  ];
  styleSrc = `/${refManifest['main.css']}`;
} else {
  scriptSrcs = [
    'http://localhost:4001/static/vendor.js',
    'http://localhost:4001/static/dev.js',
    'http://localhost:4001/static/app.js'
  ];
  styleSrc = '/main.css';
}

server.use(compression());
server.use(Express.static(path.join(__dirname, '../..', 'dist')));
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');


server.use(cookieParser());
server.use(bodyParser.json());
// parse request bodies (req.body)
server.use(bodyParser.urlencoded({ extended: true }));
// allow overriding methods in query (?_method=put)
server.use(methodOverride('_method'));
server.use(session({
secret: 'zgz-backend!!!',
resave: false,
saveUninitialized: false,
cookie: { maxAge: 60000 }
}));

// apis
server.use('/api', apiRoutes);

server.get('*', (req, res, next)=> {
  let history = useQueries(createMemoryHistory)();
  let store = configureStore();
  let routes = createRoutes(history);
  let location = history.createLocation(req.url);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      res.status(500).send(error.message);
    } else if (renderProps == null) {
      res.status(404).send('Not found')
    } else {
      let [ getCurrentUrl, unsubscribe ] = subscribeUrl();
      let reqUrl = location.pathname + location.search;

      getReduxPromise().then(()=> {
        let reduxState = escape(JSON.stringify(store.getState()));
        let html = ReactDOMServer.renderToString(
          <Provider store={store}>
            { <RouterContext {...renderProps}/> }
          </Provider>
        );

        if ( getCurrentUrl() === reqUrl ) {
          res.render('index', { html, scriptSrcs, reduxState, styleSrc });
        } else {
          res.redirect(302, getCurrentUrl());
        }
        unsubscribe();
      })
      .catch((err)=> {
        unsubscribe();
        next(err);
      });
      function getReduxPromise () {
        let { query, params } = renderProps;
        let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;
        let promise = comp.fetchData ?
          comp.fetchData({ query, params, store, history }) :
          Promise.resolve();

        return promise;
      }
    }
  });
  function subscribeUrl () {
    let currentUrl = location.pathname + location.search;
    let unsubscribe = history.listen((newLoc)=> {
      if (newLoc.action === 'PUSH') {
        currentUrl = newLoc.pathname + newLoc.search;
      }
    });
    return [
      ()=> currentUrl,
      unsubscribe
    ];
  }
});

server.use((err, req, res, next)=> {
  console.log(err);
  // TODO report error here or do some further handlings
  res.status(500).send("something went wrong...")
})

console.log(`Server is listening to port: ${port}`);
server.listen(port);
