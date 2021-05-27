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
  }); // eslint-disable-next-line @typescript-eslint/no-unused-vars

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
                  var limiter, imageURL, img;
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
                          limiter = (0, _expressRateLimit["default"])({
                            windowMs: 15 * 60 * 1000,
                            max: 5,
                            message: "You are being rate limited!"
                          });

                          if (!user.bypassImageLimit) {
                            router.use(limiter);
                            console.log(user);
                          }

                          imageURL = req.query.imgUrl;

                          if (imageURL) {
                            _context.next = 9;
                            break;
                          }

                          return _context.abrupt("return", res.json({
                            error: true,
                            message: 'No Image URL'
                          }));

                        case 9:
                          _context.prev = 9;
                          _context.next = 12;
                          return _jimp["default"].read(imageURL);

                        case 12:
                          img = _context.sent;
                          res.set({
                            'Content-Type': 'image/png'
                          });
                          img.invert();
                          _context.t0 = res.status(200);
                          _context.next = 18;
                          return img.getBufferAsync('image/png');

                        case 18:
                          _context.t1 = _context.sent;

                          _context.t0.send.call(_context.t0, _context.t1);

                          _context.next = 25;
                          break;

                        case 22:
                          _context.prev = 22;
                          _context.t2 = _context["catch"](9);
                          res.status(404).json({
                            error: true,
                            message: 'Error Loading Image'
                          });

                        case 25:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, null, [[9, 22]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL0ltYWdlUm91dGVyLnRzIl0sIm5hbWVzIjpbInJvdXRlciIsIkltYWdlUm91dGVyIiwiZ2V0IiwicmVxIiwicmVzIiwianNvbiIsIm1lc3NhZ2UiLCJjaGVja1Rva2VuIiwiX25leHQiLCJVc2VyIiwiZmluZEJ5SWQiLCJ1c2VyIiwiaWQiLCJwYXNzd29yZCIsImVyciIsInN0YXR1cyIsInNlbmQiLCJsaW1pdGVyIiwid2luZG93TXMiLCJtYXgiLCJieXBhc3NJbWFnZUxpbWl0IiwidXNlIiwiY29uc29sZSIsImxvZyIsImltYWdlVVJMIiwicXVlcnkiLCJpbWdVcmwiLCJlcnJvciIsImppbXAiLCJyZWFkIiwiaW1nIiwic2V0IiwiaW52ZXJ0IiwiZ2V0QnVmZmVyQXN5bmMiLCJibHVyQW1vdW50IiwiYmx1ciIsImdyYXlzY2FsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsTUFBTSxHQUFHLHNCQUFmOztJQUVNQyxXLEdBQ0YsdUJBQWM7QUFBQTs7QUFDVkQsRUFBQUEsTUFBTSxDQUFDRSxHQUFQLENBQVcsR0FBWCxFQUFnQixVQUFDQyxHQUFELEVBQWVDLEdBQWYsRUFBaUM7QUFDN0NBLElBQUFBLEdBQUcsQ0FBQ0MsSUFBSixDQUFTO0FBQUVDLE1BQUFBLE9BQU8sRUFBRTtBQUFYLEtBQVQ7QUFDSCxHQUZELEVBRFUsQ0FLVjs7QUFDQU4sRUFBQUEsTUFBTSxDQUFDRSxHQUFQLENBQVcsU0FBWCxFQUFzQkssc0JBQXRCO0FBQUEsdUVBQWtDLGtCQUFPSixHQUFQLEVBQXFCQyxHQUFyQixFQUFvQ0ksS0FBcEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUM5QjtBQUNBO0FBQ0FDLGdDQUFLQyxRQUFMLENBQWNQLEdBQUcsQ0FBQ1EsSUFBSixDQUFTQyxFQUF2QixFQUEyQjtBQUFFQyxnQkFBQUEsUUFBUSxFQUFFO0FBQVosZUFB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LFFBQVYsQ0FOaUI7O0FBQUE7QUFNN0JNLGNBQUFBLEdBTjZCO0FBTzdCMUIsY0FBQUEsR0FBRyxDQUFDMkIsR0FBSixDQUFRO0FBQUUsZ0NBQWdCO0FBQWxCLGVBQVI7QUFDQUQsY0FBQUEsR0FBRyxDQUFDTSxTQUFKO0FBUjZCLDZCQVM3QmhDLEdBQUcsQ0FBQ1csTUFBSixDQUFXLEdBQVgsQ0FUNkI7QUFBQTtBQUFBLHFCQVNGZSxHQUFHLENBQUNHLGNBQUosQ0FBbUIsV0FBbkIsQ0FURTs7QUFBQTtBQUFBOztBQUFBLDJCQVNiakIsSUFUYTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQVc3QlosY0FBQUEsR0FBRyxDQUFDVyxNQUFKLENBQVcsR0FBWCxFQUFnQlYsSUFBaEIsQ0FBcUI7QUFBRXNCLGdCQUFBQSxLQUFLLEVBQUUsSUFBVDtBQUFlckIsZ0JBQUFBLE9BQU8sRUFBRTtBQUF4QixlQUFyQjs7QUFYNkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBckM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFlSCxDOztBQUdMLElBQUlMLFdBQUo7ZUFFZUQsTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRGdW5jdGlvbiwgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCBqaW1wIGZyb20gXCJqaW1wXCI7XG5pbXBvcnQgY2hlY2tUb2tlbiBmcm9tIFwiLi4vUm91dGVyRnVuY3Rpb25zL2NoZWNrVG9rZW5cIjtcbmltcG9ydCBVc2VyIGZyb20gXCIuLi8uLi9tb2RlbHMvVXNlcnNcIjtcbmltcG9ydCByYXRlTGltaXQgZnJvbSBcImV4cHJlc3MtcmF0ZS1saW1pdFwiO1xuXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxuY2xhc3MgSW1hZ2VSb3V0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICByb3V0ZXIuZ2V0KCcvJywgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgcmVzLmpzb24oeyBtZXNzYWdlOiAnSGVsbG8gV29ybGQnIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgICAgIHJvdXRlci5nZXQoJy9pbnZlcnQnLCBjaGVja1Rva2VuLCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBfbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBVc2VyLmZpbmRCeUlkKHJlcS51c2VyLmlkLCB7IHBhc3N3b3JkOiAwIH0sIGFzeW5jIChlcnIsIHVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gcmVzLnN0YXR1cyg1MDApLnNlbmQoXCJUaGVyZSB3YXMgYSBwcm9ibGVtIGZpbmRpbmcgdGhlIHVzZXIuXCIpO1xuICAgICAgICAgICAgICAgIGlmICghdXNlcikgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5zZW5kKFwiTm8gdXNlciB3YXMgZm91bmQuXCIpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbGltaXRlciA9IHJhdGVMaW1pdCh7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd01zOiAxNSAqIDYwICogMTAwMCwgXG4gICAgICAgICAgICAgICAgICAgIG1heDogNSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJZb3UgYXJlIGJlaW5nIHJhdGUgbGltaXRlZCFcIlxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKCF1c2VyLmJ5cGFzc0ltYWdlTGltaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcm91dGVyLnVzZShsaW1pdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codXNlcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgaW1hZ2VVUkwgPSByZXEucXVlcnkuaW1nVXJsO1xuICAgICAgICAgICAgICAgIGlmICghaW1hZ2VVUkwpIHJldHVybiByZXMuanNvbih7IGVycm9yOiB0cnVlLCBtZXNzYWdlOiAnTm8gSW1hZ2UgVVJMJyB9KTtcbiAgICBcbiAgICAgICAgICAgICAgICBsZXQgaW1nO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGltZyA9IGF3YWl0IGppbXAucmVhZChpbWFnZVVSTCBhcyBuZXZlcik7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zZXQoeyAnQ29udGVudC1UeXBlJzogJ2ltYWdlL3BuZycgfSk7XG4gICAgICAgICAgICAgICAgICAgIGltZy5pbnZlcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoYXdhaXQgaW1nLmdldEJ1ZmZlckFzeW5jKCdpbWFnZS9wbmcnKSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgZXJyb3I6IHRydWUsIG1lc3NhZ2U6ICdFcnJvciBMb2FkaW5nIEltYWdlJyB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgICAgIHJvdXRlci5nZXQoJy9ibHVyJywgY2hlY2tUb2tlbiwgYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgX25leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VVUkwgPSByZXEucXVlcnkuaW1nVXJsO1xuICAgICAgICAgICAgbGV0IGJsdXJBbW91bnQ6IHVua25vd24gPSByZXEucXVlcnkuYmx1ckFtb3VudDtcbiAgICAgICAgICAgIGlmICghYmx1ckFtb3VudCkgYmx1ckFtb3VudCA9IDQ7XG4gICAgICAgICAgICBpZiAoIWltYWdlVVJMKSByZXR1cm4gcmVzLmpzb24oeyBlcnJvcjogdHJ1ZSwgbWVzc2FnZTogJ05vIEltYWdlIFVSTCcgfSk7XG5cbiAgICAgICAgICAgIGxldCBpbWc7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGltZyA9IGF3YWl0IGppbXAucmVhZChpbWFnZVVSTCBhcyBuZXZlcik7XG4gICAgICAgICAgICAgICAgcmVzLnNldCh7ICdDb250ZW50LVR5cGUnOiAnaW1hZ2UvcG5nJyB9KTtcbiAgICAgICAgICAgICAgICBpbWcuYmx1cihibHVyQW1vdW50IGFzIG5ldmVyKTtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChhd2FpdCBpbWcuZ2V0QnVmZmVyQXN5bmMoJ2ltYWdlL3BuZycpKTtcbiAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IHRydWUsIG1lc3NhZ2U6ICdFcnJvciBMb2FkaW5nIEltYWdlJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgICByb3V0ZXIuZ2V0KCcvZ3JheXNjYWxlJywgY2hlY2tUb2tlbiwgYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgX25leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VVUkwgPSByZXEucXVlcnkuaW1nVXJsO1xuICAgICAgICAgICAgaWYgKCFpbWFnZVVSTCkgcmV0dXJuIHJlcy5qc29uKHsgZXJyb3I6IHRydWUsIG1lc3NhZ2U6ICdObyBJbWFnZSBVUkwnIH0pO1xuXG4gICAgICAgICAgICBsZXQgaW1nO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpbWcgPSBhd2FpdCBqaW1wLnJlYWQoaW1hZ2VVUkwgYXMgbmV2ZXIpO1xuICAgICAgICAgICAgICAgIHJlcy5zZXQoeyAnQ29udGVudC1UeXBlJzogJ2ltYWdlL3BuZycgfSk7XG4gICAgICAgICAgICAgICAgaW1nLmdyYXlzY2FsZSgpO1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKGF3YWl0IGltZy5nZXRCdWZmZXJBc3luYygnaW1hZ2UvcG5nJykpO1xuICAgICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogdHJ1ZSwgbWVzc2FnZTogJ0Vycm9yIExvYWRpbmcgSW1hZ2UnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH1cbn1cblxubmV3IEltYWdlUm91dGVyKClcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyOyJdfQ==