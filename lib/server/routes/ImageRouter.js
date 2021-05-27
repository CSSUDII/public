"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _jimp = _interopRequireDefault(require("jimp"));

var _checkToken = _interopRequireDefault(require("../RouterFunctions/checkToken"));

var _Users = _interopRequireDefault(require("../../models/Users"));

var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var router = (0, _express.Router)();

var ImageRouter = function ImageRouter() {
  _classCallCheck(this, ImageRouter);

  router.get('/', function (req, res) {
    res.json({
      message: 'Hello World'
    });
  }); // Basic Limiter, Will be updraded soon!

  var limiter = (0, _expressRateLimit["default"])({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: "You are being rate limited!"
  });
  router.use(limiter); // eslint-disable-next-line @typescript-eslint/no-unused-vars

  router.get('/invert', _checkToken["default"], /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, _next) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              _Users["default"].findById(req.user.id, {
                password: 0
              }, /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, user) {
                  var imageURL, img;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!err) {
                            _context.next = 2;
                            break;
                          }

                          return _context.abrupt("return", res.status(500).send("There was a problem finding the user."));

                        case 2:
                          if (user) {
                            _context.next = 4;
                            break;
                          }

                          return _context.abrupt("return", res.status(404).send("No user was found."));

                        case 4:
                          /**
                           * Bypass Image Limit
                           * Not Inplanted Yet!
                           */
                          if (user.bypassImageLimit) {// Code if the user can bypass Image Router Rare Limit
                          }

                          imageURL = req.query.imgUrl;

                          if (imageURL) {
                            _context.next = 8;
                            break;
                          }

                          return _context.abrupt("return", res.json({
                            error: true,
                            message: 'No Image URL'
                          }));

                        case 8:
                          _context.prev = 8;
                          _context.next = 11;
                          return _jimp["default"].read(imageURL);

                        case 11:
                          img = _context.sent;
                          res.set({
                            'Content-Type': 'image/png'
                          });
                          img.invert();
                          _context.t0 = res.status(200);
                          _context.next = 17;
                          return img.getBufferAsync('image/png');

                        case 17:
                          _context.t1 = _context.sent;

                          _context.t0.send.call(_context.t0, _context.t1);

                          _context.next = 24;
                          break;

                        case 21:
                          _context.prev = 21;
                          _context.t2 = _context["catch"](8);
                          res.status(404).json({
                            error: true,
                            message: 'Error Loading Image'
                          });

                        case 24:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, null, [[8, 21]]);
                }));

                return function (_x4, _x5) {
                  return _ref2.apply(this, arguments);
                };
              }());

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }()); // eslint-disable-next-line @typescript-eslint/no-unused-vars

  router.get('/blur', _checkToken["default"], /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, _next) {
      var imageURL, blurAmount, img;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              imageURL = req.query.imgUrl;
              blurAmount = req.query.blurAmount;
              if (!blurAmount) blurAmount = 4;

              if (imageURL) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return", res.json({
                error: true,
                message: 'No Image URL'
              }));

            case 5:
              _context3.prev = 5;
              _context3.next = 8;
              return _jimp["default"].read(imageURL);

            case 8:
              img = _context3.sent;
              res.set({
                'Content-Type': 'image/png'
              });
              img.blur(blurAmount);
              _context3.t0 = res.status(200);
              _context3.next = 14;
              return img.getBufferAsync('image/png');

            case 14:
              _context3.t1 = _context3.sent;

              _context3.t0.send.call(_context3.t0, _context3.t1);

              _context3.next = 21;
              break;

            case 18:
              _context3.prev = 18;
              _context3.t2 = _context3["catch"](5);
              res.status(400).json({
                error: true,
                message: 'Error Loading Image'
              });

            case 21:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[5, 18]]);
    }));

    return function (_x6, _x7, _x8) {
      return _ref3.apply(this, arguments);
    };
  }()); // eslint-disable-next-line @typescript-eslint/no-unused-vars

  router.get('/grayscale', _checkToken["default"], /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, _next) {
      var imageURL, img;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              imageURL = req.query.imgUrl;

              if (imageURL) {
                _context4.next = 3;
                break;
              }

              return _context4.abrupt("return", res.json({
                error: true,
                message: 'No Image URL'
              }));

            case 3:
              _context4.prev = 3;
              _context4.next = 6;
              return _jimp["default"].read(imageURL);

            case 6:
              img = _context4.sent;
              res.set({
                'Content-Type': 'image/png'
              });
              img.grayscale();
              _context4.t0 = res.status(200);
              _context4.next = 12;
              return img.getBufferAsync('image/png');

            case 12:
              _context4.t1 = _context4.sent;

              _context4.t0.send.call(_context4.t0, _context4.t1);

              _context4.next = 19;
              break;

            case 16:
              _context4.prev = 16;
              _context4.t2 = _context4["catch"](3);
              res.status(400).json({
                error: true,
                message: 'Error Loading Image'
              });

            case 19:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[3, 16]]);
    }));

    return function (_x9, _x10, _x11) {
      return _ref4.apply(this, arguments);
    };
  }());
};

