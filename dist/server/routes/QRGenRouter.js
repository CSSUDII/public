"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.path = exports.router = void 0;

var _express = require("express");

var _qrcode = _interopRequireDefault(require("qrcode"));

var _nodeCanvas = require("node-canvas");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var router = (0, _express.Router)();
exports.router = router;
var path = "/v1/qr";
exports.path = path;

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
                message: "No Input Text"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL1FSR2VuUm91dGVyLnRzIl0sIm5hbWVzIjpbInJvdXRlciIsInBhdGgiLCJRUkdlblJvdXRlciIsImdldCIsInJlcSIsInJlcyIsInRleHQiLCJwYXJhbXMiLCJ3aWR0aCIsInBhcnNlSW50IiwicXVlcnkiLCJoZWlnaHQiLCJqc29uIiwiZXJyb3IiLCJtZXNzYWdlIiwic2V0SGVhZGVyIiwiUVJDb2RlIiwidG9DYW52YXMiLCJDYW52YXMiLCJxciIsInBuZ1N0cmVhbSIsInBpcGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQUVPLElBQU1BLE1BQU0sR0FBRyxzQkFBZjs7QUFDQSxJQUFNQyxJQUFJLEdBQUcsUUFBYjs7O0lBRURDLFcsR0FDRix1QkFBYztBQUFBOztBQUNWRixFQUFBQSxNQUFNLENBQUNHLEdBQVAsQ0FBVyxRQUFYO0FBQUEsdUVBQXFCLGlCQUFPQyxHQUFQLEVBQXFCQyxHQUFyQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDWEMsY0FBQUEsSUFEVyxHQUNJRixHQUFHLENBQUNHLE1BQUosQ0FBV0QsSUFEZjtBQUVYRSxjQUFBQSxLQUZXLEdBRUtDLFFBQVEsQ0FBQ0wsR0FBRyxDQUFDTSxLQUFKLENBQVVGLEtBQVgsQ0FBUixJQUF1QyxFQUY1QztBQUdYRyxjQUFBQSxNQUhXLEdBR01GLFFBQVEsQ0FBQ0wsR0FBRyxDQUFDTSxLQUFKLENBQVVDLE1BQVgsQ0FBUixJQUF3QyxFQUg5Qzs7QUFBQSxrQkFLWkwsSUFMWTtBQUFBO0FBQUE7QUFBQTs7QUFBQSwrQ0FLQ0QsR0FBRyxDQUFDTyxJQUFKLENBQVM7QUFBRUMsZ0JBQUFBLEtBQUssRUFBRSxJQUFUO0FBQWVDLGdCQUFBQSxPQUFPLEVBQUU7QUFBeEIsZUFBVCxDQUxEOztBQUFBO0FBTWpCVCxjQUFBQSxHQUFHLENBQUNVLFNBQUosQ0FBYyxjQUFkLEVBQThCLFdBQTlCO0FBTmlCO0FBQUEscUJBUUFDLG1CQUFPQyxRQUFQLENBQWdCLElBQUlDLGtCQUFKLENBQVdWLEtBQVgsRUFBa0JHLE1BQWxCLEVBQTBCLE9BQTFCLENBQWhCLEVBQW9ETCxJQUFwRCxDQVJBOztBQUFBO0FBUVhhLGNBQUFBLEVBUlc7QUFVakJBLGNBQUFBLEVBQUUsQ0FBQ0MsU0FBSCxHQUFlQyxJQUFmLENBQW9CaEIsR0FBcEI7O0FBVmlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQXJCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBWUgsQzs7QUFHTCxJQUFJSCxXQUFKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyLCBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgUVJDb2RlIGZyb20gXCJxcmNvZGVcIjtcbmltcG9ydCB7IENhbnZhcyB9IGZyb20gXCJub2RlLWNhbnZhc1wiO1xuXG5leHBvcnQgY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5leHBvcnQgY29uc3QgcGF0aCA9IFwiL3YxL3FyXCI7XG5cbmNsYXNzIFFSR2VuUm91dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgcm91dGVyLmdldCgnLzp0ZXh0JywgYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGV4dDogc3RyaW5nID0gcmVxLnBhcmFtcy50ZXh0O1xuICAgICAgICAgICAgY29uc3Qgd2lkdGg6IG51bWJlciA9IHBhcnNlSW50KHJlcS5xdWVyeS53aWR0aCBhcyBzdHJpbmcpIHx8IDIwO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0OiBudW1iZXIgPSBwYXJzZUludChyZXEucXVlcnkuaGVpZ2h0IGFzIHN0cmluZykgfHwgMjA7XG5cbiAgICAgICAgICAgIGlmICghdGV4dCkgcmV0dXJuIHJlcy5qc29uKHsgZXJyb3I6IHRydWUsIG1lc3NhZ2U6IFwiTm8gSW5wdXQgVGV4dFwiIH0pO1xuICAgICAgICAgICAgcmVzLnNldEhlYWRlcignQ29udGVudC10eXBlJywgJ2ltYWdlL3BuZycpO1xuXG4gICAgICAgICAgICBjb25zdCBxciA9IGF3YWl0IFFSQ29kZS50b0NhbnZhcyhuZXcgQ2FudmFzKHdpZHRoLCBoZWlnaHQsIFwiaW1hZ2VcIiksIHRleHQpO1xuXG4gICAgICAgICAgICBxci5wbmdTdHJlYW0oKS5waXBlKHJlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxubmV3IFFSR2VuUm91dGVyKCk7Il19