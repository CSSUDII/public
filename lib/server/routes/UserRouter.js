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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL1VzZXJSb3V0ZXIudHMiXSwibmFtZXMiOlsicm91dGVyIiwiVXNlcnNSb3V0ZXIiLCJsaW1pdGVyIiwid2luZG93TXMiLCJtYXgiLCJtZXNzYWdlIiwidXNlIiwiYm9keVBhcnNlciIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsImpzb24iLCJyZXEiLCJyZXMiLCJuZXh0IiwiaGVhZGVyIiwicG9zdCIsImhhc2hlZFBhc3N3b3JkIiwiYmNyeXB0IiwiaGFzaFN5bmMiLCJib2R5IiwicGFzc3dvcmQiLCJVc2VyIiwiZmluZE9uZSIsImVtYWlsIiwiZG9zZUVtYWlsRXhpc3QiLCJzdGF0dXMiLCJlcnJvciIsImNyZWF0ZSIsIm5hbWUiLCJlcnIiLCJ1c2VyIiwiY29uZmlnVG9rZW4iLCJjb25maWciLCJ0b2tlbiIsInNlbmQiLCJqd3QiLCJzaWduIiwiaWQiLCJfaWQiLCJleHBpcmVzSW4iLCJhdXRoIiwiZ2V0IiwiY2hlY2tUb2tlbiIsImZpbmRCeUlkIiwiY29tcGFyZSIsInZhbGlkUGFzc3dvcmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFFQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7OztBQUVBLElBQU1BLE1BQU0sR0FBRyxzQkFBZjs7SUFFTUMsVyxHQUNGLHVCQUFjO0FBQUE7O0FBRVY7QUFDQSxNQUFNQyxPQUFPLEdBQUcsa0NBQVU7QUFDdEJDLElBQUFBLFFBQVEsRUFBRSxLQUFLLEVBQUwsR0FBVSxJQURFO0FBRXRCQyxJQUFBQSxHQUFHLEVBQUUsR0FGaUI7QUFHdEJDLElBQUFBLE9BQU8sRUFBRTtBQUhhLEdBQVYsQ0FBaEI7QUFNQUwsRUFBQUEsTUFBTSxDQUFDTSxHQUFQLENBQVdDLHVCQUFXQyxVQUFYLENBQXNCO0FBQUVDLElBQUFBLFFBQVEsRUFBRTtBQUFaLEdBQXRCLENBQVg7QUFDQVQsRUFBQUEsTUFBTSxDQUFDTSxHQUFQLENBQVdDLHVC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Q0UsTUFBSixDQUFXLGdCQUFYLEVBQTZCbUIsS0FBN0IsRUFBb0N2QixJQUFwQyxDQUF5QztBQUMzQ2dCLGdCQUFBQSxLQUFLLEVBQUUsSUFEb0M7QUFFM0NPLGdCQUFBQSxLQUFLLEVBQUxBO0FBRjJDLGVBQXpDLENBbEJZOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQXRCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBd0JBakMsRUFBQUEsTUFBTSxDQUFDeUMsR0FBUCxDQUFXLFNBQVgsRUFBc0IsVUFBQzlCLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ2pDLFdBQU9BLEdBQUcsQ0FBQ2EsTUFBSixDQUFXLEdBQVgsRUFBZ0JTLElBQWhCLENBQXFCO0FBQUVNLE1BQUFBLElBQUksRUFBRSxLQUFSO0FBQWVQLE1BQUFBLEtBQUssRUFBRTtBQUF0QixLQUFyQixDQUFQO0FBQ0YsR0FGRDtBQUdILEM7O0FBR0wsSUFBSWhDLFdBQUo7ZUFFZUQsTSIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudCAqL1xuaW1wb3J0IHsgUm91dGVyLCBSZXNwb25zZSwgUmVxdWVzdCwgTmV4dEZ1bmN0aW9uIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCBVc2VyIGZyb20gXCIuLi8uLi9tb2RlbHMvVXNlcnNcIjtcblxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vLi4vY29uZmlnL2RiLmNvbmZpZ1wiO1xuXG5pbXBvcnQgand0IGZyb20gJ2pzb253ZWJ0b2tlbic7XG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdGpzJztcbmltcG9ydCBib2R5UGFyc2VyIGZyb20gXCJib2R5LXBhcnNlclwiO1xuXG5pbXBvcnQgY2hlY2tUb2tlbiBmcm9tIFwiLi4vUm91dGVyRnVuY3Rpb25zL2NoZWNrVG9rZW5cIjtcblxuaW1wb3J0IHJhdGVMaW1pdCBmcm9tIFwiZXhwcmVzcy1yYXRlLWxpbWl0XCI7XG5cbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuXG5jbGFzcyBVc2Vyc1JvdXRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgICBjb25zdCBsaW1pdGVyID0gcmF0ZUxpbWl0KHtcbiAgICAgICAgICAgIHdpbmRvd01zOiAxNSAqIDYwICogMTAwMCwgXG4gICAgICAgICAgICBtYXg6IDEwMCxcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiWW91IGFyZSBiZWluZyByYXRlIGxpbWl0ZWQhXCJcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICByb3V0ZXIudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KSk7XG4gICAgICAgIHJvdXRlci51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuXG4gICAgICAgIHJvdXRlci51c2UoKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXMuaGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIsIFwiKlwiKTtcbiAgICAgICAgICAgIHJlcy5oZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCIsIFwiT3JpZ2luLCBYLVJlcXVlc3RlZC1XaXRoLCBDb250ZW50LVR5cGUsIEFjY2VwdCwgeC1hY2Nlc3MtdG9rZW5cIik7XG4gICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJvdXRlci5wb3N0KCcvcmVnaXN0ZXInLCBhc3luYyhyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcblxuICAgICAgICAgICAgY29uc3QgaGFzaGVkUGFzc3dvcmQgPSBiY3J5cHQuaGFzaFN5bmMocmVxLmJvZHkucGFzc3dvcmQsIDgpO1xuXG4gICAgICAgICAgICBjb25zdCBkb3NlRW1haWxFeGlzdCA9IGF3YWl0IFVzZXIuZmluZE9uZSh7IGVtYWlsOiByZXEuYm9keS5lbWFpbCB9KTtcblxuICAgICAgICAgICAgaWYgKGRvc2VFbWFpbEV4aXN0KVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiBcIkVtYWlsIGFscmVhZHkgZXhpc3RzXCIgfSk7XG5cbiAgICAgICAgICAgIFVzZXIuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogcmVxLmJvZHkubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IHJlcS5ib2R5LmVtYWlsLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogaGFzaGVkUGFzc3dvcmRcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oZXJyLCB1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbmZpZ1Rva2VuOiBhbnkgPSBjb25maWcudG9rZW5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5zZW5kKFwiVGhlcmUgd2FzIGEgcHJvYmxlbSByZWdpc3RlcmluZyB0aGUgdXNlci5cIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuID0gand0LnNpZ24oeyBpZDogdXNlci5faWQgfSwgY29uZmlnVG9rZW4sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cGlyZXNJbjogODY0MDBcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHsgYXV0aDogdHJ1ZSwgdG9rZW46IHRva2VuIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByb3V0ZXIuZ2V0KCcvbWUnLCBjaGVja1Rva2VuLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgIHJldHVybiBVc2VyLmZpbmRCeUlkKHJlcS51c2VyLmlkLCB7IHBhc3N3b3JkOiAwIH0sIChlcnIsIHVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gcmVzLnN0YXR1cyg1MDApLnNlbmQoXCJUaGVyZSB3YXMgYSBwcm9ibGVtIGZpbmRpbmcgdGhlIHVzZXIuXCIpO1xuICAgICAgICAgICAgICAgIGlmICghdXNlcikgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5zZW5kKFwiTm8gdXNlciB3YXMgZm91bmQuXCIpO1xuICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHVzZXIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcm91dGVyLnBvc3QoXCIvbG9naW5cIiwgYXN5bmMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lKHsgZW1haWw6IHJlcS5ib2R5LmVtYWlsIH0pO1xuXG4gICAgICAgICAgICBpZiAoIXVzZXIpIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiBcIk5vIHVzZXIgd2FzIGZvdW5kXCIgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHZhbGlkUGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShyZXEuYm9keS5wYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XG4gICAgICAgICAgICBpZiAoIXZhbGlkUGFzc3dvcmQpIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiBcIlBhc3N3b3JkIGlzIHdyb25nXCIsIGF1dGg6IGZhbHNlLCB0b2tlbjogbnVsbCB9KTtcblxuXG4gICAgICAgICAgICBjb25zdCBjb25maWdUb2tlbjogYW55ID0gY29uZmlnLnRva2VuO1xuXG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IGp3dC5zaWduKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBpZDogdXNlci5faWQsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb25maWdUb2tlblxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICByZXR1cm4gcmVzLmhlYWRlcihcIngtYWNjZXNzLXRva2VuXCIsIHRva2VuKS5qc29uKHtcbiAgICAgICAgICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgICAgICAgICB0b2tlbixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByb3V0ZXIuZ2V0KCcvbG9nb3V0JywgKHJlcSwgcmVzKSA9PiB7XG4gICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZCh7IGF1dGg6IGZhbHNlLCB0b2tlbjogbnVsbCB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5uZXcgVXNlcnNSb3V0ZXI7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjsiXX0=