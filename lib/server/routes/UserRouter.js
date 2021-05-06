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
    console.log(req); // @ts-ignore

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL1VzZXJSb3V0ZXIudHMiXSwibmFtZXMiOlsicm91dGVyIiwiVXNlcnNSb3V0ZXIiLCJsaW1pdGVyIiwid2luZG93TXMiLCJtYXgiLCJtZXNzYWdlIiwidXNlIiwiYm9keVBhcnNlciIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsImpzb24iLCJyZXEiLCJyZXMiLCJuZXh0IiwiaGVhZGVyIiwicG9zdCIsImhhc2hlZFBhc3N3b3JkIiwiYmNyeXB0IiwiaGFzaFN5bmMiLCJib2R5IiwicGFzc3dvcmQiLCJVc2VyIiwiZmluZE9uZSIsImVtYWlsIiwiZG9zZUVtYWlsRXhpc3QiLCJzdGF0dXMiLCJlcnJvciIsImNyZWF0ZSIsIm5hbWUiLCJlcnIiLCJ1c2VyIiwiY29uZmlnVG9rZW4iLCJjb25maWciLCJ0b2tlbiIsInNlbmQiLCJqd3QiLCJzaWduIiwiaWQiLCJfaWQiLCJleHBpcmVzSW4iLCJhdXRoIiwiZ2V0IiwiY2hlY2tUb2tlbiIsImNvbnNvbGUiLCJsb2ciLCJmaW5kQnlJZCIsImNvbXBhcmUiLCJ2YWxpZFBhc3N3b3JkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxNQUFNLEdBQUcsc0JBQWY7O0lBRU1DLFcsR0FDRix1QkFBYztBQUFBOztBQUVWO0FBQ0EsTUFBTUMsT0FBTyxHQUFHLGtDQUFVO0FBQ3RCQyxJQUFBQSxRQUFRLEVBQUUsS0FBSyxFQUFMLEdBQVUsSUFERTtBQUV0QkMsSUFBQUEsR0FBRyxFQUFFLEdBRmlCO0FBR3RCQyxJQUFBQSxPQUFPLEVBQUU7QUFIYSxHQUFWLENBQWhCO0FBTUFMLEVBQUFBLE1BQU0sQ0FBQ00sR0FBUCxDQUFXQyx1QkFBV0MsVUFBWCxDQUFzQjtBQUFFQyxJQUFBQSxRQUFRLEVBQUU7QUFBWixHQUF0QixDQUFYO0FBQ0FULEVBQUFBLE1BQU0sQ0FB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RUFBRVAsSUFBSSxDQUFDUTtBQUZNLGVBQVQsRUFJVlAsV0FKVSxDQVhJO0FBQUEsZ0RBa0JabkIsR0FBRyxDQUFDRSxNQUFKLENBQVcsZ0JBQVgsRUFBNkJtQixLQUE3QixFQUFvQ3ZCLElBQXBDLENBQXlDO0FBQzNDZ0IsZ0JBQUFBLEtBQUssRUFBRSxJQURvQztBQUUzQ08sZ0JBQUFBLEtBQUssRUFBTEE7QUFGMkMsZUFBekMsQ0FsQlk7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBdEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF3QkFqQyxFQUFBQSxNQUFNLENBQUN5QyxHQUFQLENBQVcsU0FBWCxFQUFzQixVQUFDOUIsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDakMsV0FBT0EsR0FBRyxDQUFDYSxNQUFKLENBQVcsR0FBWCxFQUFnQlMsSUFBaEIsQ0FBcUI7QUFBRU0sTUFBQUEsSUFBSSxFQUFFLEtBQVI7QUFBZVAsTUFBQUEsS0FBSyxFQUFFO0FBQXRCLEtBQXJCLENBQVA7QUFDRixHQUZEO0FBR0gsQzs7QUFHTCxJQUFJaEMsV0FBSjtlQUVlRCxNIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50ICovXG5pbXBvcnQgeyBSb3V0ZXIsIFJlc3BvbnNlLCBSZXF1ZXN0LCBOZXh0RnVuY3Rpb24gfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IFVzZXIgZnJvbSBcIi4uLy4uL21vZGVscy9Vc2Vyc1wiO1xuXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi8uLi9jb25maWcvZGIuY29uZmlnXCI7XG5cbmltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJztcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0anMnO1xuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSBcImJvZHktcGFyc2VyXCI7XG5cbmltcG9ydCBjaGVja1Rva2VuIGZyb20gXCIuLi9Sb3V0ZXJGdW5jdGlvbnMvY2hlY2tUb2tlblwiO1xuXG5pbXBvcnQgcmF0ZUxpbWl0IGZyb20gXCJleHByZXNzLXJhdGUtbGltaXRcIjtcblxuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbmNsYXNzIFVzZXJzUm91dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgICAgIGNvbnN0IGxpbWl0ZXIgPSByYXRlTGltaXQoe1xuICAgICAgICAgICAgd2luZG93TXM6IDE1ICogNjAgKiAxMDAwLCBcbiAgICAgICAgICAgIG1heDogMTAwLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJZb3UgYXJlIGJlaW5nIHJhdGUgbGltaXRlZCFcIlxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHJvdXRlci51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IGZhbHNlIH0pKTtcbiAgICAgICAgcm91dGVyLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5cbiAgICAgICAgcm91dGVyLnVzZSgocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICAgICAgICAgIHJlcy5oZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiwgXCIqXCIpO1xuICAgICAgICAgICAgcmVzLmhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnNcIiwgXCJPcmlnaW4sIFgtUmVxdWVzdGVkLVdpdGgsIENvbnRlbnQtVHlwZSwgQWNjZXB0LCB4LWFjY2Vzcy10b2tlblwiKTtcbiAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcm91dGVyLnBvc3QoJy9yZWdpc3RlcicsIGFzeW5jKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBoYXNoZWRQYXNzd29yZCA9IGJjcnlwdC5oYXNoU3luYyhyZXEuYm9keS5wYXNzd29yZCwgOCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGRvc2VFbWFpbEV4aXN0ID0gYXdhaXQgVXNlci5maW5kT25lKHsgZW1haWw6IHJlcS5ib2R5LmVtYWlsIH0pO1xuXG4gICAgICAgICAgICBpZiAoZG9zZUVtYWlsRXhpc3QpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IFwiRW1haWwgYWxyZWFkeSBleGlzdHNcIiB9KTtcblxuICAgICAgICAgICAgVXNlci5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiByZXEuYm9keS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogcmVxLmJvZHkuZW1haWwsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBoYXNoZWRQYXNzd29yZFxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBmdW5jdGlvbihlcnIsIHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29uZmlnVG9rZW46IGFueSA9IGNvbmZpZy50b2tlblxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gcmVzLnN0YXR1cyg1MDApLnNlbmQoXCJUaGVyZSB3YXMgYSBwcm9ibGVtIHJlZ2lzdGVyaW5nIHRoZSB1c2VyLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBqd3Quc2lnbih7IGlkOiB1c2VyLl9pZCB9LCBjb25maWdUb2tlbiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhwaXJlc0luOiA4NjQwMFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoeyBhdXRoOiB0cnVlLCB0b2tlbjogdG9rZW4gfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJvdXRlci5nZXQoJy9tZScsIGNoZWNrVG9rZW4sIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcSlcblxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICByZXR1cm4gVXNlci5maW5kQnlJZChyZXEudXNlci5pZCwgeyBwYXNzd29yZDogMCB9LCAoZXJyLCB1c2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5zZW5kKFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBmaW5kaW5nIHRoZSB1c2VyLlwiKTtcbiAgICAgICAgICAgICAgICBpZiAoIXVzZXIpIHJldHVybiByZXMuc3RhdHVzKDQwNCkuc2VuZChcIk5vIHVzZXIgd2FzIGZvdW5kLlwiKTtcbiAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZCh1c2VyKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJvdXRlci5wb3N0KFwiL2xvZ2luXCIsIGFzeW5jKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuZmluZE9uZSh7IGVtYWlsOiByZXEuYm9keS5lbWFpbCB9KTtcblxuICAgICAgICAgICAgaWYgKCF1c2VyKSByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogXCJObyB1c2VyIHdhcyBmb3VuZFwiIH0pO1xuXG4gICAgICAgICAgICBjb25zdCB2YWxpZFBhc3N3b3JkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUocmVxLmJvZHkucGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpO1xuICAgICAgICAgICAgaWYgKCF2YWxpZFBhc3N3b3JkKSByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogXCJQYXNzd29yZCBpcyB3cm9uZ1wiLCBhdXRoOiBmYWxzZSwgdG9rZW46IG51bGwgfSk7XG5cblxuICAgICAgICAgICAgY29uc3QgY29uZmlnVG9rZW46IGFueSA9IGNvbmZpZy50b2tlbjtcblxuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBqd3Quc2lnbih7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHVzZXIuX2lkLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29uZmlnVG9rZW5cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgcmV0dXJuIHJlcy5oZWFkZXIoXCJ4LWFjY2Vzcy10b2tlblwiLCB0b2tlbikuanNvbih7XG4gICAgICAgICAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgICAgICAgICAgdG9rZW4sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcm91dGVyLmdldCgnL2xvZ291dCcsIChyZXEsIHJlcykgPT4ge1xuICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQoeyBhdXRoOiBmYWxzZSwgdG9rZW46IG51bGwgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxubmV3IFVzZXJzUm91dGVyO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7Il19