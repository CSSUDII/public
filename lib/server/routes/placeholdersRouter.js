"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _Placeholders = _interopRequireDefault(require("../../models/Placeholders"));

var _checkToken = _interopRequireDefault(require("../RouterFunctions/checkToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var router = (0, _express.Router)();

var placeholdersRouter =
/**
 * @constructor
 */
function placeholdersRouter() {
  _classCallCheck(this, placeholdersRouter);

  _defineProperty(this, "router", void 0);

  this.router = router;
  this.router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
  });
  this.router.get('/', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var placeholders;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _Placeholders["default"].find();

            case 3:
              placeholders = _context.sent;
              return _context.abrupt("return", res.json(placeholders));

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              res.status(500).json({
                message: _context.t0.message
              });

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  this.router.get('/:name', findPlaceholder, _checkToken["default"], function (req, res) {
    // @ts-ignore
    return res.json(res.placeholder);
  }); // eslint-disable-next-line @typescript-eslint/no-unused-vars

  this.router.get('/id/:id', findPlaceholderbyID, _checkToken["default"], function (req, res, next) {
    // @ts-ignore
    return res.json(res.placeholderByID);
  });
};
/**
 * Gets a placeholder by its ID
 * @param req Express Request
 * @param res Express Response
 * @param next Express NextFunction
 * @returns Placeholder Data
 */


function findPlaceholderbyID(_x3, _x4, _x5) {
  return _findPlaceholderbyID.apply(this, arguments);
}
/**
 * Gets a Placeholder by its name
 * @param req Express Request
 * @param res Express Response
 * @param next Express NextFunction
 * @returns Placeholder Data
 */


function _findPlaceholderbyID() {
  _findPlaceholderbyID = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var placeholder;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Placeholders["default"].findById(req.params.id);

          case 3:
            placeholder = _context2.sent;

            if (!(placeholder == null)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              message: "Placeholder not Found"
            }));

          case 6:
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).json({
              message: _context2.t0.message
            }));

          case 11:
            // @ts-ignore
            res.placeholderByID = placeholder;
            next();

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return _findPlaceholderbyID.apply(this, arguments);
}

function findPlaceholder(_x6, _x7, _x8) {
  return _findPlaceholder.apply(this, arguments);
}

function _findPlaceholder() {
  _findPlaceholder = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var placeholder;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _Placeholders["default"].findOne({
              name: req.params.name
            });

          case 3:
            placeholder = _context3.sent;

            if (!(placeholder == null)) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              message: "Placeholder not Found"
            }));

          case 6:
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(500).json({
              message: _context3.t0.message
            }));

          case 11:
            // @ts-ignore
            res.placeholder = placeholder;
            next();

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return _findPlaceholder.apply(this, arguments);
}

