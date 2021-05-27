"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _Users = _interopRequireDefault(require("../../models/Users"));

var _db = _interopRequireDefault(require("../../config/db.config"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _checkToken = _interopRequireDefault(require("../RouterFunctions/checkToken"));

var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var router = (0, _express.Router)();

var UsersRouter =
/**
 * @constructor
 */
function UsersRouter() {
  _classCallCheck(this, UsersRouter);

  var limiter = (0, _expressRateLimit["default"])({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "You are being rate limited!"
  });
  router.use(limiter);
  router.use(_bodyParser["default"].urlencoded({
    extended: false
  }));
  router.use(_bodyParser["default"].json());
  router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
  });
  router.post('/register', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var hashedPassword, doseEmailExist;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              hashedPassword = _bcryptjs["default"].hashSync(req.body.password, 8);
              _context.next = 3;
              return _Users["default"].findOne({
                email: req.body.email
              });

            case 3:
              doseEmailExist = _context.sent;

              if (!doseEmailExist) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                error: "Email already exists"
              }));

            case 6:
              _Users["default"].create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                bypassImageLimit: false
              }, function (err, user) {
                var configToken = _db["default"].token;
                if (err) return res.status(500).send("There was a problem registering the user.");

                var token = _jsonwebtoken["default"].sign({
                  id: user._id
                }, configToken, {
                  expiresIn: 86400
                });

                res.status(200).send({
                  auth: true,
                  token: token
                });
              });

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  router.get('/me', _checkToken["default"], function (req, res) {
    // @ts-ignore
    return _Users["default"].findById(req.user.id, {
      password: 0
    }, function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user was found.");
      return res.status(200).send(user);
    });
  });
  router.post("/login", /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var user, validPassword, configToken, token;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _Users["default"].findOne({
                email: req.body.email
              });

            case 2:
              user = _context2.sent;

              if (user) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                error: "No user was found"
              }));

            case 5:
              _context2.next = 7;
              return _bcryptjs["default"].compare(req.body.password, user.password);

            case 7:
              validPassword = _context2.sent;

              if (validPassword) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                error: "Password is wrong",
                auth: false,
                token: null
              }));

            case 10:
              configToken = _db["default"].token;
              token = _jsonwebtoken["default"].sign({
                name: user.name,
                id: user._id
              }, configToken);
              return _context2.abrupt("return", res.header("x-access-token", token).json({
                error: null,
                token: token
              }));

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
  router.get('/logout', function (req, res) {
    return res.status(200).send({
      auth: false,
      token: null
    });
  });
};

