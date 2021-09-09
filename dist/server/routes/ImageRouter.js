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

var path = "/image";
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
  router.use(limiter); // eslint-disable-next-line @typescript-eslint/no-unused-vars

  router.get('/invert', _checkToken["default"], /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, _next) {
      var imageURL, img;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              imageURL = req.query.imgUrl;

              if (imageURL) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.json({
                error: true,
                message: 'No Image URL'
              }));

            case 3:
              _context.prev = 3;
              _context.next = 6;
              return _jimp["default"].read(imageURL);

            case 6:
              img = _context.sent;
              res.set({
                'Content-Type': 'image/png'
              });
              img.invert();
              _context.t0 = res.status(200);
              _context.next = 12;
              return img.getBufferAsync('image/png');

            case 12:
              _context.t1 = _context.sent;

              _context.t0.send.call(_context.t0, _context.t1);

              _context.next = 19;
              break;

            case 16:
              _context.prev = 16;
              _context.t2 = _context["catch"](3);
              res.status(404).json({
                error: true,
                message: 'Error Loading Image'
              });

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 16]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }()); // eslint-disable-next-line @typescript-eslint/no-unused-vars

  router.get('/blur', _checkToken["default"], /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, _next) {
      var imageURL, blurAmount, img;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              imageURL = req.query.imgUrl;
              blurAmount = req.query.blurAmount;
              if (!blurAmount) blurAmount = 4;

              if (imageURL) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", res.json({
                error: true,
                message: 'No Image URL'
              }));

            case 5:
              _context2.prev = 5;
              _context2.next = 8;
              return _jimp["default"].read(imageURL);

            case 8:
              img = _context2.sent;
              res.set({
                'Content-Type': 'image/png'
              });
              img.blur(blurAmount);
              _context2.t0 = res.status(200);
              _context2.next = 14;
              return img.getBufferAsync('image/png');

            case 14:
              _context2.t1 = _context2.sent;

              _context2.t0.send.call(_context2.t0, _context2.t1);

              _context2.next = 21;
              break;

            case 18:
              _context2.prev = 18;
              _context2.t2 = _context2["catch"](5);
              res.status(400).json({
                error: true,
                message: 'Error Loading Image'
              });

            case 21:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[5, 18]]);
    }));

    return function (_x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  }()); // eslint-disable-next-line @typescript-eslint/no-unused-vars

  router.get('/grayscale', _checkToken["default"], /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, _next) {
      var imageURL, img;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              imageURL = req.query.imgUrl;

              if (imageURL) {
                _context3.next = 3;
                break;
              }

              return _context3.abrupt("return", res.json({
                error: true,
                message: "No Image URL"
              }));

            case 3:
              _context3.prev = 3;
              _context3.next = 6;
              return _jimp["default"].read(imageURL);

            case 6:
              img = _context3.sent;
              res.set({
                'Content-Type': 'image/png'
              });
              img.grayscale();
              _context3.t0 = res.status(200);
              _context3.next = 12;
              return img.getBufferAsync('image/png');

            case 12:
              _context3.t1 = _context3.sent;

              _context3.t0.send.call(_context3.t0, _context3.t1);

              _context3.next = 19;
              break;

            case 16:
              _context3.prev = 16;
              _context3.t2 = _context3["catch"](3);
              res.status(400).json({
                error: true,
                message: 'Error Loading Image'
              });

            case 19:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[3, 16]]);
    }));

    return function (_x7, _x8, _x9) {
      return _ref3.apply(this, arguments);
    };
  }());
};

