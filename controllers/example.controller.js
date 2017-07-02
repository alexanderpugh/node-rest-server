const info = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>EXAMPLE</title>
    </head>
    <body>
      <h1>EXAMPLE ROUTE REMOVE ME!!!</h1>
    </body>
  </html>
`;

module.exports = {
	controllerMethod ({req, res, next}) {
    res.send(info);
	}
};
