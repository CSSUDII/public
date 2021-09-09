"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRoutesMap = exports.server = void 0;

var _express = _interopRequireDefault(require("express"));

var _helmet = _interopRequireDefault(require("helmet"));

var _hsts = _interopRequireDefault(require("hsts"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

require("regenerator-runtime/runtime.js");

var IndexRouter = _interopRequireWildcard(require("./routes/indexRouter"));

var QRGenRouter = _interopRequireWildcard(require("./routes/QRGenRouter"));

var UserRouter = _interopRequireWildcard(require("./routes/UserRouter"));

var ImageRouter = _interopRequireWildcard(require("./routes/ImageRouter"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var server = (0, _express["default"])();
exports.server = server;
var routes = new Map();

var Server = /*#__PURE__*/function () {
  /**
   * Creates a new server
   * @constructor
   */
  function Server() {
    _classCallCheck(this, Server);

    this.init();
  }

  _createClass(Server, [{
    key: "setupRoutes",
    value: function () {
      var _setupRoutes = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                server.use(IndexRouter.path, IndexRouter.router);
                server.use(QRGenRouter.path, QRGenRouter.router);
                server.use(UserRouter.path, UserRouter.router);
                server.use(ImageRouter.path, ImageRouter.router);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function setupRoutes() {
        return _setupRoutes.apply(this, arguments);
      }

      return setupRoutes;
    }()
  }, {
    key: "init",
    value: function init() {
      // Setup Routers
      this.setupRoutes(); // Security Stuff

      server.use((0, _helmet["default"])()); // JSON

      server.use('/', _express["default"].json()); // Cores

      server.use((0, _cors["default"])());

      if (process.env.NODE_ENV === 'development') {
        server.use((0, _morgan["default"])('dev'));
      }

      var hstsMiddleware = (0, _hsts["default"])({
        maxAge: 1234000
      });
      server.use(function (req, res, next) {
        if (req.secure) {
          hstsMiddleware(req, res, next);
        } else {
          next();
        }
      });
    }
  }]);

  return Server;
}();

var getRoutesMap = function getRoutesMap() {
  return routes;
};

exports.getRoutesMap = getRoutesMap;
new Server();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2ZXIvU2VydmVyLnRzIl0sIm5hbWVzIjpbInNlcnZlciIsInJvdXRlcyIsIk1hcCIsIlNlcnZlciIsImluaXQiLCJ1c2UiLCJJbmRleFJvdXRlciIsInBhdGgiLCJyb3V0ZXIiLCJRUkdlblJvdXRlciIsIlVzZXJSb3V0ZXIiLCJJbWFnZVJvdXRlciIsInNldHVwUm91dGVzIiwiZXhwcmVzcyIsImpzb24iLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJoc3RzTWlkZGxld2FyZSIsIm1heEFnZSIsInJlcSIsInJlcyIsIm5leHQiLCJzZWN1cmUiLCJnZXRSb3V0ZXNNYXAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOztBQUVBOztBQUtBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTyxJQUFNQSxNQUFNLEdBQUcsMEJBQWY7O0FBQ1AsSUFBTUMsTUFBMkIsR0FBRyxJQUFJQyxHQUFKLEVBQXBDOztJQUVNQyxNO0FBQ0Y7QUFDSjtBQUNBO0FBQ0E7QUFDSSxvQkFBYztBQUFBOztBQUNWLFNBQUtDLElBQUw7QUFDSDs7Ozs7aUZBRUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNJSixnQkFBQUEsTUFBTSxDQUFDSyxHQUFQLENBQVdDLFdBQVcsQ0FBQ0MsSUFBdkIsRUFBNkJELFdBQVcsQ0FBQ0UsTUFBekM7QUFDQVIsZ0JBQUFBLE1BQU0sQ0FBQ0ssR0FBUCxDQUFXSSxXQUFXLENBQUNGLElBQXZCLEVBQTZCRSxXQUFXLENBQUNELE1BQXpDO0FBQ0FSLGdCQUFBQSxNQUFNLENBQUNLLEdBQVAsQ0FBV0ssVUFBVSxDQUFDSCxJQUF0QixFQUE0QkcsVUFBVSxDQUFDRixNQUF2QztBQUNBUixnQkFBQUEsTUFBTSxDQUFDSyxHQUFQLENBQVdNLFdBQVcsQ0FBQ0osSUFBdkIsRUFBNkJJLFdBQVcsQ0FBQ0gsTUFBekM7O0FBSko7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTzs7Ozs7Ozs7OztXQU9BLGdCQUFxQjtBQUNqQjtBQUNBLFdBQUtJLFdBQUwsR0FGaUIsQ0FJakI7O0FBQ0FaLE1BQUFBLE1BQU0sQ0FBQ0ssR0FBUCxDQUFXLHlCQUFYLEVBTGlCLENBT2pCOztBQUNBTCxNQUFBQSxNQUFNLENBQUNLLEdBQVAsQ0FBVyxHQUFYLEVBQWdCUSxvQkFBUUMsSUFBUixFQUFoQixFQVJpQixDQVVqQjs7QUFDQWQsTUFBQUEsTUFBTSxDQUFDSyxHQUFQLENBQVcsdUJBQVg7O0FBRUEsVUFBSVUsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsYUFBN0IsRUFBNEM7QUFDeENqQixRQUFBQSxNQUFNLENBQUNLLEdBQVAsQ0FBVyx3QkFBTyxLQUFQLENBQVg7QUFDSDs7QUFFRCxVQUFNYSxjQUFjLEdBQUcsc0JBQUs7QUFDeEJDLFFBQUFBLE1BQU0sRUFBRTtBQURnQixPQUFMLENBQXZCO0FBSUFuQixNQUFBQSxNQUFNLENBQUNLLEdBQVAsQ0FBVyxVQUFDZSxHQUFELEVBQWVDLEdBQWYsRUFBOEJDLElBQTlCLEVBQXFEO0FBQzVELFlBQUlGLEdBQUcsQ0FBQ0csTUFBUixFQUFnQjtBQUNaTCxVQUFBQSxjQUFjLENBQUNFLEdBQUQsRUFBTUMsR0FBTixFQUFXQyxJQUFYLENBQWQ7QUFDSCxTQUZELE1BRU87QUFDSEEsVUFBQUEsSUFBSTtBQUNQO0FBQ0osT0FORDtBQU9IOzs7Ozs7QUFHRSxJQUFNRSxZQUFZLEdBQUUsU0FBZEEsWUFBYyxHQUEyQjtBQUNsRCxTQUFPdkIsTUFBUDtBQUNILENBRk07OztBQUlQLElBQUlFLE1BQUoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcywgeyBSb3V0ZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xuXG5pbXBvcnQgaGVsbWV0IGZyb20gXCJoZWxtZXRcIjtcbmltcG9ydCBoc3RzIGZyb20gXCJoc3RzXCI7XG5pbXBvcnQgY29ycyBmcm9tIFwiY29yc1wiO1xuXG5pbXBvcnQgbW9yZ2FuIGZyb20gXCJtb3JnYW5cIjtcblxuaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzXCI7XG5cbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlLCBOZXh0RnVuY3Rpb24gfSBmcm9tIFwiZXhwcmVzc1wiO1xuLy8gaW1wb3J0IHsgbG9hZFJvdXRlcyB9IGZyb20gXCIuL2Z1bmN0aW9ucy9sb2FkUm91dGVzXCI7XG5cbmltcG9ydCAqIGFzIEluZGV4Um91dGVyIGZyb20gXCIuL3JvdXRlcy9pbmRleFJvdXRlclwiO1xuaW1wb3J0ICogYXMgUVJHZW5Sb3V0ZXIgZnJvbSBcIi4vcm91dGVzL1FSR2VuUm91dGVyXCI7XG5pbXBvcnQgKiBhcyBVc2VyUm91dGVyIGZyb20gXCIuL3JvdXRlcy9Vc2VyUm91dGVyXCI7XG5pbXBvcnQgKiBhcyBJbWFnZVJvdXRlciBmcm9tIFwiLi9yb3V0ZXMvSW1hZ2VSb3V0ZXJcIjsgXG5cbmV4cG9ydCBjb25zdCBzZXJ2ZXIgPSBleHByZXNzKCk7XG5jb25zdCByb3V0ZXM6IE1hcDxzdHJpbmcsIFJvdXRlcj4gPSBuZXcgTWFwKCk7XG5cbmNsYXNzIFNlcnZlciB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBzZXJ2ZXJcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBzZXR1cFJvdXRlcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgc2VydmVyLnVzZShJbmRleFJvdXRlci5wYXRoLCBJbmRleFJvdXRlci5yb3V0ZXIpO1xuICAgICAgICBzZXJ2ZXIudXNlKFFSR2VuUm91dGVyLnBhdGgsIFFSR2VuUm91dGVyLnJvdXRlcik7XG4gICAgICAgIHNlcnZlci51c2UoVXNlclJvdXRlci5wYXRoLCBVc2VyUm91dGVyLnJvdXRlcik7XG4gICAgICAgIHNlcnZlci51c2UoSW1hZ2VSb3V0ZXIucGF0aCwgSW1hZ2VSb3V0ZXIucm91dGVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXQoKTogdm9pZCB7XG4gICAgICAgIC8vIFNldHVwIFJvdXRlcnNcbiAgICAgICAgdGhpcy5zZXR1cFJvdXRlcygpO1xuICAgICAgICBcbiAgICAgICAgLy8gU2VjdXJpdHkgU3R1ZmZcbiAgICAgICAgc2VydmVyLnVzZShoZWxtZXQoKSk7XG5cbiAgICAgICAgLy8gSlNPTlxuICAgICAgICBzZXJ2ZXIudXNlKCcvJywgZXhwcmVzcy5qc29uKCkpO1xuXG4gICAgICAgIC8vIENvcmVzXG4gICAgICAgIHNlcnZlci51c2UoY29ycygpKTtcblxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgICAgICAgIHNlcnZlci51c2UobW9yZ2FuKCdkZXYnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBoc3RzTWlkZGxld2FyZSA9IGhzdHMoe1xuICAgICAgICAgICAgbWF4QWdlOiAxMjM0MDAwXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlcnZlci51c2UoKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVxLnNlY3VyZSkge1xuICAgICAgICAgICAgICAgIGhzdHNNaWRkbGV3YXJlKHJlcSwgcmVzLCBuZXh0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBnZXRSb3V0ZXNNYXA9ICgpOiBNYXA8c3RyaW5nLCBSb3V0ZXI+ID0+IHtcbiAgICByZXR1cm4gcm91dGVzO1xufVxuXG5uZXcgU2VydmVyKCk7Il19