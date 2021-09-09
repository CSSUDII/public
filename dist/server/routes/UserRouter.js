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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL1VzZXJSb3V0ZXIudHMiXSwibmFtZXMiOlsicGF0aCIsInJvdXRlciIsImRhdGFiYXNlIiwicHJpc21hIiwiVXNlcnNSb3V0ZXIiLCJsaW1pdGVyIiwid2luZG93TXMiLCJtYXgiLCJtZXNzYWdlIiwidXNlIiwiZXhwcmVzcyIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsImpzb24iLCJyZXEiLCJyZXMiLCJuZXh0IiwiaGVhZGVyIiwicG9zdCIsImhhc2hlZFBhc3N3b3JkIiwiYmNyeXB0IiwiaGFzaFN5bmMiLCJib2R5IiwicGFzc3dvcmQiLCJkb3NlRW1haWxFeGlzdCIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJlbWFpbCIsInN0YXR1cyIsImVycm9yIiwiY3JlYXRlIiwiZGF0YSIsIm5hbWUiLCJhZG1pbiIsInRoZW4iLCJjb25maWdUb2tlbiIsInByb2Nlc3MiLCJlbnYiLCJUT0tFTiIsInRva2VuIiwiand0Iiwic2lnbiIsImlkIiwiZXhwaXJlc0luIiwic2VuZCIsImF1dGgiLCJnZXQiLCJjaGVja1Rva2VuIiwiY29tcGFyZSIsInZhbGlkUGFzc3dvcmQiLCJkZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUFHTyxJQUFNQSxJQUFJLEdBQUcsVUFBYjs7QUFDQSxJQUFNQyxNQUFNLEdBQUcsc0JBQWY7O0FBRVAsSUFBTUMsUUFBUSxHQUFHQywwQkFBakI7O0lBRU1DLFc7QUFDRjtBQUNKO0FBQ0E7QUFDSSx1QkFBYztBQUFBOztBQUNWLE1BQU1DLE9BQU8sR0FBRyxrQ0FBVTtBQUN0QkMsSUFBQUEsUUFBUSxFQUFFLEtBQUssRUFBTCxHQUFVLElBREU7QUFFdEJDLElBQUFBLEdBQUcsRUFBRSxHQUZpQjtBQUd0QkMsSUFBQUEsT0FBTyxFQUFFO0FBSGEsR0FBVixDQUFoQjtBQU1BUCxFQUFBQSxN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LGdCQUFBQSxLQUFLLEVBQUxBO0FBRjJDLGVBQXpDLENBdEJZOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQXRCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBNEJBdkMsRUFBQUEsTUFBTSxDQUFDOEMsR0FBUCxDQUFXLFNBQVgsRUFBc0IsVUFBQ2pDLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ2hDQSxJQUFBQSxHQUFHLENBQUNjLE1BQUosQ0FBVyxHQUFYLEVBQWdCZ0IsSUFBaEIsQ0FBcUI7QUFBRUMsTUFBQUEsSUFBSSxFQUFFLEtBQVI7QUFBZU4sTUFBQUEsS0FBSyxFQUFFO0FBQXRCLEtBQXJCO0FBQ0EsV0FBT3pCLEdBQUcsQ0FBQ29DLE9BQUosRUFBUDtBQUNILEdBSEQ7QUFJSCxDOztBQUdMLElBQUkvQyxXQUFKIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuaW1wb3J0IGV4cHJlc3MsIHsgUm91dGVyLCBSZXNwb25zZSwgUmVxdWVzdCwgTmV4dEZ1bmN0aW9uIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCBwcmlzbWEgZnJvbSBcIi4uLy4uL2NsaWVudC9EYXRhYmFzZUNsaWVudFwiO1xuXG5pbXBvcnQgand0IGZyb20gJ2pzb253ZWJ0b2tlbic7XG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdGpzJztcblxuaW1wb3J0IGNoZWNrVG9rZW4gZnJvbSBcIi4uL2Z1bmN0aW9ucy9jaGVja1Rva2VuXCI7XG5cbmltcG9ydCByYXRlTGltaXQgZnJvbSBcImV4cHJlc3MtcmF0ZS1saW1pdFwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xuXG5leHBvcnQgY29uc3QgcGF0aCA9IFwiL3YxL2F1dGhcIjtcbmV4cG9ydCBjb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxuY29uc3QgZGF0YWJhc2UgPSBwcmlzbWE7XG5cbmNsYXNzIFVzZXJzUm91dGVyIHtcbiAgICAvKipcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgY29uc3QgbGltaXRlciA9IHJhdGVMaW1pdCh7XG4gICAgICAgICAgICB3aW5kb3dNczogMTUgKiA2MCAqIDEwMDAsIFxuICAgICAgICAgICAgbWF4OiAxMDAsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIllvdSBhcmUgYmVpbmcgcmF0ZSBsaW1pdGVkIVwiXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgcm91dGVyLnVzZShsaW1pdGVyKTtcbiAgICAgICAgcm91dGVyLnVzZShleHByZXNzLnVybGVuY29kZWQoeyBleHRlbmRlZDogZmFsc2UgfSkpO1xuICAgICAgICByb3V0ZXIudXNlKGV4cHJlc3MuanNvbigpKTtcblxuICAgICAgICByb3V0ZXIudXNlKChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICAgICAgICAgICAgcmVzLmhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiLCBcIipcIik7XG4gICAgICAgICAgICByZXMuaGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVyc1wiLCBcIk9yaWdpbiwgWC1SZXF1ZXN0ZWQtV2l0aCwgQ29udGVudC1UeXBlLCBBY2NlcHQsIHgtYWNjZXNzLXRva2VuXCIpO1xuICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICByb3V0ZXIucG9zdCgnL3JlZ2lzdGVyJywgYXN5bmMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IGhhc2hlZFBhc3N3b3JkID0gYmNyeXB0Lmhhc2hTeW5jKHJlcS5ib2R5LnBhc3N3b3JkLCA4KTtcblxuICAgICAgICAgICAgY29uc3QgZG9zZUVtYWlsRXhpc3QgPSAoZGF0YWJhc2UpLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IHJlcS5ib2R5LmVtYWlsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChhd2FpdCBkb3NlRW1haWxFeGlzdCkgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IFwiRW1haWwgYWxyZWFkeSBleGlzdHNcIiB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYXdhaXQgKGRhdGFiYXNlKS51c2VyLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiByZXEuYm9keS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogcmVxLmJvZHkuZW1haWwsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBoYXNoZWRQYXNzd29yZCxcbiAgICAgICAgICAgICAgICAgICAgYWRtaW46IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkudGhlbigodXNlcjogVXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbmZpZ1Rva2VuOiBhbnkgPSBwcm9jZXNzLmVudi5UT0tFTjtcbiAgICAgICAgICAgICAgICBjb25zdCB0b2tlbiA9IGp3dC5zaWduKHsgaWQ6IHVzZXIuaWQgfSwgY29uZmlnVG9rZW4sIHtcbiAgICAgICAgICAgICAgICAgICAgZXhwaXJlc0luOiA4NjQwMFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZCh7IGF1dGg6IHRydWUsIHRva2VuOiB0b2tlbiB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgYXV0aDogbnVsbCwgZXJyb3I6IGVycm9yLCBtZXNzYWdlOiBcIlRoZXJlIHdhcyBhIHByb2JsZW0gcmVnaXN0ZXJpbmcgdGhlIHVzZXIuXCIgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcm91dGVyLmdldCgnL21lJywgY2hlY2tUb2tlbiwgYXN5bmMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgIGF3YWl0IChkYXRhYmFzZSkudXNlci5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgdHlwZSBsYXRlclxuICAgICAgICAgICAgICAgICAgIGlkOiByZXEudXNlci5pZFxuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICB9KS50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgICAgICAgICBpZiAoIXVzZXIpIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IGVycm9yOiB0cnVlLCBtZXNzYWdlOiBcIlVzZXIgbm90IGZvdW5kXCIgfSk7XG4gICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBlcnJvcjogZmFsc2UsIHVzZXI6IHVzZXIgfSk7XG4gICAgICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6IGVycm9yLCBtZXNzYWdlOiBcIlRoZXJlIHdhcyBhIHByb2JsZW0gZ2V0dGluZyB1c2VyIGluZm9cIiB9KTtcbiAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcm91dGVyLnBvc3QoXCIvbG9naW5cIiwgYXN5bmMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgKGRhdGFiYXNlKS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiByZXEuYm9keS5lbWFpbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIXVzZXIpIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiBcIk5vIHVzZXIgd2FzIGZvdW5kXCIgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHZhbGlkUGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShyZXEuYm9keS5wYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XG4gICAgICAgICAgICBpZiAoIXZhbGlkUGFzc3dvcmQpIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiBcIlBhc3N3b3JkIGlzIHdyb25nXCIsIGF1dGg6IGZhbHNlLCB0b2tlbjogbnVsbCB9KTtcblxuXG4gICAgICAgICAgICBjb25zdCBjb25maWdUb2tlbjogYW55ID0gcHJvY2Vzcy5lbnYuVE9LRU47XG5cbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gand0LnNpZ24oe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGlkOiB1c2VyLmlkLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29uZmlnVG9rZW5cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgcmV0dXJuIHJlcy5oZWFkZXIoXCJ4LWFjY2Vzcy10b2tlblwiLCB0b2tlbikuanNvbih7XG4gICAgICAgICAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgICAgICAgICAgdG9rZW4sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcm91dGVyLmdldCgnL2xvZ291dCcsIChyZXEsIHJlcykgPT4ge1xuICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoeyBhdXRoOiBmYWxzZSwgdG9rZW46IG51bGwgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzLmRlc3Ryb3koKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5uZXcgVXNlcnNSb3V0ZXI7Il19