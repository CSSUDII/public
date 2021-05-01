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

var UsersRouter = function UsersRouter() {
  _classCallCheck(this, UsersRouter);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  var limiter = (0, _expressRateLimit["default"])({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "You are being rate limited!"
  });
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
                password: hashedPassword
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
    _Users["default"].findById(req.userId, {
      password: 0
    }, function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user was found.");
      res.status(200).send(user);
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
              res.header("auth-token", token).json({
                error: null,
                data: {
                  token: token
                }
              });

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
    res.status(200).send({
      auth: false,
      token: null
    });
  });
};

new UsersRouter();
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL1VzZXJSb3V0ZXIudHMiXSwibmFtZXMiOlsicm91dGVyIiwiVXNlcnNSb3V0ZXIiLCJsaW1pdGVyIiwid2luZG93TXMiLCJtYXgiLCJtZXNzYWdlIiwidXNlIiwiYm9keVBhcnNlciIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsImpzb24iLCJyZXEiLCJyZXMiLCJuZXh0IiwiaGVhZGVyIiwicG9zdCIsImhhc2hlZFBhc3N3b3JkIiwiYmNyeXB0IiwiaGFzaFN5bmMiLCJib2R5IiwicGFzc3dvcmQiLCJVc2VyIiwiZmluZE9uZSIsImVtYWlsIiwiZG9zZUVtYWlsRXhpc3QiLCJzdGF0dXMiLCJlcnJvciIsImNyZWF0ZSIsIm5hbWUiLCJlcnIiLCJ1c2VyIiwiY29uZmlnVG9rZW4iLCJjb25maWciLCJ0b2tlbiIsInNlbmQiLCJqd3QiLCJzaWduIiwiaWQiLCJfaWQiLCJleHBpcmVzSW4iLCJhdXRoIiwiZ2V0IiwiY2hlY2tUb2tlbiIsImZpbmRCeUlkIiwidXNlcklkIiwiY29tcGFyZSIsInZhbGlkUGFzc3dvcmQiLCJkYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxNQUFNLEdBQUcsc0JBQWY7O0lBRU1DLFcsR0FDRix1QkFBYztBQUFBOztBQUVWO0FBQ0EsTUFBTUMsT0FBTyxHQUFHLGtDQUFVO0FBQ3RCQyxJQUFBQSxRQUFRLEVBQUUsS0FBSyxFQUFMLEdBQVUsSUFERTtBQUV0QkMsSUFBQUEsR0FBRyxFQUFFLEdBRmlCO0FBR3RCQyxJQUFBQSxPQUFPLEVBQUU7QUFIYSxHQUFWLENBQWhCO0FBTUFMLEVBQUFBLE1BQU0sQ0FBQ00sR0FBUCxDQUFXQyx1QkFBV0MsVUFBWCxDQUFzQjtBQUFFQyxJQUFBQSxRQUFRLEVBQUU7QUFBWixHQUF0QixDQUFYO0FBQ0FULEVBQUFBLE1BQU0sQ0FB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LFlBQVgsRUFBeUJtQixLQUF6QixFQUFnQ3ZCLElBQWhDLENBQXFDO0FBQ2pDZ0IsZ0JBQUFBLEtBQUssRUFBRSxJQUQwQjtBQUVqQ3FCLGdCQUFBQSxJQUFJLEVBQUU7QUFDRmQsa0JBQUFBLEtBQUssRUFBTEE7QUFERTtBQUYyQixlQUFyQzs7QUFuQmtCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQXRCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBMkJBakMsRUFBQUEsTUFBTSxDQUFDeUMsR0FBUCxDQUFXLFNBQVgsRUFBc0IsVUFBQzlCLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ2hDQSxJQUFBQSxHQUFHLENBQUNhLE1BQUosQ0FBVyxHQUFYLEVBQWdCUyxJQUFoQixDQUFxQjtBQUFFTSxNQUFBQSxJQUFJLEVBQUUsS0FBUjtBQUFlUCxNQUFBQSxLQUFLLEVBQUU7QUFBdEIsS0FBckI7QUFDSCxHQUZEO0FBR0gsQzs7QUFHTCxJQUFJaEMsV0FBSjtlQUVlRCxNIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50ICovXG5pbXBvcnQgeyBSb3V0ZXIsIFJlc3BvbnNlLCBSZXF1ZXN0IH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCBVc2VyIGZyb20gXCIuLi8uLi9tb2RlbHMvVXNlcnNcIjtcblxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vLi4vY29uZmlnL2RiLmNvbmZpZ1wiO1xuXG5pbXBvcnQgand0IGZyb20gJ2pzb253ZWJ0b2tlbic7XG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdGpzJztcbmltcG9ydCBib2R5UGFyc2VyIGZyb20gXCJib2R5LXBhcnNlclwiO1xuXG5pbXBvcnQgY2hlY2tUb2tlbiBmcm9tIFwiLi4vUm91dGVyRnVuY3Rpb25zL2NoZWNrVG9rZW5cIjtcblxuaW1wb3J0IHJhdGVMaW1pdCBmcm9tIFwiZXhwcmVzcy1yYXRlLWxpbWl0XCI7XG5cbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuXG5jbGFzcyBVc2Vyc1JvdXRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgICBjb25zdCBsaW1pdGVyID0gcmF0ZUxpbWl0KHtcbiAgICAgICAgICAgIHdpbmRvd01zOiAxNSAqIDYwICogMTAwMCwgXG4gICAgICAgICAgICBtYXg6IDEwMCxcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiWW91IGFyZSBiZWluZyByYXRlIGxpbWl0ZWQhXCJcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICByb3V0ZXIudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KSk7XG4gICAgICAgIHJvdXRlci51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuXG4gICAgICAgIHJvdXRlci51c2UoKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgICAgICAgICByZXMuaGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIsIFwiKlwiKTtcbiAgICAgICAgICAgIHJlcy5oZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCIsIFwiT3JpZ2luLCBYLVJlcXVlc3RlZC1XaXRoLCBDb250ZW50LVR5cGUsIEFjY2VwdCwgeC1hY2Nlc3MtdG9rZW5cIik7XG4gICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJvdXRlci5wb3N0KCcvcmVnaXN0ZXInLCBhc3luYyhyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcblxuICAgICAgICAgICAgY29uc3QgaGFzaGVkUGFzc3dvcmQgPSBiY3J5cHQuaGFzaFN5bmMocmVxLmJvZHkucGFzc3dvcmQsIDgpO1xuXG4gICAgICAgICAgICBjb25zdCBkb3NlRW1haWxFeGlzdCA9IGF3YWl0IFVzZXIuZmluZE9uZSh7IGVtYWlsOiByZXEuYm9keS5lbWFpbCB9KTtcblxuICAgICAgICAgICAgaWYgKGRvc2VFbWFpbEV4aXN0KVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiBcIkVtYWlsIGFscmVhZHkgZXhpc3RzXCIgfSk7XG5cbiAgICAgICAgICAgIFVzZXIuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogcmVxLmJvZHkubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IHJlcS5ib2R5LmVtYWlsLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogaGFzaGVkUGFzc3dvcmRcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oZXJyLCB1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbmZpZ1Rva2VuOiBhbnkgPSBjb25maWcudG9rZW5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5zZW5kKFwiVGhlcmUgd2FzIGEgcHJvYmxlbSByZWdpc3RlcmluZyB0aGUgdXNlci5cIilcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBqd3Quc2lnbih7IGlkOiB1c2VyLl9pZCB9LCBjb25maWdUb2tlbiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhwaXJlc0luOiA4NjQwMFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoeyBhdXRoOiB0cnVlLCB0b2tlbjogdG9rZW4gfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJvdXRlci5nZXQoJy9tZScsIGNoZWNrVG9rZW4sIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcblxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgVXNlci5maW5kQnlJZChyZXEudXNlcklkLCB7IHBhc3N3b3JkOiAwIH0sIChlcnIsIHVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gcmVzLnN0YXR1cyg1MDApLnNlbmQoXCJUaGVyZSB3YXMgYSBwcm9ibGVtIGZpbmRpbmcgdGhlIHVzZXIuXCIpO1xuICAgICAgICAgICAgICAgIGlmICghdXNlcikgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5zZW5kKFwiTm8gdXNlciB3YXMgZm91bmQuXCIpO1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHVzZXIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcm91dGVyLnBvc3QoXCIvbG9naW5cIiwgYXN5bmMocmVxLCByZXMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUoeyBlbWFpbDogcmVxLmJvZHkuZW1haWwgfSk7XG5cbiAgICAgICAgICAgIGlmICghdXNlcikgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IFwiTm8gdXNlciB3YXMgZm91bmRcIiB9KTtcblxuICAgICAgICAgICAgY29uc3QgdmFsaWRQYXNzd29yZCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKHJlcS5ib2R5LnBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKTtcbiAgICAgICAgICAgIGlmICghdmFsaWRQYXNzd29yZClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogXCJQYXNzd29yZCBpcyB3cm9uZ1wiLCBhdXRoOiBmYWxzZSwgdG9rZW46IG51bGwgfSk7XG5cblxuICAgICAgICAgICAgY29uc3QgY29uZmlnVG9rZW46IGFueSA9IGNvbmZpZy50b2tlbjtcblxuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBqd3Quc2lnbih7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHVzZXIuX2lkLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29uZmlnVG9rZW5cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHJlcy5oZWFkZXIoXCJhdXRoLXRva2VuXCIsIHRva2VuKS5qc29uKHtcbiAgICAgICAgICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcm91dGVyLmdldCgnL2xvZ291dCcsIChyZXEsIHJlcykgPT4ge1xuICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoeyBhdXRoOiBmYWxzZSwgdG9rZW46IG51bGwgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxubmV3IFVzZXJzUm91dGVyO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7Il19