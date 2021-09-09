"use strict";

var _dotenv = require("dotenv");

var _path = _interopRequireDefault(require("path"));

var _Client = require("./client/Client");

var _DatabaseClient = _interopRequireDefault(require("./client/DatabaseClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _dotenv.config)({
  path: _path["default"].resolve("@env/.env")
});
var client = new _Client.Client();
client.load();
process.on("SIGTERM", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _DatabaseClient["default"].$disconnect();

          client.logger.info("[DB] Disconnected from database");

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJwYXRoIiwicmVzb2x2ZSIsImNsaWVudCIsIkNsaWVudCIsImxvYWQiLCJwcm9jZXNzIiwib24iLCJwcmlzbWEiLCIkZGlzY29ubmVjdCIsImxvZ2dlciIsImluZm8iXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUEsb0JBQU87QUFDSEEsRUFBQUEsSUFBSSxFQUFFQSxpQkFBS0MsT0FBTCxDQUFhLFdBQWI7QUFESCxDQUFQO0FBSUEsSUFBTUMsTUFBYyxHQUFHLElBQUlDLGNBQUosRUFBdkI7QUFDQUQsTUFBTSxDQUFDRSxJQUFQO0FBRUFDLE9BQU8sQ0FBQ0MsRUFBUixDQUFXLFNBQVgsdUVBQXNCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDbEJDLHFDQUFPQyxXQUFQOztBQUNBTixVQUFBQSxNQUFNLENBQUNPLE1BQVAsQ0FBY0MsSUFBZCxDQUFtQixpQ0FBbkI7O0FBRmtCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLENBQXRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcImRvdGVudlwiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IENsaWVudCB9IGZyb20gXCIuL2NsaWVudC9DbGllbnRcIjtcbmltcG9ydCBwcmlzbWEgZnJvbSBcIi4vY2xpZW50L0RhdGFiYXNlQ2xpZW50XCI7XG5cbmNvbmZpZyh7XG4gICAgcGF0aDogcGF0aC5yZXNvbHZlKFwiQGVudi8uZW52XCIpXG59KTtcblxuY29uc3QgY2xpZW50OiBDbGllbnQgPSBuZXcgQ2xpZW50KCk7XG5jbGllbnQubG9hZCgpO1xuXG5wcm9jZXNzLm9uKFwiU0lHVEVSTVwiLCBhc3luYygpID0+IHtcbiAgICBwcmlzbWEuJGRpc2Nvbm5lY3QoKTtcbiAgICBjbGllbnQubG9nZ2VyLmluZm8oXCJbREJdIERpc2Nvbm5lY3RlZCBmcm9tIGRhdGFiYXNlXCIpO1xufSk7Il19