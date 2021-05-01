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

  router.get('/', function (req, res) {
    res.send('Hello World');
  });
};

new indexRouter();
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL2luZGV4Um91dGVyLnRzIl0sIm5hbWVzIjpbInJvdXRlciIsImluZGV4Um91dGVyIiwiZ2V0IiwicmVxIiwicmVzIiwic2VuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBR0EsSUFBTUEsTUFBTSxHQUFHLHNCQUFmOztJQUVNQyxXLEdBQ0YsdUJBQWM7QUFBQTs7QUFDVkQsRUFBQUEsTUFBTSxDQUFDRSxHQUFQLENBQVcsR0FBWCxFQUFnQixVQUFDQyxHQUFELEVBQWVDLEdBQWYsRUFBaUM7QUFDN0NBLElBQUFBLEdBQUcsQ0FBQ0MsSUFBSixDQUFTLGFBQVQ7QUFDSCxHQUZEO0FBR0gsQzs7QUFHTCxJQUFJSixXQUFKO2VBRWVELE0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xuXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxuY2xhc3MgaW5kZXhSb3V0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICByb3V0ZXIuZ2V0KCcvJywgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgcmVzLnNlbmQoJ0hlbGxvIFdvcmxkJylcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5uZXcgaW5kZXhSb3V0ZXIoKTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyOyJdfQ==