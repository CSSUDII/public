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
    return res.send('Hello World');
  });
};

new indexRouter();
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL2luZGV4Um91dGVyLnRzIl0sIm5hbWVzIjpbInJvdXRlciIsImluZGV4Um91dGVyIiwiZ2V0IiwicmVxIiwicmVzIiwic2VuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBR0EsSUFBTUEsTUFBTSxHQUFHLHNCQUFmOztJQUVNQyxXLEdBQ0YsdUJBQWM7QUFBQTs7QUFDVkQsRUFBQUEsTUFBTSxDQUFDRSxHQUFQLENBQVcsR0FBWCxFQUFnQixVQUFDQyxHQUFELEVBQWVDLEdBQWYsRUFBaUM7QUFDOUMsV0FBT0EsR0FBRyxDQUFDQyxJQUFKLENBQVMsYUFBVCxDQUFQO0FBQ0YsR0FGRDtBQUdILEM7O0FBR0wsSUFBSUosV0FBSjtlQUVlRCxNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSBcImV4cHJlc3NcIjtcblxuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbmNsYXNzIGluZGV4Um91dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgcm91dGVyLmdldCgnLycsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgcmV0dXJuIHJlcy5zZW5kKCdIZWxsbyBXb3JsZCcpXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxubmV3IGluZGV4Um91dGVyKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjsiXX0=