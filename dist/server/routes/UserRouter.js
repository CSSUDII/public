"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = exports.path = void 0;

var _express = _interopRequireWildcard(require("express"));

var _DatabaseClient = _interopRequireDefault(require("../../client/DatabaseClient"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _checkToken = _interopRequireDefault(require("../functions/checkToken"));

var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var path = "/v1/auth";
exports.path = path;
var router = (0, _express.Router)();
exports.router = router;
var database = _DatabaseClient["default"];

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
  router.use(_express["default"].urlencoded({
    extended: false
  }));
  router.use(_express["default"].json());
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
              doseEmailExist = database.user.findUnique({
                where: {
                  email: req.body.email
                }
              });
              _context.next = 4;
              return doseEmailExist;

            case 4:
              if (!_context.sent) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                error: "Email already exists"
              }));

            case 6:
              _context.next = 8;
              return database.user.create({
                data: {
                  name: req.body.name,
                  email: req.body.email,
                  password: hashedPassword,
                  admin: false
                }
              }).then(function (user) {
                var configToken = process.env.TOKEN;

                var token = _jsonwebtoken["default"].sign({
                  id: user.id
                }, configToken, {
                  expiresIn: 86400
                });

                return res.status(200).send({
                  auth: true,
                  token: token
                });
              })["catch"](function (error) {
                res.status(500).json({
                  auth: null,
                  error: error,
                  message: "There was a problem registering the user."
                });
              });

            case 8:
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
  router.get('/me', _checkToken["default"], /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return database.user.findUnique({
                where: {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore type later
                  id: req.user.id
                },
                select: {
                  password: false
                }
              }).then(function (user) {
                if (!user) return res.status(404).json({
                  error: true,
                  message: "User not found"
                });
                return res.status(200).json({
                  error: false,
                  user: user
                });
              })["catch"](function (error) {
                return res.status(500).json({
                  error: error,
                  message: "There was a problem getting user info"
                });
              });

            case 2:
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
  router.post("/login", /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var user, validPassword, configToken, token;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return database.user.findUnique({
                where: {
                  email: req.body.email
                }
              });

            case 2:
              user = _context3.sent;

              if (user) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return", res.status(400).json({
                error: "No user was found"
              }));

            case 5:
              _context3.next = 7;
              return _bcryptjs["default"].compare(req.body.password, user.password);

            case 7:
              validPassword = _context3.sent;

              if (validPassword) {
                _context3.next = 10;
                break;
              }

              return _context3.abrupt("return", res.status(400).json({
                error: "Password is wrong",
                auth: false,
                token: null
              }));

            case 10:
              configToken = process.env.TOKEN;
              token = _jsonwebtoken["default"].sign({
                name: user.name,
                id: user.id
              }, configToken);
              return _context3.abrupt("return", res.header("x-access-token", token).json({
                error: null,
                token: token
              }));

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
  router.get('/logout', function (req, res) {
    res.status(200).send({
      auth: false,
      token: null
    });
    return res.destroy();
  });
};

