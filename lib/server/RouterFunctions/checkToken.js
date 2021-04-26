"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dbConfig = _interopRequireDefault(require("../../../config/db.config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(403).send({
    auth: false,
    message: 'No token was provided.'
  });

  _jsonwebtoken.default.verify(token, _dbConfig.default.token, (err, decoded) => {
    if (err) return res.status(500).send({
      auth: false,
      message: 'Failed to authenticate token.'
    });
    req.userId = decoded.id;
    next();
  });
}

;
var _default = checkToken;
exports.default = _default;