new placeholdersRouter();
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL3BsYWNlaG9sZGVyc1JvdXRlci50cyJdLCJuYW1lcyI6WyJyb3V0ZXIiLCJwbGFjZWhvbGRlcnNSb3V0ZXIiLCJ1c2UiLCJyZXEiLCJyZXMiLCJuZXh0IiwiaGVhZGVyIiwiZ2V0IiwiUGxhY2Vob2xkZXIiLCJmaW5kIiwicGxhY2Vob2xkZXJzIiwianNvbiIsInN0YXR1cyIsIm1lc3NhZ2UiLCJmaW5kUGxhY2Vob2xkZXIiLCJjaGVja1Rva2VuIiwicGxhY2Vob2xkZXIiLCJmaW5kUGxhY2Vob2xkZXJieUlEIiwicGxhY2Vob2xkZXJCeUlEIiwiZmluZEJ5SWQiLCJwYXJhbXMiLCJpZCIsImZpbmRPbmUiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBR0E7Ozs7Ozs7Ozs7OztBQUtBLElBQU1BLE1BQU0sR0FBRyxzQkFBZjs7SUFFTUMsa0I7QUFJRjtBQUNKO0FBQ0E7QUFDSSw4QkFBYztBQUFBOztBQUFBOztBQUVWLE9BQUtELE1BQUwsR0FBY0EsTUFBZDtBQUVBLE9BQUtBLE1BQUwsQ0FBWUUsR0FBWixDQUFnQixVQUFDQyxHQUFELEVBQWVDLEdBQWYsRUFBOEJDLElBQTlCLEVBQXFEO0FBQ2pFRCxJQUFBQSxHQUFHLENBQUNFLE1BQUosQ0FBVyw2QkFBWCxFQUEwQyxHQUExQztBQUNBRixJQUFBQSxHQUFHLENBQUNFLE1BQUosQ0FBVyw4QkFBWCxFQUEyQyxnRUFBM0M7QUFDQUQsSUFBQUEsSUFBSTtBQUNQLEdBSkQ7QUFNQSxPQUFLTCxNQUFMLENBQVlPLEdBQVosQ0FBZ0IsR0FBaEI7QUFBQSx1RUFBcUIsaUJBQU1KLEdBQU4sRUFBb0JDLEdBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFFY0kseUJBQVlDLElBQVosRUFGZDs7QUFBQTtBQUVQQyxjQUFBQSxZQUZPO0FBQUEsK0NBR1BOLEdBQUcsQ0FBQ08sSUFBSixDQUFTRCxZQUFU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QUFrQkEsSUFBSUosa0JBQUo7ZUFFZUQsTSIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudCAqL1xuXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IFBsYWNlaG9sZGVyIGZyb20gXCIuLi8uLi9tb2RlbHMvUGxhY2Vob2xkZXJzXCI7XG5cbi8vIGltcG9ydCBVc2VyIGZyb20gXCIuLi8uLi9tb2RlbHMvVXNlcnNcIjtcbmltcG9ydCBjaGVja1Rva2VuIGZyb20gXCIuLi9Sb3V0ZXJGdW5jdGlvbnMvY2hlY2tUb2tlblwiO1xuXG4vLyBJbXBvcnQgZm9yIFR5cGVzXG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSwgTmV4dEZ1bmN0aW9uIH0gZnJvbSBcImV4cHJlc3NcIjtcblxuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbmNsYXNzIHBsYWNlaG9sZGVyc1JvdXRlciB7XG5cbiAgICBwdWJsaWMgcm91dGVyOiBSb3V0ZXI7XG5cbiAgICAvKipcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICB0aGlzLnJvdXRlciA9IHJvdXRlcjtcblxuICAgICAgICB0aGlzLnJvdXRlci51c2UoKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXMuaGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIsIFwiKlwiKTtcbiAgICAgICAgICAgIHJlcy5oZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCIsIFwiT3JpZ2luLCBYLVJlcXVlc3RlZC1XaXRoLCBDb250ZW50LVR5cGUsIEFjY2VwdCwgeC1hY2Nlc3MtdG9rZW5cIik7XG4gICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucm91dGVyLmdldCgnLycsIGFzeW5jKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwbGFjZWhvbGRlcnMgPSBhd2FpdCBQbGFjZWhvbGRlci5maW5kKCk7XG4gICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24ocGxhY2Vob2xkZXJzKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucm91dGVyLmdldCgnLzpuYW1lJywgZmluZFBsYWNlaG9sZGVyLCBjaGVja1Rva2VuLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgIHJldHVybiByZXMuanNvbihyZXMucGxhY2Vob2xkZXIpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgICAgIHRoaXMucm91dGVyLmdldCgnL2lkLzppZCcsIGZpbmRQbGFjZWhvbGRlcmJ5SUQsIGNoZWNrVG9rZW4sIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKHJlcy5wbGFjZWhvbGRlckJ5SUQpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qKlxuICogR2V0cyBhIHBsYWNlaG9sZGVyIGJ5IGl0cyBJRFxuICogQHBhcmFtIHJlcSBFeHByZXNzIFJlcXVlc3RcbiAqIEBwYXJhbSByZXMgRXhwcmVzcyBSZXNwb25zZVxuICogQHBhcmFtIG5leHQgRXhwcmVzcyBOZXh0RnVuY3Rpb25cbiAqIEByZXR1cm5zIFBsYWNlaG9sZGVyIERhdGFcbiAqL1xuYXN5bmMgZnVuY3Rpb24gZmluZFBsYWNlaG9sZGVyYnlJRChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xuICAgIGxldCBwbGFjZWhvbGRlcjtcblxuICAgIHRyeSB7XG4gICAgICAgIHBsYWNlaG9sZGVyID0gYXdhaXQgUGxhY2Vob2xkZXIuZmluZEJ5SWQocmVxLnBhcmFtcy5pZCk7XG4gICAgICAgIGlmIChwbGFjZWhvbGRlciA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiBcIlBsYWNlaG9sZGVyIG5vdCBGb3VuZFwiIH0pO1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVyci5tZXNzYWdlIH0pO1xuICAgIH1cblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICByZXMucGxhY2Vob2xkZXJCeUlEID0gcGxhY2Vob2xkZXI7XG4gICAgbmV4dCgpO1xufVxuLyoqXG4gKiBHZXRzIGEgUGxhY2Vob2xkZXIgYnkgaXRzIG5hbWVcbiAqIEBwYXJhbSByZXEgRXhwcmVzcyBSZXF1ZXN0XG4gKiBAcGFyYW0gcmVzIEV4cHJlc3MgUmVzcG9uc2VcbiAqIEBwYXJhbSBuZXh0IEV4cHJlc3MgTmV4dEZ1bmN0aW9uXG4gKiBAcmV0dXJucyBQbGFjZWhvbGRlciBEYXRhXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGZpbmRQbGFjZWhvbGRlcihyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xuICAgIGxldCBwbGFjZWhvbGRlcjtcblxuICAgIHRyeSB7XG4gICAgICAgIHBsYWNlaG9sZGVyID0gYXdhaXQgUGxhY2Vob2xkZXIuZmluZE9uZSh7IG5hbWU6IHJlcS5wYXJhbXMubmFtZSB9KTtcbiAgICAgICAgaWYgKHBsYWNlaG9sZGVyID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiUGxhY2Vob2xkZXIgbm90IEZvdW5kXCIgfSk7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfSk7XG4gICAgfVxuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHJlcy5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgIG5leHQoKTtcbn1cblxuXG5uZXcgcGxhY2Vob2xkZXJzUm91dGVyKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjsiXX0=