new UsersRouter();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL1VzZXJSb3V0ZXIudHMiXSwibmFtZXMiOlsicGF0aCIsInJvdXRlciIsImRhdGFiYXNlIiwicHJpc21hIiwiVXNlcnNSb3V0ZXIiLCJsaW1pdGVyIiwid2luZG93TXMiLCJtYXgiLCJtZXNzYWdlIiwidXNlIiwiZXhwcmVzcyIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsImpzb24iLCJyZXEiLCJyZXMiLCJuZXh0IiwiaGVhZGVyIiwicG9zdCIsImhhc2hlZFBhc3N3b3JkIiwiYmNyeXB0IiwiaGFzaFN5bmMiLCJib2R5IiwicGFzc3dvcmQiLCJkb3NlRW1haWxFeGlzdCIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJlbWFpbCIsInN0YXR1cyIsImVycm9yIiwiY3JlYXRlIiwiZGF0YSIsIm5hbWUiLCJhZG1pbiIsInRoZW4iLCJjb25maWdUb2tlbiIsInByb2Nlc3MiLCJlbnYiLCJUT0tFTiIsInRva2VuIiwiand0Iiwic2lnbiIsImlkIiwiZXhwaXJlc0luIiwic2VuZCIsImF1dGgiLCJnZXQiLCJjaGVja1Rva2VuIiwic2VsZWN0IiwiY29tcGFyZSIsInZhbGlkUGFzc3dvcmQiLCJkZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUFHTyxJQUFNQSxJQUFJLEdBQUcsVUFBYjs7QUFDQSxJQUFNQyxNQUFNLEdBQUcsc0JBQWY7O0FBRVAsSUFBTUMsUUFBUSxHQUFHQywwQkFBakI7O0lBRU1DLFc7QUFDRjtBQUNKO0FBQ0E7QUFDSSx1QkFBYztBQUFBOztBQUNWLE1BQU1DLE9BQU8sR0FBRyxrQ0FBVTtBQUN0QkMsSUFBQUEsUUFBUSxFQUFFLEtBQUssRUFBTCxHQUFVLElBREU7QUFFdEJDLElBQUFBLEdBQUcsRUFBRSxHQUZpQjtBQUd0QkMsSUFBQUEsT0FBTyxFQUFFO0FBSGEsR0FBVixDQUFoQjtBQU1B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QUE2QnVCLEtBQTdCLEVBQW9DM0IsSUFBcEMsQ0FBeUM7QUFDM0NpQixnQkFBQUEsS0FBSyxFQUFFLElBRG9DO0FBRTNDVSxnQkFBQUEsS0FBSyxFQUFMQTtBQUYyQyxlQUF6QyxDQXRCWTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUF0Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQTRCQXZDLEVBQUFBLE1BQU0sQ0FBQzhDLEdBQVAsQ0FBVyxTQUFYLEVBQXNCLFVBQUNqQyxHQUFELEVBQU1DLEdBQU4sRUFBYztBQUNoQ0EsSUFBQUEsR0FBRyxDQUFDYyxNQUFKLENBQVcsR0FBWCxFQUFnQmdCLElBQWhCLENBQXFCO0FBQUVDLE1BQUFBLElBQUksRUFBRSxLQUFSO0FBQWVOLE1BQUFBLEtBQUssRUFBRTtBQUF0QixLQUFyQjtBQUNBLFdBQU96QixHQUFHLENBQUNxQyxPQUFKLEVBQVA7QUFDSCxHQUhEO0FBSUgsQzs7QUFHTCxJQUFJaEQsV0FBSiIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbmltcG9ydCBleHByZXNzLCB7IFJvdXRlciwgUmVzcG9uc2UsIFJlcXVlc3QsIE5leHRGdW5jdGlvbiB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgcHJpc21hIGZyb20gXCIuLi8uLi9jbGllbnQvRGF0YWJhc2VDbGllbnRcIjtcblxuaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHRqcyc7XG5cbmltcG9ydCBjaGVja1Rva2VuIGZyb20gXCIuLi9mdW5jdGlvbnMvY2hlY2tUb2tlblwiO1xuXG5pbXBvcnQgcmF0ZUxpbWl0IGZyb20gXCJleHByZXNzLXJhdGUtbGltaXRcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcblxuZXhwb3J0IGNvbnN0IHBhdGggPSBcIi92MS9hdXRoXCI7XG5leHBvcnQgY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbmNvbnN0IGRhdGFiYXNlID0gcHJpc21hO1xuXG5jbGFzcyBVc2Vyc1JvdXRlciB7XG4gICAgLyoqXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGNvbnN0IGxpbWl0ZXIgPSByYXRlTGltaXQoe1xuICAgICAgICAgICAgd2luZG93TXM6IDE1ICogNjAgKiAxMDAwLCBcbiAgICAgICAgICAgIG1heDogMTAwLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJZb3UgYXJlIGJlaW5nIHJhdGUgbGltaXRlZCFcIlxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHJvdXRlci51c2UobGltaXRlcik7XG4gICAgICAgIHJvdXRlci51c2UoZXhwcmVzcy51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IGZhbHNlIH0pKTtcbiAgICAgICAgcm91dGVyLnVzZShleHByZXNzLmpzb24oKSk7XG5cbiAgICAgICAgcm91dGVyLnVzZSgocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICAgICAgICAgIHJlcy5oZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiwgXCIqXCIpO1xuICAgICAgICAgICAgcmVzLmhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnNcIiwgXCJPcmlnaW4sIFgtUmVxdWVzdGVkLVdpdGgsIENvbnRlbnQtVHlwZSwgQWNjZXB0LCB4LWFjY2Vzcy10b2tlblwiKTtcbiAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcm91dGVyLnBvc3QoJy9yZWdpc3RlcicsIGFzeW5jKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBoYXNoZWRQYXNzd29yZCA9IGJjcnlwdC5oYXNoU3luYyhyZXEuYm9keS5wYXNzd29yZCwgOCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGRvc2VFbWFpbEV4aXN0ID0gKGRhdGFiYXNlKS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiByZXEuYm9keS5lbWFpbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoYXdhaXQgZG9zZUVtYWlsRXhpc3QpIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiBcIkVtYWlsIGFscmVhZHkgZXhpc3RzXCIgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGF3YWl0IChkYXRhYmFzZSkudXNlci5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogcmVxLmJvZHkubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IHJlcS5ib2R5LmVtYWlsLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogaGFzaGVkUGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICAgIGFkbWluOiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnRoZW4oKHVzZXI6IFVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb25maWdUb2tlbjogYW55ID0gcHJvY2Vzcy5lbnYuVE9LRU47XG4gICAgICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBqd3Quc2lnbih7IGlkOiB1c2VyLmlkIH0sIGNvbmZpZ1Rva2VuLCB7XG4gICAgICAgICAgICAgICAgICAgIGV4cGlyZXNJbjogODY0MDBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQoeyBhdXRoOiB0cnVlLCB0b2tlbjogdG9rZW4gfSk7XG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGF1dGg6IG51bGwsIGVycm9yOiBlcnJvciwgbWVzc2FnZTogXCJUaGVyZSB3YXMgYSBwcm9ibGVtIHJlZ2lzdGVyaW5nIHRoZSB1c2VyLlwiIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJvdXRlci5nZXQoJy9tZScsIGNoZWNrVG9rZW4sIGFzeW5jKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICBhd2FpdCAoZGF0YWJhc2UpLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnRcbiAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIHR5cGUgbGF0ZXJcbiAgICAgICAgICAgICAgICAgICBpZDogcmVxLnVzZXIuaWRcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogZmFsc2VcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfSkudGhlbigodXNlcikgPT4ge1xuICAgICAgICAgICAgICAgaWYgKCF1c2VyKSByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBlcnJvcjogdHJ1ZSwgbWVzc2FnZTogXCJVc2VyIG5vdCBmb3VuZFwiIH0pO1xuICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgZXJyb3I6IGZhbHNlLCB1c2VyOiB1c2VyIH0pO1xuICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiBlcnJvciwgbWVzc2FnZTogXCJUaGVyZSB3YXMgYSBwcm9ibGVtIGdldHRpbmcgdXNlciBpbmZvXCIgfSk7XG4gICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJvdXRlci5wb3N0KFwiL2xvZ2luXCIsIGFzeW5jKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IChkYXRhYmFzZSkudXNlci5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICAgICAgICBlbWFpbDogcmVxLmJvZHkuZW1haWxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKCF1c2VyKSByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogXCJObyB1c2VyIHdhcyBmb3VuZFwiIH0pO1xuXG4gICAgICAgICAgICBjb25zdCB2YWxpZFBhc3N3b3JkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUocmVxLmJvZHkucGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpO1xuICAgICAgICAgICAgaWYgKCF2YWxpZFBhc3N3b3JkKSByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogXCJQYXNzd29yZCBpcyB3cm9uZ1wiLCBhdXRoOiBmYWxzZSwgdG9rZW46IG51bGwgfSk7XG5cblxuICAgICAgICAgICAgY29uc3QgY29uZmlnVG9rZW46IGFueSA9IHByb2Nlc3MuZW52LlRPS0VOO1xuXG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IGp3dC5zaWduKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBpZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbmZpZ1Rva2VuXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgIHJldHVybiByZXMuaGVhZGVyKFwieC1hY2Nlc3MtdG9rZW5cIiwgdG9rZW4pLmpzb24oe1xuICAgICAgICAgICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICAgICAgICAgIHRva2VuLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJvdXRlci5nZXQoJy9sb2dvdXQnLCAocmVxLCByZXMpID0+IHtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHsgYXV0aDogZmFsc2UsIHRva2VuOiBudWxsIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5kZXN0cm95KCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxubmV3IFVzZXJzUm91dGVyOyJdfQ==