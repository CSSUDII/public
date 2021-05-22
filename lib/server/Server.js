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

var _ImageRouter = _interopRequireDefault(require("./routes/ImageRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var server = (0, _express["default"])();

var Server =
/**
 * @constructor
 */
function Server() {
  _classCallCheck(this, Server);

  /**
   * Index Router
   * @returns Index Router
   */
  server.use('/', _indexRouter["default"]);
  /**
   * Placeholder Router
   * @returns Placeholder Router
   */

  server.use('/v1/placeholders', _placeholdersRouter["default"]);
  /**
   * Auth Router
   * @returns Auth Router
   */

  server.use('/v1/auth', _UserRouter["default"]);
  /**
   * Image Router
   * @returns Image Router
   */

  server.use('/v1/image', _ImageRouter["default"]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2ZXIvU2VydmVyLnRzIl0sIm5hbWVzIjpbInNlcnZlciIsIlNlcnZlciIsInVzZSIsImluZGV4Um91dGVyIiwicGxhY2Vob2xkZXJzUm91dGVyIiwiVXNlcnNSb3V0ZXIiLCJJbWFnZVJvdXRlciIsImV4cHJlc3MiLCJqc29uIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiaHN0c01pZGRsZXdhcmUiLCJtYXhBZ2UiLCJyZXEiLCJyZXMiLCJuZXh0Iiwic2VjdXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQUlBLElBQU1BLE1BQU0sR0FBRywwQkFBZjs7SUFFTUMsTTtBQUNGO0FBQ0o7QUFDQTtBQUNJLGtCQUFjO0FBQUE7O0FBQ1Y7QUFDUjtBQUNBO0FBQ0E7QUFDUUQsRUFBQUEsTUFBTSxDQUFDRSxHQUFQLENBQVcsR0FBWCxFQUFnQkMsdUJBQWhCO0FBQ0E7QUFDUjtBQUNBO0FBQ0E7O0FBQ1FILEVBQUFBLE1BQU0sQ0FBQ0UsR0FBUCxDQUFXLGtCQUFYLEVBQStCRSw4QkFBL0I7QUFDQTtBQUNSO0FBQ0E7QUFDQTs7QUFDUUosRUFBQUEsTUFBTSxDQUFDRSxHQUFQLENBQVcsVUFBWCxFQUF1Qkcsc0JBQXZCO0FBQ0E7QUFDUjtBQUNBO0FBQ0E7O0FBQ1FMLEVBQUFBLE1BQU0sQ0FBQ0UsR0FBUCxDQUFXLFdBQVgsRUFBd0JJLHVCQUF4QjtBQUVBTixFQUFBQSxNQUFNLENBQUNFLEdBQVAsQ0FBVyxHQUFYLEVBQWdCSyxvQkFBUUMsSUFBUixFQUFoQixFQXRCVSxDQXdCVjs7QUFDQVIsRUFBQUEsTUFBTSxDQUFDRSxHQUFQLENBQVcseUJBQVgsRUF6QlUsQ0EyQlY7O0FBQ0FGLEVBQUFBLE1BQU0sQ0FBQ0UsR0FBUCxDQUFXLHVCQUFYOztBQUVBLE1BQUlPLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLGFBQTdCLEVBQTRDO0FBQ3hDWCxJQUFBQSxNQUFNLENBQUNFLEdBQVAsQ0FBVyx3QkFBTyxLQUFQLENBQVg7QUFDSDs7QUFFRCxNQUFNVSxjQUFjLEdBQUcsc0JBQUs7QUFDeEJDLElBQUFBLE1BQU0sRUFBRTtBQURnQixHQUFMLENBQXZCO0FBSUFiLEVBQUFBLE1BQU0sQ0FBQ0UsR0FBUCxDQUFXLFVBQUNZLEdBQUQsRUFBZUMsR0FBZixFQUE4QkMsSUFBOUIsRUFBcUQ7QUFDNUQsUUFBSUYsR0FBRyxDQUFDRyxNQUFSLEVBQWdCO0FBQ1pMLE1BQUFBLGNBQWMsQ0FBQ0UsR0FBRCxFQUFNQyxHQUFOLEVBQVdDLElBQVgsQ0FBZDtBQUNILEtBRkQsTUFFTztBQUNIQSxNQUFBQSxJQUFJO0FBQ1A7QUFDSixHQU5EO0FBUUgsQzs7QUFHTCxJQUFJZixNQUFKO2VBRWVELE0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xuXG5pbXBvcnQgaGVsbWV0IGZyb20gXCJoZWxtZXRcIjtcbmltcG9ydCBoc3RzIGZyb20gXCJoc3RzXCI7XG5pbXBvcnQgY29ycyBmcm9tIFwiY29yc1wiO1xuXG5pbXBvcnQgbW9yZ2FuIGZyb20gXCJtb3JnYW5cIjtcblxuaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzXCI7XG5cbmltcG9ydCBpbmRleFJvdXRlciBmcm9tIFwiLi9yb3V0ZXMvaW5kZXhSb3V0ZXJcIjtcbmltcG9ydCBwbGFjZWhvbGRlcnNSb3V0ZXIgZnJvbSBcIi4vcm91dGVzL3BsYWNlaG9sZGVyc1JvdXRlclwiO1xuaW1wb3J0IFVzZXJzUm91dGVyIGZyb20gXCIuL3JvdXRlcy9Vc2VyUm91dGVyXCI7XG5pbXBvcnQgSW1hZ2VSb3V0ZXIgZnJvbSBcIi4vcm91dGVzL0ltYWdlUm91dGVyXCI7XG5cbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlLCBOZXh0RnVuY3Rpb24gfSBmcm9tIFwiZXhwcmVzc1wiO1xuXG5jb25zdCBzZXJ2ZXIgPSBleHByZXNzKCk7XG5cbmNsYXNzIFNlcnZlciB7XG4gICAgLyoqXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbmRleCBSb3V0ZXJcbiAgICAgICAgICogQHJldHVybnMgSW5kZXggUm91dGVyXG4gICAgICAgICAqL1xuICAgICAgICBzZXJ2ZXIudXNlKCcvJywgaW5kZXhSb3V0ZXIpO1xuICAgICAgICAvKipcbiAgICAgICAgICogUGxhY2Vob2xkZXIgUm91dGVyXG4gICAgICAgICAqIEByZXR1cm5zIFBsYWNlaG9sZGVyIFJvdXRlclxuICAgICAgICAgKi9cbiAgICAgICAgc2VydmVyLnVzZSgnL3YxL3BsYWNlaG9sZGVycycsIHBsYWNlaG9sZGVyc1JvdXRlcik7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBdXRoIFJvdXRlclxuICAgICAgICAgKiBAcmV0dXJucyBBdXRoIFJvdXRlclxuICAgICAgICAgKi9cbiAgICAgICAgc2VydmVyLnVzZSgnL3YxL2F1dGgnLCBVc2Vyc1JvdXRlcik7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbWFnZSBSb3V0ZXJcbiAgICAgICAgICogQHJldHVybnMgSW1hZ2UgUm91dGVyXG4gICAgICAgICAqL1xuICAgICAgICBzZXJ2ZXIudXNlKCcvdjEvaW1hZ2UnLCBJbWFnZVJvdXRlcik7XG5cbiAgICAgICAgc2VydmVyLnVzZSgnLycsIGV4cHJlc3MuanNvbigpKTtcblxuICAgICAgICAvLyBTZWN1cml0eSBTdHVmZlxuICAgICAgICBzZXJ2ZXIudXNlKGhlbG1ldCgpKTtcblxuICAgICAgICAvLyBDb3Jlc1xuICAgICAgICBzZXJ2ZXIudXNlKGNvcnMoKSk7XG5cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICAgICAgICBzZXJ2ZXIudXNlKG1vcmdhbignZGV2JykpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaHN0c01pZGRsZXdhcmUgPSBoc3RzKHtcbiAgICAgICAgICAgIG1heEFnZTogMTIzNDAwMFxuICAgICAgICB9KTtcblxuICAgICAgICBzZXJ2ZXIudXNlKChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcS5zZWN1cmUpIHtcbiAgICAgICAgICAgICAgICBoc3RzTWlkZGxld2FyZShyZXEsIHJlcywgbmV4dClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV4dCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICB9XG59XG5cbm5ldyBTZXJ2ZXIoKTtcblxuZXhwb3J0IGRlZmF1bHQgc2VydmVyOyJdfQ==