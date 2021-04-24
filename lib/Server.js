"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const server = (0, _express.default)();
server.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});
var _default = server;
exports.default = _default;