new ImageRouter();
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL0ltYWdlUm91dGVyLnRzIl0sIm5hbWVzIjpbInJvdXRlciIsIkltYWdlUm91dGVyIiwiZ2V0IiwicmVxIiwicmVzIiwianNvbiIsIm1lc3NhZ2UiLCJsaW1pdGVyIiwid2luZG93TXMiLCJtYXgiLCJ1c2UiLCJjaGVja1Rva2VuIiwiX25leHQiLCJVc2VyIiwiZmluZEJ5SWQiLCJ1c2VyIiwiaWQiLCJwYXNzd29yZCIsImVyciIsInN0YXR1cyIsInNlbmQiLCJieXBhc3NJbWFnZUxpbWl0IiwiaW1hZ2VVUkwiLCJxdWVyeSIsImltZ1VybCIsImVycm9yIiwiamltcCIsInJlYWQiLCJpbWciLCJzZXQiLCJpbnZlcnQiLCJnZXRCdWZmZXJBc3luYyIsImJsdXJBbW91bnQiLCJibHVyIiwiZ3JheXNjYWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxNQUFNLEdBQUcsc0JBQWY7O0lBRU1DLFcsR0FDRix1QkFBYztBQUFBOztBQUNWRCxFQUFBQSxNQUFNLENBQUNFLEdBQVAsQ0FBVyxHQUFYLEVBQWdCLFVBQUNDLEdBQUQsRUFBZUMsR0FBZixFQUFpQztBQUM3Q0EsSUFBQUEsR0FBRyxDQUFDQyxJQUFKLENBQVM7QUFBRUMsTUFBQUEsT0FBTyxFQUFFO0FBQVgsS0FBVDtBQUNILEdBRkQsRUFEVSxDQUtWOztBQUNBLE1BQU1DLE9BQU8sR0FBRyxrQ0FBVTtBQUN0QkMsSUFBQUEsUUFBUSxFQUFFLEtBQUssRUFBTCxHQUFVLElBREU7QUFFdEJDLElBQUFBLEdBQUcsRUFBRSxHQUZpQjtBQUd0QkgsSUFBQUEsT0FBTyxFQUFFO0FBSGEsR0FBVixDQUFoQjtBQU1BTixFQUFBQSxNQUFNLENBQUNVLEdBQVAsQ0FBV0gsT0FBWCxFQVpVLENBY1Y7O0FBQ0FQLEVBQUFBLE1BQU0sQ0FBQ0UsR0FBUCxDQUFXLFNBQVgsRUFBc0JTLHNCQUF0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eEIsY0FBQUEsR0FBRyxDQUFDeUIsR0FBSixDQUFRO0FBQUUsZ0NBQWdCO0FBQWxCLGVBQVI7QUFDQUQsY0FBQUEsR0FBRyxDQUFDTSxTQUFKO0FBUjZCLDZCQVM3QjlCLEdBQUcsQ0FBQ2UsTUFBSixDQUFXLEdBQVgsQ0FUNkI7QUFBQTtBQUFBLHFCQVNGUyxHQUFHLENBQUNHLGNBQUosQ0FBbUIsV0FBbkIsQ0FURTs7QUFBQTtBQUFBOztBQUFBLDJCQVNiWCxJQVRhOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBVzdCaEIsY0FBQUEsR0FBRyxDQUFDZSxNQUFKLENBQVcsR0FBWCxFQUFnQmQsSUFBaEIsQ0FBcUI7QUFBRW9CLGdCQUFBQSxLQUFLLEVBQUUsSUFBVDtBQUFlbkIsZ0JBQUFBLE9BQU8sRUFBRTtBQUF4QixlQUFyQjs7QUFYNkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBckM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFlSCxDOztBQUdMLElBQUlMLFdBQUo7ZUFFZUQsTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRGdW5jdGlvbiwgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCBqaW1wIGZyb20gXCJqaW1wXCI7XG5pbXBvcnQgY2hlY2tUb2tlbiBmcm9tIFwiLi4vUm91dGVyRnVuY3Rpb25zL2NoZWNrVG9rZW5cIjtcbmltcG9ydCBVc2VyIGZyb20gXCIuLi8uLi9tb2RlbHMvVXNlcnNcIjtcbmltcG9ydCByYXRlTGltaXQgZnJvbSBcImV4cHJlc3MtcmF0ZS1saW1pdFwiO1xuXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxuY2xhc3MgSW1hZ2VSb3V0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICByb3V0ZXIuZ2V0KCcvJywgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgcmVzLmpzb24oeyBtZXNzYWdlOiAnSGVsbG8gV29ybGQnIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBCYXNpYyBMaW1pdGVyLCBXaWxsIGJlIHVwZHJhZGVkIHNvb24hXG4gICAgICAgIGNvbnN0IGxpbWl0ZXIgPSByYXRlTGltaXQoe1xuICAgICAgICAgICAgd2luZG93TXM6IDE1ICogNjAgKiAxMDAwLCBcbiAgICAgICAgICAgIG1heDogMjAwLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJZb3UgYXJlIGJlaW5nIHJhdGUgbGltaXRlZCFcIlxuICAgICAgICB9KTtcblxuICAgICAgICByb3V0ZXIudXNlKGxpbWl0ZXIpO1xuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICAgICAgcm91dGVyLmdldCgnL2ludmVydCcsIGNoZWNrVG9rZW4sIGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIF9uZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnRcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIFVzZXIuZmluZEJ5SWQocmVxLnVzZXIuaWQsIHsgcGFzc3dvcmQ6IDAgfSwgYXN5bmMgKGVyciwgdXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiByZXMuc3RhdHVzKDUwMCkuc2VuZChcIlRoZXJlIHdhcyBhIHByb2JsZW0gZmluZGluZyB0aGUgdXNlci5cIik7XG4gICAgICAgICAgICAgICAgaWYgKCF1c2VyKSByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLnNlbmQoXCJObyB1c2VyIHdhcyBmb3VuZC5cIik7XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBCeXBhc3MgSW1hZ2UgTGltaXRcbiAgICAgICAgICAgICAgICAgKiBOb3QgSW5wbGFudGVkIFlldCFcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAodXNlci5ieXBhc3NJbWFnZUxpbWl0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENvZGUgaWYgdGhlIHVzZXIgY2FuIGJ5cGFzcyBJbWFnZSBSb3V0ZXIgUmFyZSBMaW1pdFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlVVJMID0gcmVxLnF1ZXJ5LmltZ1VybDtcbiAgICAgICAgICAgICAgICBpZiAoIWltYWdlVVJMKSByZXR1cm4gcmVzLmpzb24oeyBlcnJvcjogdHJ1ZSwgbWVzc2FnZTogJ05vIEltYWdlIFVSTCcgfSk7XG4gICAgXG4gICAgICAgICAgICAgICAgbGV0IGltZztcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpbWcgPSBhd2FpdCBqaW1wLnJlYWQoaW1hZ2VVUkwgYXMgbmV2ZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXMuc2V0KHsgJ0NvbnRlbnQtVHlwZSc6ICdpbWFnZS9wbmcnIH0pO1xuICAgICAgICAgICAgICAgICAgICBpbWcuaW52ZXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKGF3YWl0IGltZy5nZXRCdWZmZXJBc3luYygnaW1hZ2UvcG5nJykpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwNCkuanNvbih7IGVycm9yOiB0cnVlLCBtZXNzYWdlOiAnRXJyb3IgTG9hZGluZyBJbWFnZScgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgICByb3V0ZXIuZ2V0KCcvYmx1cicsIGNoZWNrVG9rZW4sIGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIF9uZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGltYWdlVVJMID0gcmVxLnF1ZXJ5LmltZ1VybDtcbiAgICAgICAgICAgIGxldCBibHVyQW1vdW50OiB1bmtub3duID0gcmVxLnF1ZXJ5LmJsdXJBbW91bnQ7XG4gICAgICAgICAgICBpZiAoIWJsdXJBbW91bnQpIGJsdXJBbW91bnQgPSA0O1xuICAgICAgICAgICAgaWYgKCFpbWFnZVVSTCkgcmV0dXJuIHJlcy5qc29uKHsgZXJyb3I6IHRydWUsIG1lc3NhZ2U6ICdObyBJbWFnZSBVUkwnIH0pO1xuXG4gICAgICAgICAgICBsZXQgaW1nO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpbWcgPSBhd2FpdCBqaW1wLnJlYWQoaW1hZ2VVUkwgYXMgbmV2ZXIpO1xuICAgICAgICAgICAgICAgIHJlcy5zZXQoeyAnQ29udGVudC1UeXBlJzogJ2ltYWdlL3BuZycgfSk7XG4gICAgICAgICAgICAgICAgaW1nLmJsdXIoYmx1ckFtb3VudCBhcyBuZXZlcik7XG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoYXdhaXQgaW1nLmdldEJ1ZmZlckFzeW5jKCdpbWFnZS9wbmcnKSk7XG4gICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiB0cnVlLCBtZXNzYWdlOiAnRXJyb3IgTG9hZGluZyBJbWFnZScgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICAgICAgcm91dGVyLmdldCgnL2dyYXlzY2FsZScsIGNoZWNrVG9rZW4sIGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIF9uZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGltYWdlVVJMID0gcmVxLnF1ZXJ5LmltZ1VybDtcbiAgICAgICAgICAgIGlmICghaW1hZ2VVUkwpIHJldHVybiByZXMuanNvbih7IGVycm9yOiB0cnVlLCBtZXNzYWdlOiAnTm8gSW1hZ2UgVVJMJyB9KTtcblxuICAgICAgICAgICAgbGV0IGltZztcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaW1nID0gYXdhaXQgamltcC5yZWFkKGltYWdlVVJMIGFzIG5ldmVyKTtcbiAgICAgICAgICAgICAgICByZXMuc2V0KHsgJ0NvbnRlbnQtVHlwZSc6ICdpbWFnZS9wbmcnIH0pO1xuICAgICAgICAgICAgICAgIGltZy5ncmF5c2NhbGUoKTtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChhd2FpdCBpbWcuZ2V0QnVmZmVyQXN5bmMoJ2ltYWdlL3BuZycpKTtcbiAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IHRydWUsIG1lc3NhZ2U6ICdFcnJvciBMb2FkaW5nIEltYWdlJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG59XG5cbm5ldyBJbWFnZVJvdXRlcigpXG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjsiXX0=