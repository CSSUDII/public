"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _jimp = _interopRequireDefault(require("jimp"));

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
  });
  router.get('/invert', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
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

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  router.get('/blur', /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
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

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
  router.get('/grayscale', /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
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
                message: 'No Image URL'
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

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};

new ImageRouter();
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL0ltYWdlUm91dGVyLnRzIl0sIm5hbWVzIjpbInJvdXRlciIsIkltYWdlUm91dGVyIiwiZ2V0IiwicmVxIiwicmVzIiwianNvbiIsIm1lc3NhZ2UiLCJpbWFnZVVSTCIsInF1ZXJ5IiwiaW1nVXJsIiwiZXJyb3IiLCJqaW1wIiwicmVhZCIsImltZyIsInNldCIsImludmVydCIsInN0YXR1cyIsImdldEJ1ZmZlckFzeW5jIiwic2VuZCIsImJsdXJBbW91bnQiLCJibHVyIiwiZ3JheXNjYWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxNQUFNLEdBQUcsc0JBQWY7O0lBRU1DLFcsR0FDRix1QkFBYztBQUFBOztBQUNWRCxFQUFBQSxNQUFNLENBQUNFLEdBQVAsQ0FBVyxHQUFYLEVBQWdCLFVBQUNDLEdBQUQsRUFBZUMsR0FBZixFQUFpQztBQUM3Q0EsSUFBQUEsR0FBRyxDQUFDQyxJQUFKLENBQVM7QUFBRUMsTUFBQUEsT0FBTyxFQUFFO0FBQVgsS0FBVDtBQUNILEdBRkQ7QUFJQU4sRUFBQUEsTUFBTSxDQUFDRSxHQUFQLENBQVcsU0FBWDtBQUFBLHVFQUFzQixpQkFBT0MsR0FBUCxFQUFxQkMsR0FBckI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1pHLGNBQUFBLFFBRFksR0FDREosR0FBRyxDQUFDSyxLQUFKLENBQVVDLE1BRFQ7O0FBQUEsa0JBRWJGLFFBRmE7QUFBQTtBQUFBO0FBQUE7O0FBQUEsK0NBRUlILEdBQUcsQ0FBQ0MsSUFBSixDQUFTO0FBQUVLLGdCQUFBQSxLQUFLLEVBQUUsSUFBVDtBQUFlSixnQkFBQUEsT0FBTyxFQUFFO0FBQXhCLGVBQVQsQ0FGSjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFNRkssaUJBQUtDLElBQUwsQ0FBVUwsUUFBVixDQU5FOztBQUFBO0FBTWRNLGNBQUFBLEdBTmM7QUFPZFQsY0FBQUEsR0FBRyxDQUFDVSxH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LENBQUNJLGNBQUosQ0FBbUIsV0FBbkIsQ0FUVjs7QUFBQTtBQUFBOztBQUFBLDJCQVNEQyxJQVRDOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBV2pCZCxjQUFBQSxHQUFHLENBQUNZLE1BQUosQ0FBVyxHQUFYLEVBQWdCWCxJQUFoQixDQUFxQjtBQUFFSyxnQkFBQUEsS0FBSyxFQUFFLElBQVQ7QUFBZUosZ0JBQUFBLE9BQU8sRUFBRTtBQUF4QixlQUFyQjs7QUFYaUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBekI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFlSCxDOztBQUdMLElBQUlMLFdBQUo7ZUFFZUQsTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgamltcCBmcm9tIFwiamltcFwiO1xuXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxuY2xhc3MgSW1hZ2VSb3V0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICByb3V0ZXIuZ2V0KCcvJywgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgcmVzLmpzb24oeyBtZXNzYWdlOiAnSGVsbG8gV29ybGQnIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByb3V0ZXIuZ2V0KCcvaW52ZXJ0JywgYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VVUkwgPSByZXEucXVlcnkuaW1nVXJsO1xuICAgICAgICAgICAgaWYgKCFpbWFnZVVSTCkgcmV0dXJuIHJlcy5qc29uKHsgZXJyb3I6IHRydWUsIG1lc3NhZ2U6ICdObyBJbWFnZSBVUkwnIH0pO1xuXG4gICAgICAgICAgICBsZXQgaW1nO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpbWcgPSBhd2FpdCBqaW1wLnJlYWQoaW1hZ2VVUkwgYXMgbmV2ZXIpO1xuICAgICAgICAgICAgICAgIHJlcy5zZXQoeyAnQ29udGVudC1UeXBlJzogJ2ltYWdlL3BuZycgfSk7XG4gICAgICAgICAgICAgICAgaW1nLmludmVydCgpO1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKGF3YWl0IGltZy5nZXRCdWZmZXJBc3luYygnaW1hZ2UvcG5nJykpO1xuICAgICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBlcnJvcjogdHJ1ZSwgbWVzc2FnZTogJ0Vycm9yIExvYWRpbmcgSW1hZ2UnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByb3V0ZXIuZ2V0KCcvYmx1cicsIGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGltYWdlVVJMID0gcmVxLnF1ZXJ5LmltZ1VybDtcbiAgICAgICAgICAgIGxldCBibHVyQW1vdW50OiB1bmtub3duID0gcmVxLnF1ZXJ5LmJsdXJBbW91bnQ7XG4gICAgICAgICAgICBpZiAoIWJsdXJBbW91bnQpIGJsdXJBbW91bnQgPSA0O1xuICAgICAgICAgICAgaWYgKCFpbWFnZVVSTCkgcmV0dXJuIHJlcy5qc29uKHsgZXJyb3I6IHRydWUsIG1lc3NhZ2U6ICdObyBJbWFnZSBVUkwnIH0pO1xuXG4gICAgICAgICAgICBsZXQgaW1nO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpbWcgPSBhd2FpdCBqaW1wLnJlYWQoaW1hZ2VVUkwgYXMgbmV2ZXIpO1xuICAgICAgICAgICAgICAgIHJlcy5zZXQoeyAnQ29udGVudC1UeXBlJzogJ2ltYWdlL3BuZycgfSk7XG4gICAgICAgICAgICAgICAgaW1nLmJsdXIoYmx1ckFtb3VudCBhcyBuZXZlcik7XG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoYXdhaXQgaW1nLmdldEJ1ZmZlckFzeW5jKCdpbWFnZS9wbmcnKSk7XG4gICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiB0cnVlLCBtZXNzYWdlOiAnRXJyb3IgTG9hZGluZyBJbWFnZScgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJvdXRlci5nZXQoJy9ncmF5c2NhbGUnLCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbWFnZVVSTCA9IHJlcS5xdWVyeS5pbWdVcmw7XG4gICAgICAgICAgICBpZiAoIWltYWdlVVJMKSByZXR1cm4gcmVzLmpzb24oeyBlcnJvcjogdHJ1ZSwgbWVzc2FnZTogJ05vIEltYWdlIFVSTCcgfSk7XG5cbiAgICAgICAgICAgIGxldCBpbWc7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGltZyA9IGF3YWl0IGppbXAucmVhZChpbWFnZVVSTCBhcyBuZXZlcik7XG4gICAgICAgICAgICAgICAgcmVzLnNldCh7ICdDb250ZW50LVR5cGUnOiAnaW1hZ2UvcG5nJyB9KTtcbiAgICAgICAgICAgICAgICBpbWcuZ3JheXNjYWxlKCk7XG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoYXdhaXQgaW1nLmdldEJ1ZmZlckFzeW5jKCdpbWFnZS9wbmcnKSk7XG4gICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiB0cnVlLCBtZXNzYWdlOiAnRXJyb3IgTG9hZGluZyBJbWFnZScgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxufVxuXG5uZXcgSW1hZ2VSb3V0ZXIoKVxuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7Il19