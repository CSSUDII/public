"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var router = (0, _express.Router)();

var indexRouter = function indexRouter() {
  _classCallCheck(this, indexRouter);

  router.get('/', function (req, res, next) {
    res.send('Hello World');
  });
};

;
new indexRouter();
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL2luZGV4Um91dGVyLnRzIl0sIm5hbWVzIjpbInJvdXRlciIsImluZGV4Um91dGVyIiwiZ2V0IiwicmVxIiwicmVzIiwibmV4dCIsInNlbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUVBLElBQU1BLE1BQU0sR0FBRyxzQkFBZjs7SUFFTUMsVyxHQUNGLHVCQUFjO0FBQUE7O0FBQ1ZELEVBQUFBLE1BQU0sQ0FBQ0UsR0FBUCxDQUFXLEdBQVgsRUFBZ0IsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQVdDLElBQVgsRUFBb0I7QUFDaENELElBQUFBLEdBQUcsQ0FBQ0UsSUFBSixDQUFTLGFBQVQ7QUFDSCxHQUZEO0FBR0gsQzs7QUFDSjtBQUVELElBQUlMLFdBQUo7ZUFFZUQsTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XG5cbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuXG5jbGFzcyBpbmRleFJvdXRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHJvdXRlci5nZXQoJy8nLCAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICAgICAgICAgIHJlcy5zZW5kKCdIZWxsbyBXb3JsZCcpXG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuXG5uZXcgaW5kZXhSb3V0ZXIoKTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyOyJdfQ==