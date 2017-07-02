const jsonwebtoken = require('jsonwebtoken');

const JsonResponse = require('../utils/JsonResponse');

module.exports = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jsonwebtoken.verify(token, app.get('superSecret'), (err, decoded) => {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        req.decoded = decoded;    
        next();
      }
    });

  } else {
    return res.status(403).json(new JsonResponse('ERROR: user not logged in.'));
  }
};
