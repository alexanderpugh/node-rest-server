const jsonwebtoken = require('jsonwebtoken');

const User = require('../models/user.model');
const JsonResponse = require('../utils/JsonResponse');
const config = require('../config/config');

module.exports = {
	login ({req, res, next}) {
    const searchUser = req.body;
    const jsonRes = new JsonResponse();

    if (!searchUser) {
      jsonRes.message = 'ERROR: No details provided';
      res.send(jsonRes);
      return;
    }

    User.findOne({ username: searchUser.username }, (err, user) => {
      if (err) {
        jsonRes.message = 'ERROR: an error occured';
        res.json(jsonRes);
      } else {
        user.comparePassword(searchUser.password, (err, isMatch) => {
          if (err) {
            jsonRes.message = 'ERROR: unable to log user in. Incorrect details.';         
          } else {
            jsonRes.data.token = this.setAndSetToken(user.getInserted());
            jsonRes.success = true;
          }
          res.json(jsonRes); 
        });
      }
    });
	},

	signup ({req, res, next}) {
    const jsonRes = new JsonResponse();

    if (!req.body.username && !req.body.password) {
      jsonRes.message = 'ERROR: No details provided';
      res.send(jsonRes);
      return;
    }

    const user = new User({
      username: req.body.username,
      password: req.body.password
    });

    user.save((err) => {
      if (err) {
        jsonRes.message = 'ERROR: unable to sign user up';
      } else {
        jsonRes.success = true;
        jsonRes.data.token = this.setAndSetToken(user.getInserted());
      }
      res.send(jsonRes);
    });
  },

  setAndSetToken (user) {
    return jsonwebtoken.sign(user, config.secret, {
      expiresIn: 1440 
    });
  }
};
