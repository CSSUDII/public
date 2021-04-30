"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _helmet = _interopRequireDefault(require("helmet"));

var _hsts = _interopRequireDefault(require("hsts"));

var _indexRouter = _interopRequireDefault(require("./routes/indexRouter"));

var _placeholdersRouter = _interopRequireDefault(require("./routes/placeholdersRouter"));

var _UserRouter = _interopRequireDefault(require("./routes/UserRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const server = (0, _express.default)();

class Server {
  constructor() {
    server.use('/', _indexRouter.default);
    server.use('/v1/placeholders', _placeholdersRouter.default);
    server.use('/v1/auth', _UserRouter.default); // Security Stuff

    server.use((0, _helmet.default)());
    const hstsMiddleware = (0, _hsts.default)({
      maxAge: 1234000
    });
    server.use((req, res, next) => {
      if (req.secure) {
        hstsMiddleware(req, res, next);
      } else {
        next();
      }
    });
  }

}

;
new Server();
var _default = server;
exports.default = _default;