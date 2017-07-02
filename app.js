const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const config = require('./config/config');
let routes = require('./config/routes.json');

const corsMiddleware = require('./middleware/cors.middleware');
const tokenCheck = require('./middleware/tokencheck.middleware');

const { sortRouteArrays } = require('./utils/routes.util');

mongoose.connect(config.mongo.url);

const port = 8000;
const app = express();

app.set('secret', config.secret); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('combined'));

app.use(corsMiddleware);

if (process.env.NODE_ENV !== 'PROD') {
  routes = Object.assign(routes, require('./config/devroutes.json'));
}

const preAuthRoutes = [];
const postAuthRoutes = [];
for (route in routes) {
  if (routes[route].authRequired) {
    postAuthRoutes.push(routes[route]);
  } else {
    preAuthRoutes.push(routes[route]);
  }
}

sortRouteArrays({routesArray: preAuthRoutes, app});
app.use(tokenCheck);
sortRouteArrays({routesArray: postAuthRoutes, app});

app.listen(port);
console.log(`application running at port ${port}`);
