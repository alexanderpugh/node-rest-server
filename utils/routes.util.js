module.exports.sortRouteArrays = ({routesArray, app}) => {
  routesArray.forEach((route) => {
    const url = route.url;
    const [ controllerName, controllerMethod ] = route.controller.split('.');
    const httpMethod = route.httpMethod.toLowerCase();
    const developOnly = route.developOnly;

    const controllerObject = require(`../controllers/${controllerName}.controller.js`);
    app[httpMethod](`/api/${url}`, (req, res, next) => {
      controllerObject[controllerMethod]({req, res, next})
    });
  });
};