new ImageRouter();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL0ltYWdlUm91dGVyLnRzIl0sIm5hbWVzIjpbInBhdGgiLCJyb3V0ZXIiLCJJbWFnZVJvdXRlciIsImxpbWl0ZXIiLCJ3aW5kb3dNcyIsIm1heCIsIm1lc3NhZ2UiLCJ1c2UiLCJnZXQiLCJjaGVja1Rva2VuIiwicmVxIiwicmVzIiwiX25leHQiLCJpbWFnZVVSTCIsInF1ZXJ5IiwiaW1nVXJsIiwianNvbiIsImVycm9yIiwiamltcCIsInJlYWQiLCJpbWciLCJzZXQiLCJpbnZlcnQiLCJzdGF0dXMiLCJnZXRCdWZmZXJBc3luYyIsInNlbmQiLCJibHVyQW1vdW50IiwiYmx1ciIsImdyYXlzY2FsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0FBRU8sSUFBTUEsSUFBSSxHQUFHLFFBQWI7O0FBQ0EsSUFBTUMsTUFBTSxHQUFHLHNCQUFmOzs7SUFFREMsVyxHQUNGLHVCQUFjO0FBQUE7O0FBRVY7QUFDQSxNQUFNQyxPQUFPLEdBQUcsa0NBQVU7QUFDdEJDLElBQUFBLFFBQVEsRUFBRSxLQUFLLEVBQUwsR0FBVSxJQURFO0FBRXRCQyxJQUFBQSxHQUFHLEVBQUUsR0FGaUI7QUFHdEJDLElBQUFBLE9BQU8sRUFBRTtBQUhhLEdBQVYsQ0FBaEI7QUFNQUwsRUFBQUEsTUFBTSxDQUFDTSxHQUFQLENBQVdKLE9BQVgsRUFUVSxDQVdWOztBQUNBRixFQUFBQSxNQUFNLENBQUNPLEdBQVAsQ0FBVyxTQUFYLEVBQXNCQyxzQkFBdEI7QUFBQSx1RUFBa0MsaUJBQU9DLEdBQVAsRUFBcUJDLEdBQXJCLEVBQW9DQyxLQUFwQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDeEJDLGNBQUFBLFFBRHdCLEdBQ2JILEdBQUcsQ0FBQ0ksS0FBSixDQUFVQyxNQURHOztBQUFBLGtCQUV6QkYsUUFGeUI7QUFBQTtBQUFBO0FBQUE7O0FBQUEsK0NBRVJGLEdBQUcsQ0FBQ0ssSUFB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RSxJQURvQjtBQUUzQlgsZ0JBQUFBLE9BQU8sRUFBRTtBQUZrQixlQUFULENBSFc7O0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBU1hZLGlCQUFLQyxJQUFMLENBQVVOLFFBQVYsQ0FUVzs7QUFBQTtBQVN2Qk8sY0FBQUEsR0FUdUI7QUFVN0JULGNBQUFBLEdBQUcsQ0FBQ1UsR0FBSixDQUFRO0FBQUUsZ0NBQWdCO0FBQWxCLGVBQVI7QUFDQUQsY0FBQUEsR0FBRyxDQUFDUSxTQUFKO0FBWDZCLDZCQVk3QmpCLEdBQUcsQ0FBQ1ksTUFBSixDQUFXLEdBQVgsQ0FaNkI7QUFBQTtBQUFBLHFCQWFiSCxHQUFHLENBQUNJLGNBQUosQ0FBbUIsV0FBbkIsQ0FiYTs7QUFBQTtBQUFBOztBQUFBLDJCQWF4QkMsSUFid0I7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFlN0JkLGNBQUFBLEdBQUcsQ0FBQ1ksTUFBSixDQUFXLEdBQVgsRUFDS1AsSUFETCxDQUNVO0FBQUVDLGdCQUFBQSxLQUFLLEVBQUUsSUFBVDtBQUFlWCxnQkFBQUEsT0FBTyxFQUFFO0FBQXhCLGVBRFY7O0FBZjZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQXJDOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBb0JILEM7O0FBR0wsSUFBSUosV0FBSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRGdW5jdGlvbiwgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCBqaW1wIGZyb20gXCJqaW1wXCI7XG5pbXBvcnQgY2hlY2tUb2tlbiBmcm9tIFwiLi4vZnVuY3Rpb25zL2NoZWNrVG9rZW5cIjtcbmltcG9ydCByYXRlTGltaXQgZnJvbSBcImV4cHJlc3MtcmF0ZS1saW1pdFwiO1xuXG5leHBvcnQgY29uc3QgcGF0aCA9IFwiL2ltYWdlXCI7XG5leHBvcnQgY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbmNsYXNzIEltYWdlUm91dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICAvLyBCYXNpYyBMaW1pdGVyLCBXaWxsIGJlIHVwZHJhZGVkIHNvb24hXG4gICAgICAgIGNvbnN0IGxpbWl0ZXIgPSByYXRlTGltaXQoe1xuICAgICAgICAgICAgd2luZG93TXM6IDE1ICogNjAgKiAxMDAwLCBcbiAgICAgICAgICAgIG1heDogMjAwLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJZb3UgYXJlIGJlaW5nIHJhdGUgbGltaXRlZCFcIlxuICAgICAgICB9KTtcblxuICAgICAgICByb3V0ZXIudXNlKGxpbWl0ZXIpO1xuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICAgICAgcm91dGVyLmdldCgnL2ludmVydCcsIGNoZWNrVG9rZW4sIGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIF9uZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGltYWdlVVJMID0gcmVxLnF1ZXJ5LmltZ1VybDtcbiAgICAgICAgICAgIGlmICghaW1hZ2VVUkwpIHJldHVybiByZXMuanNvbih7IGVycm9yOiB0cnVlLCBtZXNzYWdlOiAnTm8gSW1hZ2UgVVJMJyB9KTtcblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBhd2FpdCBqaW1wLnJlYWQoaW1hZ2VVUkwgYXMgbmV2ZXIpO1xuICAgICAgICAgICAgICAgIHJlcy5zZXQoeyAnQ29udGVudC1UeXBlJzogJ2ltYWdlL3BuZycgfSk7XG4gICAgICAgICAgICAgICAgaW1nLmludmVydCgpO1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKGF3YWl0IGltZy5nZXRCdWZmZXJBc3luYygnaW1hZ2UvcG5nJykpO1xuICAgICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBlcnJvcjogdHJ1ZSwgbWVzc2FnZTogJ0Vycm9yIExvYWRpbmcgSW1hZ2UnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgICAgIHJvdXRlci5nZXQoJy9ibHVyJywgY2hlY2tUb2tlbiwgYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgX25leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VVUkwgPSByZXEucXVlcnkuaW1nVXJsO1xuICAgICAgICAgICAgbGV0IGJsdXJBbW91bnQ6IHVua25vd24gPSByZXEucXVlcnkuYmx1ckFtb3VudDtcbiAgICAgICAgICAgIGlmICghYmx1ckFtb3VudCkgYmx1ckFtb3VudCA9IDQ7XG4gICAgICAgICAgICBpZiAoIWltYWdlVVJMKSByZXR1cm4gcmVzLmpzb24oeyBlcnJvcjogdHJ1ZSwgbWVzc2FnZTogJ05vIEltYWdlIFVSTCcgfSk7XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW1nID0gYXdhaXQgamltcC5yZWFkKGltYWdlVVJMIGFzIG5ldmVyKTtcbiAgICAgICAgICAgICAgICByZXMuc2V0KHsgJ0NvbnRlbnQtVHlwZSc6ICdpbWFnZS9wbmcnIH0pO1xuICAgICAgICAgICAgICAgIGltZy5ibHVyKGJsdXJBbW91bnQgYXMgbmV2ZXIpO1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKGF3YWl0IGltZy5nZXRCdWZmZXJBc3luYygnaW1hZ2UvcG5nJykpO1xuICAgICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogdHJ1ZSwgbWVzc2FnZTogJ0Vycm9yIExvYWRpbmcgSW1hZ2UnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgICAgIHJvdXRlci5nZXQoJy9ncmF5c2NhbGUnLCBjaGVja1Rva2VuLCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBfbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbWFnZVVSTCA9IHJlcS5xdWVyeS5pbWdVcmw7XG5cbiAgICAgICAgICAgIGlmICghaW1hZ2VVUkwpIHJldHVybiByZXMuanNvbih7IFxuICAgICAgICAgICAgICAgIGVycm9yOiB0cnVlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiTm8gSW1hZ2UgVVJMXCJcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IGF3YWl0IGppbXAucmVhZChpbWFnZVVSTCBhcyBzdHJpbmcpO1xuICAgICAgICAgICAgICAgIHJlcy5zZXQoeyAnQ29udGVudC1UeXBlJzogJ2ltYWdlL3BuZycgfSk7XG4gICAgICAgICAgICAgICAgaW1nLmdyYXlzY2FsZSgpO1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKVxuICAgICAgICAgICAgICAgICAgICAuc2VuZChhd2FpdCBpbWcuZ2V0QnVmZmVyQXN5bmMoJ2ltYWdlL3BuZycpKTtcbiAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKVxuICAgICAgICAgICAgICAgICAgICAuanNvbih7IGVycm9yOiB0cnVlLCBtZXNzYWdlOiAnRXJyb3IgTG9hZGluZyBJbWFnZScgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxufVxuXG5uZXcgSW1hZ2VSb3V0ZXIoKTsiXX0=