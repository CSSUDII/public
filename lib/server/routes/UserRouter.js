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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL1VzZXJSb3V0ZXIudHMiXSwibmFtZXMiOlsicm91dGVyIiwiVXNlcnNSb3V0ZXIiLCJsaW1pdGVyIiwid2luZG93TXMiLCJtYXgiLCJtZXNzYWdlIiwidXNlIiwiYm9keVBhcnNlciIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsImpzb24iLCJyZXEiLCJyZXMiLCJuZXh0IiwiaGVhZGVyIiwicG9zdCIsImhhc2hlZFBhc3N3b3JkIiwiYmNyeXB0IiwiaGFzaFN5bmMiLCJib2R5IiwicGFzc3dvcmQiLCJVc2VyIiwiZmluZE9uZSIsImVtYWlsIiwiZG9zZUVtYWlsRXhpc3QiLCJzdGF0dXMiLCJlcnJvciIsImNyZWF0ZSIsIm5hbWUiLCJlcnIiLCJ1c2VyIiwiY29uZmlnVG9rZW4iLCJjb25maWciLCJ0b2tlbiIsInNlbmQiLCJqd3QiLCJzaWduIiwiaWQiLCJfaWQiLCJleHBpcmVzSW4iLCJhdXRoIiwiZ2V0IiwiY2hlY2tUb2tlbiIsImZpbmRCeUlkIiwiY29tcGFyZSIsInZhbGlkUGFzc3dvcmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFFQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7OztBQUVBLElBQU1BLE1BQU0sR0FBRyxzQkFBZjs7SUFFTUMsVztBQUNGO0FBQ0o7QUFDQTtBQUNJLHVCQUFjO0FBQUE7O0FBRVYsTUFBTUMsT0FBTyxHQUFHLGtDQUFVO0FBQ3RCQyxJQUFBQSxRQUFRLEVBQUUsS0FBSyxFQUFMLEdBQVUsSUFERTtBQUV0QkMsSUFBQUEsR0FBRyxFQUFFLEdBRmlCO0FBR3RCQyxJQUFBQSxPQUFPLEVBQUU7QUFIYSxHQUFWLENBQWhCO0FBTUFMLEVBQUFBLE1BQU0sQ0FBQ00sR0FBUCxDQUFXSixPQUFYO0FBQ0FGLEVBQUFBLE1BQU0sQ0FBQ00sR0FBUCxDQUFXQyx1QkFBV0MsVUFBWCxDQUFzQjtBQUFFQyxJQUFBQSxRQUFRLEVBQUU7QUFB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O0FBRk0sZUFBVCxFQUlWUCxXQUpVLENBWEk7QUFBQSxnREFrQlpuQixHQUFHLENBQUNFLE1BQUosQ0FBVyxnQkFBWCxFQUE2Qm1CLEtBQTdCLEVBQW9DdkIsSUFBcEMsQ0FBeUM7QUFDM0NnQixnQkFBQUEsS0FBSyxFQUFFLElBRG9DO0FBRTNDTyxnQkFBQUEsS0FBSyxFQUFMQTtBQUYyQyxlQUF6QyxDQWxCWTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUF0Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXdCQWpDLEVBQUFBLE1BQU0sQ0FBQ3lDLEdBQVAsQ0FBVyxTQUFYLEVBQXNCLFVBQUM5QixHQUFELEVBQU1DLEdBQU4sRUFBYztBQUNqQyxXQUFPQSxHQUFHLENBQUNhLE1BQUosQ0FBVyxHQUFYLEVBQWdCUyxJQUFoQixDQUFxQjtBQUFFTSxNQUFBQSxJQUFJLEVBQUUsS0FBUjtBQUFlUCxNQUFBQSxLQUFLLEVBQUU7QUFBdEIsS0FBckIsQ0FBUDtBQUNGLEdBRkQ7QUFHSCxDOztBQUdMLElBQUloQyxXQUFKO2VBRWVELE0iLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnQgKi9cbmltcG9ydCB7IFJvdXRlciwgUmVzcG9uc2UsIFJlcXVlc3QsIE5leHRGdW5jdGlvbiB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgVXNlciBmcm9tIFwiLi4vLi4vbW9kZWxzL1VzZXJzXCI7XG5cbmltcG9ydCBjb25maWcgZnJvbSBcIi4uLy4uL2NvbmZpZy9kYi5jb25maWdcIjtcblxuaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHRqcyc7XG5pbXBvcnQgYm9keVBhcnNlciBmcm9tIFwiYm9keS1wYXJzZXJcIjtcblxuaW1wb3J0IGNoZWNrVG9rZW4gZnJvbSBcIi4uL1JvdXRlckZ1bmN0aW9ucy9jaGVja1Rva2VuXCI7XG5cbmltcG9ydCByYXRlTGltaXQgZnJvbSBcImV4cHJlc3MtcmF0ZS1saW1pdFwiO1xuXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxuY2xhc3MgVXNlcnNSb3V0ZXIge1xuICAgIC8qKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIGNvbnN0IGxpbWl0ZXIgPSByYXRlTGltaXQoe1xuICAgICAgICAgICAgd2luZG93TXM6IDE1ICogNjAgKiAxMDAwLCBcbiAgICAgICAgICAgIG1heDogMTAwLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJZb3UgYXJlIGJlaW5nIHJhdGUgbGltaXRlZCFcIlxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHJvdXRlci51c2UobGltaXRlcik7XG4gICAgICAgIHJvdXRlci51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IGZhbHNlIH0pKTtcbiAgICAgICAgcm91dGVyLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5cbiAgICAgICAgcm91dGVyLnVzZSgocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICAgICAgICAgIHJlcy5oZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiwgXCIqXCIpO1xuICAgICAgICAgICAgcmVzLmhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnNcIiwgXCJPcmlnaW4sIFgtUmVxdWVzdGVkLVdpdGgsIENvbnRlbnQtVHlwZSwgQWNjZXB0LCB4LWFjY2Vzcy10b2tlblwiKTtcbiAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICByb3V0ZXIucG9zdCgnL3JlZ2lzdGVyJywgYXN5bmMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IGhhc2hlZFBhc3N3b3JkID0gYmNyeXB0Lmhhc2hTeW5jKHJlcS5ib2R5LnBhc3N3b3JkLCA4KTtcblxuICAgICAgICAgICAgY29uc3QgZG9zZUVtYWlsRXhpc3QgPSBhd2FpdCBVc2VyLmZpbmRPbmUoeyBlbWFpbDogcmVxLmJvZHkuZW1haWwgfSk7XG5cbiAgICAgICAgICAgIGlmIChkb3NlRW1haWxFeGlzdClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogXCJFbWFpbCBhbHJlYWR5IGV4aXN0c1wiIH0pO1xuXG4gICAgICAgICAgICBVc2VyLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHJlcS5ib2R5Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiByZXEuYm9keS5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IGhhc2hlZFBhc3N3b3JkXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGVyciwgdXNlcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb25maWdUb2tlbjogYW55ID0gY29uZmlnLnRva2VuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiByZXMuc3RhdHVzKDUwMCkuc2VuZChcIlRoZXJlIHdhcyBhIHByb2JsZW0gcmVnaXN0ZXJpbmcgdGhlIHVzZXIuXCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2tlbiA9IGp3dC5zaWduKHsgaWQ6IHVzZXIuX2lkIH0sIGNvbmZpZ1Rva2VuLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBleHBpcmVzSW46IDg2NDAwXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZCh7IGF1dGg6IHRydWUsIHRva2VuOiB0b2tlbiB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcm91dGVyLmdldCgnL21lJywgY2hlY2tUb2tlbiwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICByZXR1cm4gVXNlci5maW5kQnlJZChyZXEudXNlci5pZCwgeyBwYXNzd29yZDogMCB9LCAoZXJyLCB1c2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5zZW5kKFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBmaW5kaW5nIHRoZSB1c2VyLlwiKTtcbiAgICAgICAgICAgICAgICBpZiAoIXVzZXIpIHJldHVybiByZXMuc3RhdHVzKDQwNCkuc2VuZChcIk5vIHVzZXIgd2FzIGZvdW5kLlwiKTtcbiAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZCh1c2VyKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJvdXRlci5wb3N0KFwiL2xvZ2luXCIsIGFzeW5jKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuZmluZE9uZSh7IGVtYWlsOiByZXEuYm9keS5lbWFpbCB9KTtcblxuICAgICAgICAgICAgaWYgKCF1c2VyKSByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogXCJObyB1c2VyIHdhcyBmb3VuZFwiIH0pO1xuXG4gICAgICAgICAgICBjb25zdCB2YWxpZFBhc3N3b3JkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUocmVxLmJvZHkucGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpO1xuICAgICAgICAgICAgaWYgKCF2YWxpZFBhc3N3b3JkKSByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogXCJQYXNzd29yZCBpcyB3cm9uZ1wiLCBhdXRoOiBmYWxzZSwgdG9rZW46IG51bGwgfSk7XG5cblxuICAgICAgICAgICAgY29uc3QgY29uZmlnVG9rZW46IGFueSA9IGNvbmZpZy50b2tlbjtcblxuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBqd3Quc2lnbih7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHVzZXIuX2lkLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29uZmlnVG9rZW5cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgcmV0dXJuIHJlcy5oZWFkZXIoXCJ4LWFjY2Vzcy10b2tlblwiLCB0b2tlbikuanNvbih7XG4gICAgICAgICAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgICAgICAgICAgdG9rZW4sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcm91dGVyLmdldCgnL2xvZ291dCcsIChyZXEsIHJlcykgPT4ge1xuICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQoeyBhdXRoOiBmYWxzZSwgdG9rZW46IG51bGwgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxubmV3IFVzZXJzUm91dGVyO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7Il19