new UsersRouter();
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL1VzZXJSb3V0ZXIudHMiXSwibmFtZXMiOlsicm91dGVyIiwiVXNlcnNSb3V0ZXIiLCJsaW1pdGVyIiwid2luZG93TXMiLCJtYXgiLCJtZXNzYWdlIiwidXNlIiwiYm9keVBhcnNlciIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsImpzb24iLCJyZXEiLCJyZXMiLCJuZXh0IiwiaGVhZGVyIiwicG9zdCIsImhhc2hlZFBhc3N3b3JkIiwiYmNyeXB0IiwiaGFzaFN5bmMiLCJib2R5IiwicGFzc3dvcmQiLCJVc2VyIiwiZmluZE9uZSIsImVtYWlsIiwiZG9zZUVtYWlsRXhpc3QiLCJzdGF0dXMiLCJlcnJvciIsImNyZWF0ZSIsIm5hbWUiLCJieXBhc3NJbWFnZUxpbWl0IiwiZXJyIiwidXNlciIsImNvbmZpZ1Rva2VuIiwiY29uZmlnIiwidG9rZW4iLCJzZW5kIiwiand0Iiwic2lnbiIsImlkIiwiX2lkIiwiZXhwaXJlc0luIiwiYXV0aCIsImdldCIsImNoZWNrVG9rZW4iLCJmaW5kQnlJZCIsImNvbXBhcmUiLCJ2YWxpZFBhc3N3b3JkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxNQUFNLEdBQUcsc0JBQWY7O0lBRU1DLFc7QUFDRjtBQUNKO0FBQ0E7QUFDSSx1QkFBYztBQUFBOztBQUVWLE1BQU1DLE9BQU8sR0FBRyxrQ0FBVTtBQUN0QkMsSUFBQUEsUUFBUSxFQUFFLEtBQUssRUFBTCxHQUFVLElBREU7QUFFdEJDLElBQUFBLEdBQUcsRUFBRSxHQUZpQjtBQUd0QkMsSUFBQUEsT0FBTyxFQUFFO0FBSGEsR0FBVixDQUFoQjtBQU1BTCxFQUFBQSxNQUFNLENBQUNNLEdBQVAsQ0FBV0osT0FBWDtBQUNBRixFQUFBQSxNQUFNLENBQUNNLEdBQVAsQ0FBV0MsdUJBQVdDLFVBQVgsQ0FBc0I7QUFBRUMs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QUFJLENBQUNILElBREk7QUFFZlUsZ0JBQUFBLEVBQUUsRUFBRVAsSUFBSSxDQUFDUTtBQUZNLGVBQVQsRUFJVlAsV0FKVSxDQVhJO0FBQUEsZ0RBa0JacEIsR0FBRyxDQUFDRSxNQUFKLENBQVcsZ0JBQVgsRUFBNkJvQixLQUE3QixFQUFvQ3hCLElBQXBDLENBQXlDO0FBQzNDZ0IsZ0JBQUFBLEtBQUssRUFBRSxJQURvQztBQUUzQ1EsZ0JBQUFBLEtBQUssRUFBTEE7QUFGMkMsZUFBekMsQ0FsQlk7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBdEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF3QkFsQyxFQUFBQSxNQUFNLENBQUMwQyxHQUFQLENBQVcsU0FBWCxFQUFzQixVQUFDL0IsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDakMsV0FBT0EsR0FBRyxDQUFDYSxNQUFKLENBQVcsR0FBWCxFQUFnQlUsSUFBaEIsQ0FBcUI7QUFBRU0sTUFBQUEsSUFBSSxFQUFFLEtBQVI7QUFBZVAsTUFBQUEsS0FBSyxFQUFFO0FBQXRCLEtBQXJCLENBQVA7QUFDRixHQUZEO0FBR0gsQzs7QUFHTCxJQUFJakMsV0FBSjtlQUVlRCxNIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50ICovXG5pbXBvcnQgeyBSb3V0ZXIsIFJlc3BvbnNlLCBSZXF1ZXN0LCBOZXh0RnVuY3Rpb24gfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IFVzZXIgZnJvbSBcIi4uLy4uL21vZGVscy9Vc2Vyc1wiO1xuXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi8uLi9jb25maWcvZGIuY29uZmlnXCI7XG5cbmltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJztcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0anMnO1xuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSBcImJvZHktcGFyc2VyXCI7XG5cbmltcG9ydCBjaGVja1Rva2VuIGZyb20gXCIuLi9Sb3V0ZXJGdW5jdGlvbnMvY2hlY2tUb2tlblwiO1xuXG5pbXBvcnQgcmF0ZUxpbWl0IGZyb20gXCJleHByZXNzLXJhdGUtbGltaXRcIjtcblxuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbmNsYXNzIFVzZXJzUm91dGVyIHtcbiAgICAvKipcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICBjb25zdCBsaW1pdGVyID0gcmF0ZUxpbWl0KHtcbiAgICAgICAgICAgIHdpbmRvd01zOiAxNSAqIDYwICogMTAwMCwgXG4gICAgICAgICAgICBtYXg6IDEwMCxcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiWW91IGFyZSBiZWluZyByYXRlIGxpbWl0ZWQhXCJcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICByb3V0ZXIudXNlKGxpbWl0ZXIpO1xuICAgICAgICByb3V0ZXIudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KSk7XG4gICAgICAgIHJvdXRlci51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuXG4gICAgICAgIHJvdXRlci51c2UoKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXMuaGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIsIFwiKlwiKTtcbiAgICAgICAgICAgIHJlcy5oZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCIsIFwiT3JpZ2luLCBYLVJlcXVlc3RlZC1XaXRoLCBDb250ZW50LVR5cGUsIEFjY2VwdCwgeC1hY2Nlc3MtdG9rZW5cIik7XG4gICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJvdXRlci5wb3N0KCcvcmVnaXN0ZXInLCBhc3luYyhyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcblxuICAgICAgICAgICAgY29uc3QgaGFzaGVkUGFzc3dvcmQgPSBiY3J5cHQuaGFzaFN5bmMocmVxLmJvZHkucGFzc3dvcmQsIDgpO1xuXG4gICAgICAgICAgICBjb25zdCBkb3NlRW1haWxFeGlzdCA9IGF3YWl0IFVzZXIuZmluZE9uZSh7IGVtYWlsOiByZXEuYm9keS5lbWFpbCB9KTtcblxuICAgICAgICAgICAgaWYgKGRvc2VFbWFpbEV4aXN0KVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiBcIkVtYWlsIGFscmVhZHkgZXhpc3RzXCIgfSk7XG5cbiAgICAgICAgICAgIFVzZXIuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogcmVxLmJvZHkubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IHJlcS5ib2R5LmVtYWlsLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogaGFzaGVkUGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICAgIGJ5cGFzc0ltYWdlTGltaXQ6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGVyciwgdXNlcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb25maWdUb2tlbjogYW55ID0gY29uZmlnLnRva2VuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiByZXMuc3RhdHVzKDUwMCkuc2VuZChcIlRoZXJlIHdhcyBhIHByb2JsZW0gcmVnaXN0ZXJpbmcgdGhlIHVzZXIuXCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2tlbiA9IGp3dC5zaWduKHsgaWQ6IHVzZXIuX2lkIH0sIGNvbmZpZ1Rva2VuLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBleHBpcmVzSW46IDg2NDAwXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZCh7IGF1dGg6IHRydWUsIHRva2VuOiB0b2tlbiB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcm91dGVyLmdldCgnL21lJywgY2hlY2tUb2tlbiwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICByZXR1cm4gVXNlci5maW5kQnlJZChyZXEudXNlci5pZCwgeyBwYXNzd29yZDogMCB9LCAoZXJyLCB1c2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5zZW5kKFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBmaW5kaW5nIHRoZSB1c2VyLlwiKTtcbiAgICAgICAgICAgICAgICBpZiAoIXVzZXIpIHJldHVybiByZXMuc3RhdHVzKDQwNCkuc2VuZChcIk5vIHVzZXIgd2FzIGZvdW5kLlwiKTtcbiAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZCh1c2VyKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJvdXRlci5wb3N0KFwiL2xvZ2luXCIsIGFzeW5jKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuZmluZE9uZSh7IGVtYWlsOiByZXEuYm9keS5lbWFpbCB9KTtcblxuICAgICAgICAgICAgaWYgKCF1c2VyKSByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogXCJObyB1c2VyIHdhcyBmb3VuZFwiIH0pO1xuXG4gICAgICAgICAgICBjb25zdCB2YWxpZFBhc3N3b3JkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUocmVxLmJvZHkucGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpO1xuICAgICAgICAgICAgaWYgKCF2YWxpZFBhc3N3b3JkKSByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogXCJQYXNzd29yZCBpcyB3cm9uZ1wiLCBhdXRoOiBmYWxzZSwgdG9rZW46IG51bGwgfSk7XG5cblxuICAgICAgICAgICAgY29uc3QgY29uZmlnVG9rZW46IGFueSA9IGNvbmZpZy50b2tlbjtcblxuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBqd3Quc2lnbih7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHVzZXIuX2lkLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29uZmlnVG9rZW5cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgcmV0dXJuIHJlcy5oZWFkZXIoXCJ4LWFjY2Vzcy10b2tlblwiLCB0b2tlbikuanNvbih7XG4gICAgICAgICAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgICAgICAgICAgdG9rZW4sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcm91dGVyLmdldCgnL2xvZ291dCcsIChyZXEsIHJlcykgPT4ge1xuICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQoeyBhdXRoOiBmYWxzZSwgdG9rZW46IG51bGwgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxubmV3IFVzZXJzUm91dGVyO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7Il19