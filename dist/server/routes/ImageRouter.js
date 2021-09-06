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

  // Basic Limiter, Will be updraded soon!
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL0ltYWdlUm91dGVyLnRzIl0sIm5hbWVzIjpbInJvdXRlciIsIkltYWdlUm91dGVyIiwibGltaXRlciIsIndpbmRvd01zIiwibWF4IiwibWVzc2FnZSIsInVzZSIsImdldCIsImNoZWNrVG9rZW4iLCJyZXEiLCJyZXMiLCJfbmV4dCIsIlVzZXIiLCJmaW5kQnlJZCIsInVzZXIiLCJpZCIsInBhc3N3b3JkIiwiZXJyIiwic3RhdHVzIiwic2VuZCIsImJ5cGFzc0ltYWdlTGltaXQiLCJpbWFnZVVSTCIsInF1ZXJ5IiwiaW1nVXJsIiwianNvbiIsImVycm9yIiwiamltcCIsInJlYWQiLCJpbWciLCJzZXQiLCJpbnZlcnQiLCJnZXRCdWZmZXJBc3luYyIsImJsdXJBbW91bnQiLCJibHVyIiwiZ3JheXNjYWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxNQUFNLEdBQUcsc0JBQWY7O0lBRU1DLFcsR0FDRix1QkFBYztBQUFBOztBQUVWO0FBQ0EsTUFBTUMsT0FBTyxHQUFHLGtDQUFVO0FBQ3RCQyxJQUFBQSxRQUFRLEVBQUUsS0FBSyxFQUFMLEdBQVUsSUFERTtBQUV0QkMsSUFBQUEsR0FBRyxFQUFFLEdBRmlCO0FBR3RCQyxJQUFBQSxPQUFPLEVBQUU7QUFIYSxHQUFWLENBQWhCO0FBTUFMLEVBQUFBLE1BQU0sQ0FBQ00sR0FBUCxDQUFXSixPQUFYLEVBVFUsQ0FXVjs7QUFDQUYsRUFBQUEsTUFBTSxDQUFDTyxHQUFQLENBQVcsU0FBWCxFQUFzQkMsc0JBQXRCO0FBQUEsdUVBQWtDLGtCQUFPQyxHQUFQLEVBQXFCQyxHQUFyQixFQUFvQ0MsS0FBcEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUM5QjtBQUNBO0FBQ0FDLGdDQUFLQyxRQUFMLENBQWNKLEdBQUcsQ0FBQ0ssSUFBSixDQUFTQyxFQUF2QixFQUEyQjtBQUFFQyxnQkFBQUEs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bkIsQ0FURTs7QUFBQTtBQUFBOztBQUFBLDJCQVNiWixJQVRhOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBVzdCVCxjQUFBQSxHQUFHLENBQUNRLE1BQUosQ0FBVyxHQUFYLEVBQWdCTSxJQUFoQixDQUFxQjtBQUFFQyxnQkFBQUEsS0FBSyxFQUFFLElBQVQ7QUFBZXBCLGdCQUFBQSxPQUFPLEVBQUU7QUFBeEIsZUFBckI7O0FBWDZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQXJDOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBZUgsQzs7QUFHTCxJQUFJSixXQUFKO2VBRWVELE0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0RnVuY3Rpb24sIFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgamltcCBmcm9tIFwiamltcFwiO1xuaW1wb3J0IGNoZWNrVG9rZW4gZnJvbSBcIi4uL1JvdXRlckZ1bmN0aW9ucy9jaGVja1Rva2VuXCI7XG5pbXBvcnQgVXNlciBmcm9tIFwiLi4vLi4vbW9kZWxzL1VzZXJzXCI7XG5pbXBvcnQgcmF0ZUxpbWl0IGZyb20gXCJleHByZXNzLXJhdGUtbGltaXRcIjtcblxuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbmNsYXNzIEltYWdlUm91dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICAvLyBCYXNpYyBMaW1pdGVyLCBXaWxsIGJlIHVwZHJhZGVkIHNvb24hXG4gICAgICAgIGNvbnN0IGxpbWl0ZXIgPSByYXRlTGltaXQoe1xuICAgICAgICAgICAgd2luZG93TXM6IDE1ICogNjAgKiAxMDAwLCBcbiAgICAgICAgICAgIG1heDogMjAwLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJZb3UgYXJlIGJlaW5nIHJhdGUgbGltaXRlZCFcIlxuICAgICAgICB9KTtcblxuICAgICAgICByb3V0ZXIudXNlKGxpbWl0ZXIpO1xuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICAgICAgcm91dGVyLmdldCgnL2ludmVydCcsIGNoZWNrVG9rZW4sIGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIF9uZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnRcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIFVzZXIuZmluZEJ5SWQocmVxLnVzZXIuaWQsIHsgcGFzc3dvcmQ6IDAgfSwgYXN5bmMgKGVyciwgdXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiByZXMuc3RhdHVzKDUwMCkuc2VuZChcIlRoZXJlIHdhcyBhIHByb2JsZW0gZmluZGluZyB0aGUgdXNlci5cIik7XG4gICAgICAgICAgICAgICAgaWYgKCF1c2VyKSByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLnNlbmQoXCJObyB1c2VyIHdhcyBmb3VuZC5cIik7XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBCeXBhc3MgSW1hZ2UgTGltaXRcbiAgICAgICAgICAgICAgICAgKiBOb3QgSW5wbGFudGVkIFlldCFcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAodXNlci5ieXBhc3NJbWFnZUxpbWl0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENvZGUgaWYgdGhlIHVzZXIgY2FuIGJ5cGFzcyBJbWFnZSBSb3V0ZXIgUmFyZSBMaW1pdFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlVVJMID0gcmVxLnF1ZXJ5LmltZ1VybDtcbiAgICAgICAgICAgICAgICBpZiAoIWltYWdlVVJMKSByZXR1cm4gcmVzLmpzb24oeyBlcnJvcjogdHJ1ZSwgbWVzc2FnZTogJ05vIEltYWdlIFVSTCcgfSk7XG4gICAgXG4gICAgICAgICAgICAgICAgbGV0IGltZztcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpbWcgPSBhd2FpdCBqaW1wLnJlYWQoaW1hZ2VVUkwgYXMgbmV2ZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXMuc2V0KHsgJ0NvbnRlbnQtVHlwZSc6ICdpbWFnZS9wbmcnIH0pO1xuICAgICAgICAgICAgICAgICAgICBpbWcuaW52ZXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKGF3YWl0IGltZy5nZXRCdWZmZXJBc3luYygnaW1hZ2UvcG5nJykpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwNCkuanNvbih7IGVycm9yOiB0cnVlLCBtZXNzYWdlOiAnRXJyb3IgTG9hZGluZyBJbWFnZScgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgICByb3V0ZXIuZ2V0KCcvYmx1cicsIGNoZWNrVG9rZW4sIGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIF9uZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGltYWdlVVJMID0gcmVxLnF1ZXJ5LmltZ1VybDtcbiAgICAgICAgICAgIGxldCBibHVyQW1vdW50OiB1bmtub3duID0gcmVxLnF1ZXJ5LmJsdXJBbW91bnQ7XG4gICAgICAgICAgICBpZiAoIWJsdXJBbW91bnQpIGJsdXJBbW91bnQgPSA0O1xuICAgICAgICAgICAgaWYgKCFpbWFnZVVSTCkgcmV0dXJuIHJlcy5qc29uKHsgZXJyb3I6IHRydWUsIG1lc3NhZ2U6ICdObyBJbWFnZSBVUkwnIH0pO1xuXG4gICAgICAgICAgICBsZXQgaW1nO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpbWcgPSBhd2FpdCBqaW1wLnJlYWQoaW1hZ2VVUkwgYXMgbmV2ZXIpO1xuICAgICAgICAgICAgICAgIHJlcy5zZXQoeyAnQ29udGVudC1UeXBlJzogJ2ltYWdlL3BuZycgfSk7XG4gICAgICAgICAgICAgICAgaW1nLmJsdXIoYmx1ckFtb3VudCBhcyBuZXZlcik7XG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoYXdhaXQgaW1nLmdldEJ1ZmZlckFzeW5jKCdpbWFnZS9wbmcnKSk7XG4gICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiB0cnVlLCBtZXNzYWdlOiAnRXJyb3IgTG9hZGluZyBJbWFnZScgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICAgICAgcm91dGVyLmdldCgnL2dyYXlzY2FsZScsIGNoZWNrVG9rZW4sIGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIF9uZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGltYWdlVVJMID0gcmVxLnF1ZXJ5LmltZ1VybDtcbiAgICAgICAgICAgIGlmICghaW1hZ2VVUkwpIHJldHVybiByZXMuanNvbih7IGVycm9yOiB0cnVlLCBtZXNzYWdlOiAnTm8gSW1hZ2UgVVJMJyB9KTtcblxuICAgICAgICAgICAgbGV0IGltZztcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaW1nID0gYXdhaXQgamltcC5yZWFkKGltYWdlVVJMIGFzIG5ldmVyKTtcbiAgICAgICAgICAgICAgICByZXMuc2V0KHsgJ0NvbnRlbnQtVHlwZSc6ICdpbWFnZS9wbmcnIH0pO1xuICAgICAgICAgICAgICAgIGltZy5ncmF5c2NhbGUoKTtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChhd2FpdCBpbWcuZ2V0QnVmZmVyQXN5bmMoJ2ltYWdlL3BuZycpKTtcbiAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IHRydWUsIG1lc3NhZ2U6ICdFcnJvciBMb2FkaW5nIEltYWdlJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG59XG5cbm5ldyBJbWFnZVJvdXRlcigpXG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjsiXX0=