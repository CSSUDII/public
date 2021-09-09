"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadRoutes = void 0;

var _fs = require("fs");

var _Server = require("../Server");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Loads all the routes
 * @deprecated dose not work yet
 * @exports loadRoutes
 * @async
 */
var loadRoutes = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var routesFiles, _iterator, _step, file;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            routesFiles = (0, _fs.readdirSync)(_path["default"].resolve("src/server/routes"));
            _iterator = _createForOfIteratorHelper(routesFiles);
            _context.prev = 2;

            _iterator.s();

          case 4:
            if ((_step = _iterator.n()).done) {
              _context.next = 10;
              break;
            }

            file = _step.value;
            _context.next = 8;
            return Promise.resolve("../routes/".concat(file)).then(function (s) {
              return _interopRequireWildcard(require(s));
            }).then(function (res) {
              (0, _Server.getRoutesMap)().set(res.path, res.router);
            })["catch"](function () {// Log Error
            });

          case 8:
            _context.next = 4;
            break;

          case 10:
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](2);

            _iterator.e(_context.t0);

          case 15:
            _context.prev = 15;

            _iterator.f();

            return _context.finish(15);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 12, 15, 18]]);
  }));

  return function loadRoutes() {
    return _ref.apply(this, arguments);
  };
}();

exports.loadRoutes = loadRoutes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvZnVuY3Rpb25zL2xvYWRSb3V0ZXMudHMiXSwibmFtZXMiOlsibG9hZFJvdXRlcyIsInJvdXRlc0ZpbGVzIiwicGF0aCIsInJlc29sdmUiLCJmaWxlIiwidGhlbiIsInJlcyIsInNldCIsInJvdXRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLElBQU1BLFVBQVU7QUFBQSxxRUFBRztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ2hCQyxZQUFBQSxXQURnQixHQUNGLHFCQUFZQyxpQkFBS0MsT0FBTCxDQUFhLG1CQUFiLENBQVosQ0FERTtBQUFBLG1EQUVIRixXQUZHO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFFWEcsWUFBQUEsSUFGVztBQUFBO0FBQUEsbUJBR1osb0NBQW9CQSxJQUFwQjtBQUFBO0FBQUEsZUFBNEJDLElBQTVCLENBQWlDLFVBQUNDLEdBQUQsRUFBUztBQUM1QywwQ0FBZUMsR0FBZixDQUFtQkQsR0FBRyxDQUFDSixJQUF2QixFQUE2QkksR0FBRyxDQUFDRSxNQUFqQztBQUNILGFBRkssV0FFRyxZQUFNLENBQ1g7QUFDSCxhQUpLLENBSFk7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFWUixVQUFVO0FBQUE7QUFBQTtBQUFBLEdBQWhCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVhZGRpclN5bmMgfSBmcm9tIFwiZnNcIjtcbmltcG9ydCB7IGdldFJvdXRlc01hcCB9IGZyb20gXCIuLi9TZXJ2ZXJcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbi8qKlxuICogTG9hZHMgYWxsIHRoZSByb3V0ZXNcbiAqIEBkZXByZWNhdGVkIGRvc2Ugbm90IHdvcmsgeWV0XG4gKiBAZXhwb3J0cyBsb2FkUm91dGVzXG4gKiBAYXN5bmNcbiAqL1xuZXhwb3J0IGNvbnN0IGxvYWRSb3V0ZXMgPSBhc3luYygpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCByb3V0ZXNGaWxlcyA9IHJlYWRkaXJTeW5jKHBhdGgucmVzb2x2ZShcInNyYy9zZXJ2ZXIvcm91dGVzXCIpKTtcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2Ygcm91dGVzRmlsZXMpIHtcbiAgICAgICAgYXdhaXQgaW1wb3J0KGAuLi9yb3V0ZXMvJHtmaWxlfWApLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgZ2V0Um91dGVzTWFwKCkuc2V0KHJlcy5wYXRoLCByZXMucm91dGVyKTtcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgLy8gTG9nIEVycm9yXG4gICAgICAgIH0pO1xuICAgIH1cbn0iXX0=