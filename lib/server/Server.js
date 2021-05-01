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

  ;
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

;
new Server();
var _default = server;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2ZXIvU2VydmVyLnRzIl0sIm5hbWVzIjpbInNlcnZlciIsIlNlcnZlciIsInVzZSIsImluZGV4Um91dGVyIiwicGxhY2Vob2xkZXJzUm91dGVyIiwiVXNlcnNSb3V0ZXIiLCJleHByZXNzIiwianNvbiIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsImhzdHNNaWRkbGV3YXJlIiwibWF4QWdlIiwicmVxIiwicmVzIiwibmV4dCIsInNlY3VyZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUNBOztBQUNBOzs7Ozs7QUFJQSxJQUFNQSxNQUFNLEdBQUcsMEJBQWY7O0lBRU1DLE0sR0FDRixrQkFBYztBQUFBOztBQUNWRCxFQUFBQSxNQUFNLENBQUNFLEdBQVAsQ0FBVyxHQUFYLEVBQWdCQyx1QkFBaEI7QUFDQUgsRUFBQUEsTUFBTSxDQUFDRSxHQUFQLENBQVcsa0JBQVgsRUFBK0JFLDhCQUEvQjtBQUNBSixFQUFBQSxNQUFNLENBQUNFLEdBQVAsQ0FBVyxVQUFYLEVBQXVCRyxzQkFBdkI7QUFFQUwsRUFBQUEsTUFBTSxDQUFDRSxHQUFQLENBQVcsR0FBWCxFQUFnQkksb0JBQVFDLElBQVIsRUFBaEIsRUFMVSxDQU9WOztBQUNBUCxFQUFBQSxNQUFNLENBQUNFLEdBQVAsQ0FBVyx5QkFBWCxFQVJVLENBVVY7O0FBQ0FGLEVBQUFBLE1BQU0sQ0FBQ0UsR0FBUCxDQUFXLHVCQUFYOztBQUVBLE1BQUlNLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLGFBQTdCLEVBQTRDO0FBQ3hDVixJQUFBQSxNQUFNLENBQUNFLEdBQVAsQ0FBVyx3QkFBTyxLQUFQLENBQVg7QUFDSDs7QUFBQTtBQUVELE1BQU1TLGNBQWMsR0FBRyxzQkFBSztBQUN4QkMsSUFBQUEsTUFBTSxFQUFFO0FBRGdCLEdBQUwsQ0FBdkI7QUFJQVosRUFBQUEsTUFBTSxDQUFDRSxHQUFQLENBQVcsVUFBQ1csR0FBRCxFQUFlQyxHQUFmLEVBQThCQyxJQUE5QixFQUFxRDtBQUM1RCxRQUFJRixHQUFHLENBQUNHLE1BQVIsRUFBZ0I7QUFDWkwsTUFBQUEsY0FBYyxDQUFDRSxHQUFELEVBQU1DLEdBQU4sRUFBV0MsSUFBWCxDQUFkO0FBQ0gsS0FGRCxNQUVPO0FBQ0hBLE1BQUFBLElBQUk7QUFDUDtBQUNKLEdBTkQ7QUFRSCxDOztBQUNKO0FBRUQsSUFBSWQsTUFBSjtlQUVlRCxNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcblxuaW1wb3J0IGhlbG1ldCBmcm9tIFwiaGVsbWV0XCI7XG5pbXBvcnQgaHN0cyBmcm9tIFwiaHN0c1wiO1xuaW1wb3J0IGNvcnMgZnJvbSBcImNvcnNcIjtcblxuaW1wb3J0IG1vcmdhbiBmcm9tIFwibW9yZ2FuXCI7XG5cbmltcG9ydCBcInJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qc1wiO1xuXG5pbXBvcnQgaW5kZXhSb3V0ZXIgZnJvbSBcIi4vcm91dGVzL2luZGV4Um91dGVyXCI7XG5pbXBvcnQgcGxhY2Vob2xkZXJzUm91dGVyIGZyb20gXCIuL3JvdXRlcy9wbGFjZWhvbGRlcnNSb3V0ZXJcIjtcbmltcG9ydCBVc2Vyc1JvdXRlciBmcm9tIFwiLi9yb3V0ZXMvVXNlclJvdXRlclwiO1xuXG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSwgTmV4dEZ1bmN0aW9uIH0gZnJvbSBcImV4cHJlc3NcIjtcblxuY29uc3Qgc2VydmVyID0gZXhwcmVzcygpO1xuXG5jbGFzcyBTZXJ2ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzZXJ2ZXIudXNlKCcvJywgaW5kZXhSb3V0ZXIpO1xuICAgICAgICBzZXJ2ZXIudXNlKCcvdjEvcGxhY2Vob2xkZXJzJywgcGxhY2Vob2xkZXJzUm91dGVyKTtcbiAgICAgICAgc2VydmVyLnVzZSgnL3YxL2F1dGgnLCBVc2Vyc1JvdXRlcik7XG5cbiAgICAgICAgc2VydmVyLnVzZSgnLycsIGV4cHJlc3MuanNvbigpKTtcblxuICAgICAgICAvLyBTZWN1cml0eSBTdHVmZlxuICAgICAgICBzZXJ2ZXIudXNlKGhlbG1ldCgpKTtcblxuICAgICAgICAvLyBDb3Jlc1xuICAgICAgICBzZXJ2ZXIudXNlKGNvcnMoKSk7XG5cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICAgICAgICBzZXJ2ZXIudXNlKG1vcmdhbignZGV2JykpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGhzdHNNaWRkbGV3YXJlID0gaHN0cyh7XG4gICAgICAgICAgICBtYXhBZ2U6IDEyMzQwMDBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2VydmVyLnVzZSgocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICAgICAgICAgIGlmIChyZXEuc2VjdXJlKSB7XG4gICAgICAgICAgICAgICAgaHN0c01pZGRsZXdhcmUocmVxLCByZXMsIG5leHQpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5leHQoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgfTtcbn07XG5cbm5ldyBTZXJ2ZXIoKTtcblxuZXhwb3J0IGRlZmF1bHQgc2VydmVyOyJdfQ==