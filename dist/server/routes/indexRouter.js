"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = exports.path = void 0;

var _express = require("express");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var path = "/";
exports.path = path;
var router = (0, _express.Router)();
exports.router = router;

var indexRouter =
/**
 * @constructor
 */
function indexRouter() {
  _classCallCheck(this, indexRouter);

  router.get('/', function (_req, res) {
    return res.status(200).send("<h1>CSSUDII Public API</h1>");
  });
};

new indexRouter();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL2luZGV4Um91dGVyLnRzIl0sIm5hbWVzIjpbInBhdGgiLCJyb3V0ZXIiLCJpbmRleFJvdXRlciIsImdldCIsIl9yZXEiLCJyZXMiLCJzdGF0dXMiLCJzZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFHTyxJQUFNQSxJQUFJLEdBQUcsR0FBYjs7QUFDQSxJQUFNQyxNQUFNLEdBQUcsc0JBQWY7OztJQUVEQyxXO0FBQ0Y7QUFDSjtBQUNBO0FBQ0ksdUJBQWM7QUFBQTs7QUFDVkQsRUFBQUEsTUFBTSxDQUFDRSxHQUFQLENBQVcsR0FBWCxFQUFnQixVQUFDQyxJQUFELEVBQWdCQyxHQUFoQixFQUFrQztBQUMvQyxXQUFPQSxHQUFHLENBQUNDLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQiw2QkFBckIsQ0FBUDtBQUNGLEdBRkQ7QUFHSCxDOztBQUdMLElBQUlMLFdBQUoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xuXG5leHBvcnQgY29uc3QgcGF0aCA9IFwiL1wiO1xuZXhwb3J0IGNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuXG5jbGFzcyBpbmRleFJvdXRlciB7XG4gICAgLyoqXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHJvdXRlci5nZXQoJy8nLCAoX3JlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQoXCI8aDE+Q1NTVURJSSBQdWJsaWMgQVBJPC9oMT5cIik7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxubmV3IGluZGV4Um91dGVyKCk7Il19