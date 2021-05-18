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

var placeholdersRouter = function placeholdersRouter() {
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

function findPlaceholderbyID(_x3, _x4, _x5) {
  return _findPlaceholderbyID.apply(this, arguments);
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL3BsYWNlaG9sZGVyc1JvdXRlci50cyJdLCJuYW1lcyI6WyJyb3V0ZXIiLCJwbGFjZWhvbGRlcnNSb3V0ZXIiLCJ1c2UiLCJyZXEiLCJyZXMiLCJuZXh0IiwiaGVhZGVyIiwiZ2V0IiwiUGxhY2Vob2xkZXIiLCJmaW5kIiwicGxhY2Vob2xkZXJzIiwianNvbiIsInN0YXR1cyIsIm1lc3NhZ2UiLCJmaW5kUGxhY2Vob2xkZXIiLCJjaGVja1Rva2VuIiwicGxhY2Vob2xkZXIiLCJmaW5kUGxhY2Vob2xkZXJieUlEIiwicGxhY2Vob2xkZXJCeUlEIiwiZmluZEJ5SWQiLCJwYXJhbXMiLCJpZCIsImZpbmRPbmUiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBR0E7Ozs7Ozs7Ozs7OztBQUtBLElBQU1BLE1BQU0sR0FBRyxzQkFBZjs7SUFFTUMsa0IsR0FJRiw4QkFBYztBQUFBOztBQUFBOztBQUVWLE9BQUtELE1BQUwsR0FBY0EsTUFBZDtBQUVBLE9BQUtBLE1BQUwsQ0FBWUUsR0FBWixDQUFnQixVQUFDQyxHQUFELEVBQWVDLEdBQWYsRUFBOEJDLElBQTlCLEVBQXFEO0FBQ2pFRCxJQUFBQSxHQUFHLENBQUNFLE1BQUosQ0FBVyw2QkFBWCxFQUEwQyxHQUExQztBQUNBRixJQUFBQSxHQUFHLENBQUNFLE1BQUosQ0FBVyw4QkFBWCxFQUEyQyxnRUFBM0M7QUFDQUQsSUFBQUEsSUFBSTtBQUNQLEdBSkQ7QUFNQSxPQUFLTCxNQUFMLENBQVlPLEdBQVosQ0FBZ0IsR0FBaEI7QUFBQSx1RUFBcUIsaUJBQU1KLEdBQU4sRUFBb0JDLEdBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFFY0kseUJBQVlDLElBQVosRUFGZDs7QUFBQTtBQUVQQyxjQUFBQSxZQUZPO0FBQUEsK0NBR1BOLEdBQUcsQ0FBQ08sSUFBSixDQUFTRCxZQUFULENBSE87O0FBQUE7QUFB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LWNvbW1lbnQgKi9cblxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCBQbGFjZWhvbGRlciBmcm9tIFwiLi4vLi4vbW9kZWxzL1BsYWNlaG9sZGVyc1wiO1xuXG5pbXBvcnQgVXNlciBmcm9tIFwiLi4vLi4vbW9kZWxzL1VzZXJzXCI7XG5pbXBvcnQgY2hlY2tUb2tlbiBmcm9tIFwiLi4vUm91dGVyRnVuY3Rpb25zL2NoZWNrVG9rZW5cIjtcblxuLy8gSW1wb3J0IGZvciBUeXBlc1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UsIE5leHRGdW5jdGlvbiB9IGZyb20gXCJleHByZXNzXCI7XG5cbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuXG5jbGFzcyBwbGFjZWhvbGRlcnNSb3V0ZXIge1xuXG4gICAgcHVibGljIHJvdXRlcjogUm91dGVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXIudXNlKChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICAgICAgICAgICAgcmVzLmhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiLCBcIipcIik7XG4gICAgICAgICAgICByZXMuaGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVyc1wiLCBcIk9yaWdpbiwgWC1SZXF1ZXN0ZWQtV2l0aCwgQ29udGVudC1UeXBlLCBBY2NlcHQsIHgtYWNjZXNzLXRva2VuXCIpO1xuICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnJvdXRlci5nZXQoJy8nLCBhc3luYyhyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGxhY2Vob2xkZXJzID0gYXdhaXQgUGxhY2Vob2xkZXIuZmluZCgpO1xuICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKHBsYWNlaG9sZGVycyk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVyci5tZXNzYWdlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnJvdXRlci5nZXQoJy86bmFtZScsIGZpbmRQbGFjZWhvbGRlciwgY2hlY2tUb2tlbiwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICByZXR1cm4gcmVzLmpzb24ocmVzLnBsYWNlaG9sZGVyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgICB0aGlzLnJvdXRlci5nZXQoJy9pZC86aWQnLCBmaW5kUGxhY2Vob2xkZXJieUlELCBjaGVja1Rva2VuLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbihyZXMucGxhY2Vob2xkZXJCeUlEKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBmaW5kUGxhY2Vob2xkZXJieUlEKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XG4gICAgbGV0IHBsYWNlaG9sZGVyO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgcGxhY2Vob2xkZXIgPSBhd2FpdCBQbGFjZWhvbGRlci5maW5kQnlJZChyZXEucGFyYW1zLmlkKTtcbiAgICAgICAgaWYgKHBsYWNlaG9sZGVyID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiUGxhY2Vob2xkZXIgbm90IEZvdW5kXCIgfSk7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfSk7XG4gICAgfVxuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHJlcy5wbGFjZWhvbGRlckJ5SUQgPSBwbGFjZWhvbGRlcjtcbiAgICBuZXh0KCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGZpbmRQbGFjZWhvbGRlcihyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xuICAgIGxldCBwbGFjZWhvbGRlcjtcblxuICAgIHRyeSB7XG4gICAgICAgIHBsYWNlaG9sZGVyID0gYXdhaXQgUGxhY2Vob2xkZXIuZmluZE9uZSh7IG5hbWU6IHJlcS5wYXJhbXMubmFtZSB9KTtcbiAgICAgICAgaWYgKHBsYWNlaG9sZGVyID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiUGxhY2Vob2xkZXIgbm90IEZvdW5kXCIgfSk7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfSk7XG4gICAgfVxuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHJlcy5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgIG5leHQoKTtcbn1cblxuXG5uZXcgcGxhY2Vob2xkZXJzUm91dGVyKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjsiXX0=