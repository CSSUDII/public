"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _jsYaml = _interopRequireDefault(require("js-yaml"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkToken(req, res, next) {
  const dbConfig = _jsYaml.default.load(_fs.default.readFileSync('./config/db.config.yml', 'utf8'));

  var token = req.headers['x-access-token'];
  if (!token) return res.status(403).send({
    auth: false,
    message: 'No token was provided.'
  });

  _jsonwebtoken.default.verify(token, dbConfig.token, (err, decoded) => {
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