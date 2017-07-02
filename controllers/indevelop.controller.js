const fs = require('fs');
const path = require('path');

const User = require('../models/user.model');

const JsonResponse = require('../utils/JsonResponse');

module.exports = {
  root ({req, res, next}) {
    res.redirect('/api/develop/client');
  },

  client ({req, res, next}) {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>nrs Development</title>
        </head>
        <body>
          <iframe style="width: 100%; height: 2000px;" src="http://localhost:8080/"></iframe>
        </body>
      </html>
    `);
  },

  getUsers ({req, res, next}) {
    const jsonRes = new JsonResponse();
    User.find((err, users) => {
      jsonRes.success = !Boolean(err);
      jsonRes.data = users || null;
      res.json(jsonRes);
    });
  },

  addUser ({req, res, next}) {
    const user = new User(req.body.user);

    user.save((err) => {
      const jsonRes = new JsonResponse();
      jsonRes.success = !Boolean(err);
      jsonRes.message = err;
      res.json(jsonRes);
    });
  },

  deleteUser ({req, res, next}) {
    const delId = req.params.userID;

  	User.remove({_id: delId}, (err) => {
      const jsonRes = new JsonResponse();
      jsonRes.success = !Boolean(err);
      jsonRes.message = err;
      res.json(jsonRes);
    });
  }
};
