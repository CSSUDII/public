"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _helmet = _interopRequireDefault(require("helmet"));

var _hsts = _interopRequireDefault(require("hsts"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

require("regenerator-runtime/runtime.js");

var _indexRouter = _interopRequireDefault(require("./routes/indexRouter"));

var _placeholdersRouter = _interopRequireDefault(require("./routes/placeholdersRouter"));

var _UserRouter = _interopRequireDefault(require("./routes/UserRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var server = (0, _express["default"])();

var Server = function Server() {
  _classCallCheck(this, Server);

  server.use('/', _indexRouter["default"]);
  server.use('/v1/placeholders', _placeholdersRouter["default"]);
  server.use('/v1/auth', _UserRouter["default"]);
  server.use('/', _express["default"].json()); // Security Stuff

  server.use((0, _helmet["default"])()); // Cores

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
};

new Server();
var _default = server;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2ZXIvU2VydmVyLnRzIl0sIm5hbWVzIjpbInNlcnZlciIsIlNlcnZlciIsInVzZSIsImluZGV4Um91dGVyIiwicGxhY2Vob2xkZXJzUm91dGVyIiwiVXNlcnNSb3V0ZXIiLCJleHByZXNzIiwianNvbiIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsImhzdHNNaWRkbGV3YXJlIiwibWF4QWdlIiwicmVxIiwicmVzIiwibmV4dCIsInNlY3VyZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUNBOztBQUNBOzs7Ozs7QUFJQSxJQUFNQSxNQUFNLEdBQUcsMEJBQWY7O0lBRU1DLE0sR0FDRixrQkFBYztBQUFBOztBQUNWRCxFQUFBQSxNQUFNLENBQUNFLEdBQVAsQ0FBVyxHQUFYLEVBQWdCQyx1QkFBaEI7QUFDQUgsRUFBQUEsTUFBTSxDQUFDRSxHQUFQLENBQVcsa0JBQVgsRUFBK0JFLDhCQUEvQjtBQUNBSixFQUFBQSxNQUFNLENBQUNFLEdBQVAsQ0FBVyxVQUFYLEVBQXVCRyxzQkFBdkI7QUFFQUwsRUFBQUEsTUFBTSxDQUFDRSxHQUFQLENBQVcsR0FBWCxFQUFnQkksb0JBQVFDLElBQVIsRUFBaEIsRUFMVSxDQU9WOztBQUNBUCxFQUFBQSxNQUFNLENBQUNFLEdBQVAsQ0FBVyx5QkFBWCxFQVJVLENBVVY7O0FBQ0FGLEVBQUFBLE1BQU0sQ0FBQ0UsR0FBUCxDQUFXLHVCQUFYOztBQUVBLE1BQUlNLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLGFBQTdCLEVBQTRDO0FBQ3hDVixJQUFBQSxNQUFNLENBQUNFLEdBQVAsQ0FBVyx3QkFBTyxLQUFQLENBQVg7QUFDSDs7QUFFRCxNQUFNUyxjQUFjLEdBQUcsc0JBQUs7QUFDeEJDLElBQUFBLE1BQU0sRUFBRTtBQURnQixHQUFMLENBQXZCO0FBSUFaLEVBQUFBLE1BQU0sQ0FBQ0UsR0FBUCxDQUFXLFVBQUNXLEdBQUQsRUFBZUMsR0FBZixFQUE4QkMsSUFBOUIsRUFBcUQ7QUFDNUQsUUFBSUYsR0FBRyxDQUFDRyxNQUFSLEVBQWdCO0FBQ1pMLE1BQUFBLGNBQWMsQ0FBQ0UsR0FBRCxFQUFNQyxHQUFOLEVBQVdDLElBQVgsQ0FBZDtBQUNILEtBRkQsTUFFTztBQUNIQSxNQUFBQSxJQUFJO0FBQ1A7QUFDSixHQU5EO0FBUUgsQzs7QUFHTCxJQUFJZCxNQUFKO2VBRWVELE0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xuXG5pbXBvcnQgaGVsbWV0IGZyb20gXCJoZWxtZXRcIjtcbmltcG9ydCBoc3RzIGZyb20gXCJoc3RzXCI7XG5pbXBvcnQgY29ycyBmcm9tIFwiY29yc1wiO1xuXG5pbXBvcnQgbW9yZ2FuIGZyb20gXCJtb3JnYW5cIjtcblxuaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzXCI7XG5cbmltcG9ydCBpbmRleFJvdXRlciBmcm9tIFwiLi9yb3V0ZXMvaW5kZXhSb3V0ZXJcIjtcbmltcG9ydCBwbGFjZWhvbGRlcnNSb3V0ZXIgZnJvbSBcIi4vcm91dGVzL3BsYWNlaG9sZGVyc1JvdXRlclwiO1xuaW1wb3J0IFVzZXJzUm91dGVyIGZyb20gXCIuL3JvdXRlcy9Vc2VyUm91dGVyXCI7XG5cbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlLCBOZXh0RnVuY3Rpb24gfSBmcm9tIFwiZXhwcmVzc1wiO1xuXG5jb25zdCBzZXJ2ZXIgPSBleHByZXNzKCk7XG5cbmNsYXNzIFNlcnZlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHNlcnZlci51c2UoJy8nLCBpbmRleFJvdXRlcik7XG4gICAgICAgIHNlcnZlci51c2UoJy92MS9wbGFjZWhvbGRlcnMnLCBwbGFjZWhvbGRlcnNSb3V0ZXIpO1xuICAgICAgICBzZXJ2ZXIudXNlKCcvdjEvYXV0aCcsIFVzZXJzUm91dGVyKTtcblxuICAgICAgICBzZXJ2ZXIudXNlKCcvJywgZXhwcmVzcy5qc29uKCkpO1xuXG4gICAgICAgIC8vIFNlY3VyaXR5IFN0dWZmXG4gICAgICAgIHNlcnZlci51c2UoaGVsbWV0KCkpO1xuXG4gICAgICAgIC8vIENvcmVzXG4gICAgICAgIHNlcnZlci51c2UoY29ycygpKTtcblxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgICAgICAgIHNlcnZlci51c2UobW9yZ2FuKCdkZXYnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBoc3RzTWlkZGxld2FyZSA9IGhzdHMoe1xuICAgICAgICAgICAgbWF4QWdlOiAxMjM0MDAwXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlcnZlci51c2UoKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVxLnNlY3VyZSkge1xuICAgICAgICAgICAgICAgIGhzdHNNaWRkbGV3YXJlKHJlcSwgcmVzLCBuZXh0KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXh0KClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgIH1cbn1cblxubmV3IFNlcnZlcigpO1xuXG5leHBvcnQgZGVmYXVsdCBzZXJ2ZXI7Il19