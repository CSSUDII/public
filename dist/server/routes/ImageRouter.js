"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = exports.path = void 0;

var _express = require("express");

var _jimp = _interopRequireDefault(require("jimp"));

var _checkToken = _interopRequireDefault(require("../functions/checkToken"));

var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var path = "/v1/image";
exports.path = path;
var router = (0, _express.Router)();
exports.router = router;

var ImageRouter = function ImageRouter() {
  _classCallCheck(this, ImageRouter);

  // Basic Limiter, Will be updraded soon!
  var limiter = (0, _expressRateLimit["default"])({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: "You are being rate limited!"
  });
  router.use(limiter);
  router.get("/", /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_req, res) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              res.header("ping", "true");
              return _context.abrupt("return", res.status(200).json({
                error: null,
                ping: true,
                result: null,
                message: "Image Router, Frontend coming soon!"
              }));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()); // eslint-disable-next-line @typescript-eslint/no-unused-vars

  router.get('/invert', _checkToken["default"], /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, _next) {
      var imageURL, img;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              imageURL = req.query.imgUrl;

              if (imageURL) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return", res.json({
                error: true,
                message: 'No Image URL'
              }));

            case 3:
              _context2.prev = 3;
              _context2.next = 6;
              return _jimp["default"].read(imageURL);

            case 6:
              img = _context2.sent;
              res.set({
                'Content-Type': 'image/png'
              });
              img.invert();
              _context2.t0 = res.status(200);
              _context2.next = 12;
              return img.getBufferAsync('image/png');

            case 12:
              _context2.t1 = _context2.sent;

              _context2.t0.send.call(_context2.t0, _context2.t1);

              _context2.next = 19;
              break;

            case 16:
              _context2.prev = 16;
              _context2.t2 = _context2["catch"](3);
              res.status(404).json({
                error: true,
                message: 'Error Loading Image'
              });

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[3, 16]]);
    }));

    return function (_x3, _x4, _x5) {
      return _ref2.apply(this, arguments);
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
                message: "No Image URL"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL0ltYWdlUm91dGVyLnRzIl0sIm5hbWVzIjpbInBhdGgiLCJyb3V0ZXIiLCJJbWFnZVJvdXRlciIsImxpbWl0ZXIiLCJ3aW5kb3dNcyIsIm1heCIsIm1lc3NhZ2UiLCJ1c2UiLCJnZXQiLCJfcmVxIiwicmVzIiwiaGVhZGVyIiwic3RhdHVzIiwianNvbiIsImVycm9yIiwicGluZyIsInJlc3VsdCIsImNoZWNrVG9rZW4iLCJyZXEiLCJfbmV4dCIsImltYWdlVVJMIiwicXVlcnkiLCJpbWdVcmwiLCJqaW1wIiwicmVhZCIsImltZyIsInNldCIsImludmVydCIsImdldEJ1ZmZlckFzeW5jIiwic2VuZCIsImJsdXJBbW91bnQiLCJibHVyIiwiZ3JheXNjYWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7QUFFTyxJQUFNQSxJQUFJLEdBQUcsV0FBYjs7QUFDQSxJQUFNQyxNQUFNLEdBQUcsc0JBQWY7OztJQUVEQyxXLEdBQ0YsdUJBQWM7QUFBQTs7QUFFVjtBQUNBLE1BQU1DLE9BQU8sR0FBRyxrQ0FBVTtBQUN0QkMsSUFBQUEsUUFBUSxFQUFFLEtBQUssRUFBTCxHQUFVLElBREU7QUFFdEJDLElBQUFBLEdBQUcsRUFBRSxHQUZpQjtBQUd0QkMsSUFBQUEsT0FBTyxFQUFFO0FBSGEsR0FBVixDQUFoQjtBQU1BTCxFQUFBQSxNQUFNLENBQUNNLEdBQVAsQ0FBV0osT0FBWDtBQUVBRixFQUFBQSxNQUFNLENBQUNPLEdBQVAsQ0FBVyxHQUFYO0FBQUEsdUVBQWdCLGlCQUFNQyxJQUFOLEVBQXFCQyxHQUFyQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1pBLGNBQUFBLEdBQUcsQ0FBQ0MsTUFBSixDQUFXLE1BQVgsRUFBbUIsTUFBbkI7QUFEWSwrQ0FFTEQsR0FBRyxDQUFDRSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFBRUMsZ0JBQUFBLEtBQUss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QSxPQUFPLEVBQUU7QUFBeEIsZUFEVjs7QUFmNkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBckM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFvQkgsQzs7QUFHTCxJQUFJSixXQUFKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEZ1bmN0aW9uLCBSb3V0ZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IGppbXAgZnJvbSBcImppbXBcIjtcbmltcG9ydCBjaGVja1Rva2VuIGZyb20gXCIuLi9mdW5jdGlvbnMvY2hlY2tUb2tlblwiO1xuaW1wb3J0IHJhdGVMaW1pdCBmcm9tIFwiZXhwcmVzcy1yYXRlLWxpbWl0XCI7XG5cbmV4cG9ydCBjb25zdCBwYXRoID0gXCIvdjEvaW1hZ2VcIjtcbmV4cG9ydCBjb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxuY2xhc3MgSW1hZ2VSb3V0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIC8vIEJhc2ljIExpbWl0ZXIsIFdpbGwgYmUgdXBkcmFkZWQgc29vbiFcbiAgICAgICAgY29uc3QgbGltaXRlciA9IHJhdGVMaW1pdCh7XG4gICAgICAgICAgICB3aW5kb3dNczogMTUgKiA2MCAqIDEwMDAsIFxuICAgICAgICAgICAgbWF4OiAyMDAsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIllvdSBhcmUgYmVpbmcgcmF0ZSBsaW1pdGVkIVwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJvdXRlci51c2UobGltaXRlcik7XG5cbiAgICAgICAgcm91dGVyLmdldChcIi9cIiwgYXN5bmMoX3JlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgcmVzLmhlYWRlcihcInBpbmdcIiwgXCJ0cnVlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgZXJyb3I6IG51bGwsIHBpbmc6IHRydWUsIHJlc3VsdDogbnVsbCwgbWVzc2FnZTogXCJJbWFnZSBSb3V0ZXIsIEZyb250ZW5kIGNvbWluZyBzb29uIVwiIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgICAgIHJvdXRlci5nZXQoJy9pbnZlcnQnLCBjaGVja1Rva2VuLCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBfbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbWFnZVVSTCA9IHJlcS5xdWVyeS5pbWdVcmw7XG4gICAgICAgICAgICBpZiAoIWltYWdlVVJMKSByZXR1cm4gcmVzLmpzb24oeyBlcnJvcjogdHJ1ZSwgbWVzc2FnZTogJ05vIEltYWdlIFVSTCcgfSk7XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW1nID0gYXdhaXQgamltcC5yZWFkKGltYWdlVVJMIGFzIG5ldmVyKTtcbiAgICAgICAgICAgICAgICByZXMuc2V0KHsgJ0NvbnRlbnQtVHlwZSc6ICdpbWFnZS9wbmcnIH0pO1xuICAgICAgICAgICAgICAgIGltZy5pbnZlcnQoKTtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChhd2FpdCBpbWcuZ2V0QnVmZmVyQXN5bmMoJ2ltYWdlL3BuZycpKTtcbiAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgZXJyb3I6IHRydWUsIG1lc3NhZ2U6ICdFcnJvciBMb2FkaW5nIEltYWdlJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgICByb3V0ZXIuZ2V0KCcvYmx1cicsIGNoZWNrVG9rZW4sIGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIF9uZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGltYWdlVVJMID0gcmVxLnF1ZXJ5LmltZ1VybDtcbiAgICAgICAgICAgIGxldCBibHVyQW1vdW50OiB1bmtub3duID0gcmVxLnF1ZXJ5LmJsdXJBbW91bnQ7XG4gICAgICAgICAgICBpZiAoIWJsdXJBbW91bnQpIGJsdXJBbW91bnQgPSA0O1xuICAgICAgICAgICAgaWYgKCFpbWFnZVVSTCkgcmV0dXJuIHJlcy5qc29uKHsgZXJyb3I6IHRydWUsIG1lc3NhZ2U6ICdObyBJbWFnZSBVUkwnIH0pO1xuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IGF3YWl0IGppbXAucmVhZChpbWFnZVVSTCBhcyBuZXZlcik7XG4gICAgICAgICAgICAgICAgcmVzLnNldCh7ICdDb250ZW50LVR5cGUnOiAnaW1hZ2UvcG5nJyB9KTtcbiAgICAgICAgICAgICAgICBpbWcuYmx1cihibHVyQW1vdW50IGFzIG5ldmVyKTtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChhd2FpdCBpbWcuZ2V0QnVmZmVyQXN5bmMoJ2ltYWdlL3BuZycpKTtcbiAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IHRydWUsIG1lc3NhZ2U6ICdFcnJvciBMb2FkaW5nIEltYWdlJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgICByb3V0ZXIuZ2V0KCcvZ3JheXNjYWxlJywgY2hlY2tUb2tlbiwgYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgX25leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VVUkwgPSByZXEucXVlcnkuaW1nVXJsO1xuXG4gICAgICAgICAgICBpZiAoIWltYWdlVVJMKSByZXR1cm4gcmVzLmpzb24oeyBcbiAgICAgICAgICAgICAgICBlcnJvcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIk5vIEltYWdlIFVSTFwiXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBhd2FpdCBqaW1wLnJlYWQoaW1hZ2VVUkwgYXMgc3RyaW5nKTtcbiAgICAgICAgICAgICAgICByZXMuc2V0KHsgJ0NvbnRlbnQtVHlwZSc6ICdpbWFnZS9wbmcnIH0pO1xuICAgICAgICAgICAgICAgIGltZy5ncmF5c2NhbGUoKTtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMClcbiAgICAgICAgICAgICAgICAgICAgLnNlbmQoYXdhaXQgaW1nLmdldEJ1ZmZlckFzeW5jKCdpbWFnZS9wbmcnKSk7XG4gICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMClcbiAgICAgICAgICAgICAgICAgICAgLmpzb24oeyBlcnJvcjogdHJ1ZSwgbWVzc2FnZTogJ0Vycm9yIExvYWRpbmcgSW1hZ2UnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH1cbn1cblxubmV3IEltYWdlUm91dGVyKCk7Il19