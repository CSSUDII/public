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
  router.get('/me', _checkToken["default"], function (req, res, next) {
    // @ts-ignore what can you do?
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

;
new UsersRouter();
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL1VzZXJSb3V0ZXIudHMiXSwibmFtZXMiOlsicm91dGVyIiwiVXNlcnNSb3V0ZXIiLCJsaW1pdGVyIiwid2luZG93TXMiLCJtYXgiLCJtZXNzYWdlIiwidXNlIiwiYm9keVBhcnNlciIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsImpzb24iLCJyZXEiLCJyZXMiLCJuZXh0IiwiaGVhZGVyIiwicG9zdCIsImhhc2hlZFBhc3N3b3JkIiwiYmNyeXB0IiwiaGFzaFN5bmMiLCJib2R5IiwicGFzc3dvcmQiLCJVc2VyIiwiZmluZE9uZSIsImVtYWlsIiwiZG9zZUVtYWlsRXhpc3QiLCJzdGF0dXMiLCJlcnJvciIsImNyZWF0ZSIsIm5hbWUiLCJlcnIiLCJ1c2VyIiwiY29uZmlnVG9rZW4iLCJjb25maWciLCJ0b2tlbiIsInNlbmQiLCJqd3QiLCJzaWduIiwiaWQiLCJfaWQiLCJleHBpcmVzSW4iLCJhdXRoIiwiZ2V0IiwiY2hlY2tUb2tlbiIsImZpbmRCeUlkIiwidXNlcklkIiwiY29tcGFyZSIsInZhbGlkUGFzc3dvcmQiLCJkYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxNQUFNLEdBQUcsc0JBQWY7O0lBRU1DLFcsR0FDRix1QkFBYztBQUFBOztBQUVWLE1BQU1DLE9BQU8sR0FBRyxrQ0FBVTtBQUN0QkMsSUFBQUEsUUFBUSxFQUFFLEtBQUssRUFBTCxHQUFVLElBREU7QUFFdEJDLElBQUFBLEdBQUcsRUFBRSxHQUZpQjtBQUd0QkMsSUFBQUEsT0FBTyxFQUFFO0FBSGEsR0FBVixDQUFoQjtBQU1BTCxFQUFBQSxNQUFNLENBQUNNLEdBQVAsQ0FBV0MsdUJBQVdDLFVBQVgsQ0FBc0I7QUFBRUMsSUFBQUEsUUFBUSxFQUFFO0FBQVosR0FBdEIsQ0FBWDtBQUNBVCxFQUFBQSxNQUFNLENBQUNNLEdB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QUFKLENBQVcsWUFBWCxFQUF5Qm1CLEtBQXpCLEVBQWdDdkIsSUFBaEMsQ0FBcUM7QUFDakNnQixnQkFBQUEsS0FBSyxFQUFFLElBRDBCO0FBRWpDcUIsZ0JBQUFBLElBQUksRUFBRTtBQUNGZCxrQkFBQUEsS0FBSyxFQUFMQTtBQURFO0FBRjJCLGVBQXJDOztBQW5Ca0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBdEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUEyQkFqQyxFQUFBQSxNQUFNLENBQUN5QyxHQUFQLENBQVcsU0FBWCxFQUFzQixVQUFDOUIsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDaENBLElBQUFBLEdBQUcsQ0FBQ2EsTUFBSixDQUFXLEdBQVgsRUFBZ0JTLElBQWhCLENBQXFCO0FBQUVNLE1BQUFBLElBQUksRUFBRSxLQUFSO0FBQWVQLE1BQUFBLEtBQUssRUFBRTtBQUF0QixLQUFyQjtBQUNILEdBRkQ7QUFHSCxDOztBQUNKO0FBRUQsSUFBSWhDLFdBQUo7ZUFFZUQsTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRGdW5jdGlvbiwgUm91dGVyLCBSZXNwb25zZSwgUmVxdWVzdCB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgVXNlciBmcm9tIFwiLi4vLi4vbW9kZWxzL1VzZXJzXCI7XG5cbmltcG9ydCBjb25maWcgZnJvbSBcIi4uLy4uL2NvbmZpZy9kYi5jb25maWdcIjtcblxuaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHRqcyc7XG5pbXBvcnQgYm9keVBhcnNlciBmcm9tIFwiYm9keS1wYXJzZXJcIjtcblxuaW1wb3J0IGNoZWNrVG9rZW4gZnJvbSBcIi4uL1JvdXRlckZ1bmN0aW9ucy9jaGVja1Rva2VuXCI7XG5cbmltcG9ydCByYXRlTGltaXQgZnJvbSBcImV4cHJlc3MtcmF0ZS1saW1pdFwiO1xuXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxuY2xhc3MgVXNlcnNSb3V0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIGNvbnN0IGxpbWl0ZXIgPSByYXRlTGltaXQoe1xuICAgICAgICAgICAgd2luZG93TXM6IDE1ICogNjAgKiAxMDAwLCBcbiAgICAgICAgICAgIG1heDogMTAwLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJZb3UgYXJlIGJlaW5nIHJhdGUgbGltaXRlZCFcIlxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHJvdXRlci51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IGZhbHNlIH0pKTtcbiAgICAgICAgcm91dGVyLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5cbiAgICAgICAgcm91dGVyLnVzZSgocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICAgICAgICAgIHJlcy5oZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiwgXCIqXCIpO1xuICAgICAgICAgICAgcmVzLmhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnNcIiwgXCJPcmlnaW4sIFgtUmVxdWVzdGVkLVdpdGgsIENvbnRlbnQtVHlwZSwgQWNjZXB0LCB4LWFjY2Vzcy10b2tlblwiKTtcbiAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcm91dGVyLnBvc3QoJy9yZWdpc3RlcicsIGFzeW5jKHJlcSwgcmVzKSA9PiB7XG5cbiAgICAgICAgICAgIHZhciBoYXNoZWRQYXNzd29yZCA9IGJjcnlwdC5oYXNoU3luYyhyZXEuYm9keS5wYXNzd29yZCwgOCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGRvc2VFbWFpbEV4aXN0ID0gYXdhaXQgVXNlci5maW5kT25lKHsgZW1haWw6IHJlcS5ib2R5LmVtYWlsIH0pO1xuXG4gICAgICAgICAgICBpZiAoZG9zZUVtYWlsRXhpc3QpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IFwiRW1haWwgYWxyZWFkeSBleGlzdHNcIiB9KTtcblxuICAgICAgICAgICAgVXNlci5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiByZXEuYm9keS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogcmVxLmJvZHkuZW1haWwsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBoYXNoZWRQYXNzd29yZFxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBmdW5jdGlvbihlcnIsIHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29uZmlnVG9rZW46IGFueSA9IGNvbmZpZy50b2tlblxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gcmVzLnN0YXR1cyg1MDApLnNlbmQoXCJUaGVyZSB3YXMgYSBwcm9ibGVtIHJlZ2lzdGVyaW5nIHRoZSB1c2VyLlwiKVxuICAgICAgICAgICAgICAgICAgICB2YXIgdG9rZW4gPSBqd3Quc2lnbih7IGlkOiB1c2VyLl9pZCB9LCBjb25maWdUb2tlbiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhwaXJlc0luOiA4NjQwMFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoeyBhdXRoOiB0cnVlLCB0b2tlbjogdG9rZW4gfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJvdXRlci5nZXQoJy9tZScsIGNoZWNrVG9rZW4sIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlIHdoYXQgY2FuIHlvdSBkbz9cbiAgICAgICAgICAgIFVzZXIuZmluZEJ5SWQocmVxLnVzZXJJZCwgeyBwYXNzd29yZDogMCB9LCAoZXJyLCB1c2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5zZW5kKFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBmaW5kaW5nIHRoZSB1c2VyLlwiKTtcbiAgICAgICAgICAgICAgICBpZiAoIXVzZXIpIHJldHVybiByZXMuc3RhdHVzKDQwNCkuc2VuZChcIk5vIHVzZXIgd2FzIGZvdW5kLlwiKTtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZCh1c2VyKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJvdXRlci5wb3N0KFwiL2xvZ2luXCIsIGFzeW5jKHJlcSwgcmVzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lKHsgZW1haWw6IHJlcS5ib2R5LmVtYWlsIH0pO1xuXG4gICAgICAgICAgICBpZiAoIXVzZXIpIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiBcIk5vIHVzZXIgd2FzIGZvdW5kXCIgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHZhbGlkUGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShyZXEuYm9keS5wYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XG4gICAgICAgICAgICBpZiAoIXZhbGlkUGFzc3dvcmQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IFwiUGFzc3dvcmQgaXMgd3JvbmdcIiwgYXV0aDogZmFsc2UsIHRva2VuOiBudWxsIH0pO1xuXG5cbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZ1Rva2VuOiBhbnkgPSBjb25maWcudG9rZW47XG5cbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gand0LnNpZ24oe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGlkOiB1c2VyLl9pZCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbmZpZ1Rva2VuXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXMuaGVhZGVyKFwiYXV0aC10b2tlblwiLCB0b2tlbikuanNvbih7XG4gICAgICAgICAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJvdXRlci5nZXQoJy9sb2dvdXQnLCAocmVxLCByZXMpID0+IHtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHsgYXV0aDogZmFsc2UsIHRva2VuOiBudWxsIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xufTtcblxubmV3IFVzZXJzUm91dGVyO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7Il19