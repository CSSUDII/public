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
            })["catch"](function (error) {// Log Error
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvZnVuY3Rpb25zL2xvYWRSb3V0ZXMudHMiXSwibmFtZXMiOlsibG9hZFJvdXRlcyIsInJvdXRlc0ZpbGVzIiwicGF0aCIsInJlc29sdmUiLCJmaWxlIiwidGhlbiIsInJlcyIsInNldCIsInJvdXRlciIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sSUFBTUEsVUFBVTtBQUFBLHFFQUFHO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDaEJDLFlBQUFBLFdBRGdCLEdBQ0YscUJBQVlDLGlCQUFLQyxPQUFMLENBQWEsbUJBQWIsQ0FBWixDQURFO0FBQUEsbURBRUhGLFdBRkc7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUVYRyxZQUFBQSxJQUZXO0FBQUE7QUFBQSxtQkFHWixvQ0FBb0JBLElBQXBCO0FBQUE7QUFBQSxlQUE0QkMsSUFBNUIsQ0FBaUMsVUFBQ0MsR0FBRCxFQUFTO0FBQzVDLDBDQUFlQyxHQUFmLENBQW1CRCxHQUFHLENBQUNKLElBQXZCLEVBQTZCSSxHQUFHLENBQUNFLE1BQWpDO0FBQ0gsYUFGSyxXQUVHLFVBQUNDLEtBQUQsRUFBVyxDQUNoQjtBQUNILGFBSkssQ0FIWTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQVZULFVBQVU7QUFBQTtBQUFBO0FBQUEsR0FBaEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZWFkZGlyU3luYyB9IGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgZ2V0Um91dGVzTWFwIH0gZnJvbSBcIi4uL1NlcnZlclwiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuLyoqXG4gKiBMb2FkcyBhbGwgdGhlIHJvdXRlc1xuICogQGRlcHJlY2F0ZWQgZG9zZSBub3Qgd29yayB5ZXRcbiAqIEBleHBvcnRzIGxvYWRSb3V0ZXNcbiAqIEBhc3luY1xuICovXG5leHBvcnQgY29uc3QgbG9hZFJvdXRlcyA9IGFzeW5jKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHJvdXRlc0ZpbGVzID0gcmVhZGRpclN5bmMocGF0aC5yZXNvbHZlKFwic3JjL3NlcnZlci9yb3V0ZXNcIikpO1xuICAgIGZvciAoY29uc3QgZmlsZSBvZiByb3V0ZXNGaWxlcykge1xuICAgICAgICBhd2FpdCBpbXBvcnQoYC4uL3JvdXRlcy8ke2ZpbGV9YCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBnZXRSb3V0ZXNNYXAoKS5zZXQocmVzLnBhdGgsIHJlcy5yb3V0ZXIpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIC8vIExvZyBFcnJvclxuICAgICAgICB9KTtcbiAgICB9XG59Il19