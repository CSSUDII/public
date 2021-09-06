"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _qrcode = _interopRequireDefault(require("qrcode"));

var _nodeCanvas = require("node-canvas");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var router = (0, _express.Router)();

var QRGenRouter = function QRGenRouter() {
  _classCallCheck(this, QRGenRouter);

  router.get('/:text', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var text, width, height, qr;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              text = req.params.text;
              width = parseInt(req.query.width) || 20;
              height = parseInt(req.query.height) || 20;

              if (text) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", res.json({
                error: true,
                message: 'No Input Text'
              }));

            case 5:
              res.setHeader('Content-type', 'image/png');
              _context.next = 8;
              return _qrcode["default"].toCanvas(new _nodeCanvas.Canvas(width, height, "image"), text);

            case 8:
              qr = _context.sent;
              qr.pngStream().pipe(res);

            case 10:
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
};

new QRGenRouter();
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL1FSR2VuUm91dGVyLnRzIl0sIm5hbWVzIjpbInJvdXRlciIsIlFSR2VuUm91dGVyIiwiZ2V0IiwicmVxIiwicmVzIiwidGV4dCIsInBhcmFtcyIsIndpZHRoIiwicGFyc2VJbnQiLCJxdWVyeSIsImhlaWdodCIsImpzb24iLCJlcnJvciIsIm1lc3NhZ2UiLCJzZXRIZWFkZXIiLCJRUkNvZGUiLCJ0b0NhbnZhcyIsIkNhbnZhcyIsInFyIiwicG5nU3RyZWFtIiwicGlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsTUFBTSxHQUFHLHNCQUFmOztJQUVNQyxXLEdBQ0YsdUJBQWM7QUFBQTs7QUFDVkQsRUFBQUEsTUFBTSxDQUFDRSxHQUFQLENBQVcsUUFBWDtBQUFBLHVFQUFxQixpQkFBT0MsR0FBUCxFQUFxQkMsR0FBckI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1hDLGNBQUFBLElBRFcsR0FDSUYsR0FBRyxDQUFDRyxNQUFKLENBQVdELElBRGY7QUFFWEUsY0FBQUEsS0FGVyxHQUVLQyxRQUFRLENBQUNMLEdBQUcsQ0FBQ00sS0FBSixDQUFVRixLQUFYLENBQVIsSUFBdUMsRUFGNUM7QUFHWEcsY0FBQUEsTUFIVyxHQUdNRixRQUFRLENBQUNMLEdBQUcsQ0FBQ00sS0FBSixDQUFVQyxNQUFYLENBQVIsSUFBd0MsRUFIOUM7O0FBQUEsa0JBS1pMLElBTFk7QUFBQTtBQUFBO0FBQUE7O0FBQUEsK0NBS0NELEdBQUcsQ0FBQ08sSUFBSixDQUFTO0FBQUVDLGdCQUFBQSxLQUFLLEVBQUUsSUFBVDtBQUFlQyxnQkFBQUEsT0FBTyxFQUFFO0FBQXhCLGVBQVQsQ0FMRDs7QUFBQTtBQU1qQlQsY0FBQUEsR0FBRyxDQUFDVSxTQUFKLENBQWMsY0FBZCxFQUE4QixXQUE5QjtBQU5pQjtBQUFBLHFCQVFBQyxtQkFBT0MsUUFBUCxDQUFnQixJQUFJQyxrQkFBSixDQUFXVixLQUFYLEVBQWtCRyxNQUFsQixFQUEwQixPQUExQixDQUFoQixFQUFvREwsSUFBcEQsQ0FSQTs7QUFBQTtBQVFYYSxjQUFBQSxFQVJXO0FBVWpCQSxjQUFBQSxFQUFFLENBQUNDLFNBQUgsR0FBZUMsSUFBZixDQUFvQmhCLEdBQXBCOztBQVZpQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFyQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVlILEM7O0FBR0wsSUFBSUgsV0FBSjtlQUVlRCxNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyLCBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgUVJDb2RlIGZyb20gXCJxcmNvZGVcIjtcbmltcG9ydCB7IENhbnZhcyB9IGZyb20gXCJub2RlLWNhbnZhc1wiO1xuXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxuY2xhc3MgUVJHZW5Sb3V0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICByb3V0ZXIuZ2V0KCcvOnRleHQnLCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZXh0OiBzdHJpbmcgPSByZXEucGFyYW1zLnRleHQ7XG4gICAgICAgICAgICBjb25zdCB3aWR0aDogbnVtYmVyID0gcGFyc2VJbnQocmVxLnF1ZXJ5LndpZHRoIGFzIHN0cmluZykgfHwgMjA7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQ6IG51bWJlciA9IHBhcnNlSW50KHJlcS5xdWVyeS5oZWlnaHQgYXMgc3RyaW5nKSB8fCAyMDtcblxuICAgICAgICAgICAgaWYgKCF0ZXh0KSByZXR1cm4gcmVzLmpzb24oeyBlcnJvcjogdHJ1ZSwgbWVzc2FnZTogJ05vIElucHV0IFRleHQnIH0pO1xuICAgICAgICAgICAgcmVzLnNldEhlYWRlcignQ29udGVudC10eXBlJywgJ2ltYWdlL3BuZycpO1xuXG4gICAgICAgICAgICBjb25zdCBxciA9IGF3YWl0IFFSQ29kZS50b0NhbnZhcyhuZXcgQ2FudmFzKHdpZHRoLCBoZWlnaHQsIFwiaW1hZ2VcIiksIHRleHQpO1xuXG4gICAgICAgICAgICBxci5wbmdTdHJlYW0oKS5waXBlKHJlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxubmV3IFFSR2VuUm91dGVyKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjsiXX0=