"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dbConfig = _interopRequireDefault(require("../../../config/db.config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const checkToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({
    auth: false,
    error: "No token was provided."
  });

  try {
    const verified = _jsonwebtoken.default.verify(token, _dbConfig.default.token);

    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({
      auth: false,
      error: "Failed to authenticate token."
    });
  }
};

var _default = checkToken;
exports.default = _default;