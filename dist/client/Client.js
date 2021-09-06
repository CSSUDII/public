"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = void 0;

var _inklog = _interopRequireDefault(require("inklog.js"));

var _fs = _interopRequireDefault(require("fs"));

var _events = _interopRequireDefault(require("events"));

var _Server = _interopRequireDefault(require("../server/Server"));

var _dbClient = require("./dbClient");

var _Defaults = require("../Defaults");

require("regenerator-runtime/runtime.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Client = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Client, _EventEmitter);

  var _super = _createSuper(Client);

  /**
   * @constructor
   * @param test Runs the Sever in Testing Mode
   */
  function Client(_ref) {
    var _this;

    var test = _ref.test;

    _classCallCheck(this, Client);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "test", void 0);

    _defineProperty(_assertThisInitialized(_this), "logger", void 0);

    _defineProperty(_assertThisInitialized(_this), "fs", void 0);

    _defineProperty(_assertThisInitialized(_this), "default", void 0);

    _defineProperty(_assertThisInitialized(_this), "port", void 0);

    _defineProperty(_assertThisInitialized(_this), "debug", void 0);

    _defineProperty(_assertThisInitialized(_this), "server", void 0);

    _this.test = test;
    _this.logger = _inklog["default"];
    _this.fs = _fs["default"];
    _this["default"] = _Defaults.defaults;
    return _this;
  }

  _createClass(Client, [{
    key: "checks",
    value: function checks() {
      try {
        // Main Config
        this.port = process.env.PORT;
        this.debug = process.env.DEBUG;
        /**
         * Database Config
         * Moved to @link dbClient.ts
         */

        this.emit('runningChecks');
      } catch (e) {
        this.emit('error', e);
      }

      if (!this.port) this.port = this["default"].port;
      if (!this.debug) this.debug = this["default"].debug;
    }
  }, {
    key: "listen",
    value: function listen() {
      var _this2 = this;

      var port = this.port || 8080;
      this.server = _Server["default"].listen(port, "0.0.0.0", function () {
        return (// Bind on 0.0.0.0, It allows you to access the API from any IP
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          _this2.logger.info("API Live on: ".concat(port)) && _this2.emit('ready')
        );
      });
    } // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

  }, {
    key: "load",
    value: function load() {
      this.checks();
      new _dbClient.dbClient();
      return this.listen();
    }
  }]);

  return Client;
}(_events["default"]);

exports.Client = Client;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnQvQ2xpZW50LnRzIl0sIm5hbWVzIjpbIkNsaWVudCIsInRlc3QiLCJsb2dnZXIiLCJmcyIsImRlZmF1bHRzIiwicG9ydCIsInByb2Nlc3MiLCJlbnYiLCJQT1JUIiwiZGVidWciLCJERUJVRyIsImVtaXQiLCJlIiwic2VydmVyIiwibGlzdGVuIiwiaW5mbyIsImNoZWNrcyIsImRiQ2xpZW50IiwiRXZlbnRFbWl0dGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFYUEsTTs7Ozs7QUFZVDtBQUNKO0FBQ0E7QUFDQTtBQUNJLHdCQUF5QztBQUFBOztBQUFBLFFBQTNCQyxJQUEyQixRQUEzQkEsSUFBMkI7O0FBQUE7O0FBQ3JDOztBQURxQzs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFHckMsVUFBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsVUFBS0MsTUFBTCxHQUFjQSxrQkFBZDtBQUNBLFVBQUtDLEVBQUwsR0FBVUEsY0FBVjtBQUNBLHVCQUFlQyxrQkFBZjtBQU5xQztBQU94Qzs7OztXQUlGLGtCQUFpQjtBQUNaLFVBQUk7QUFDQTtBQUNBLGFBQUtDLElBQUwsR0FBWUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLElBQXhCO0FBQ0EsYUFBS0MsS0FBTCxHQUFhSCxPQUFPLENBQUNDLEdBQVIsQ0FBWUcsS0FBekI7QUFDQTtBQUNaO0FBQ0E7QUFDQTs7QUFFWSxhQUFLQyxJQUFMLENBQVUsZUFBVjtBQUNILE9BVkQsQ0FVRSxPQUFPQyxDQUFQLEVBQVU7QUFDUixhQUFLRCxJQUFMLENBQVUsT0FBVixFQUFtQkMsQ0FBbkI7QUFDSDs7QUFFRCxVQUFJLENBQUMsS0FBS1AsSUFBVixFQUFnQixLQUFLQSxJQUFMLEdBQVksZ0JBQWFBLElBQXpCO0FBQ2hCLFVBQUksQ0FBQyxLQUFLSSxLQUFWLEVBQWlCLEtBQUtBLEtBQUwsR0FBYSxnQkFBYUEsS0FBMUI7QUFFcEI7OztXQUVGLGtCQUFpQjtBQUFBOztBQUNaLFVBQU1KLElBQVksR0FBRyxLQUFLQSxJQUFMLElBQWEsSUFBbEM7QUFDQSxXQUFLUSxNQUFMLEdBQWNBLG1CQUFPQyxNQUFQLENBQWNULElBQWQsRUFBb0IsU0FBcEIsRUFBK0I7QUFBQSxlQUFNO0FBQy9DO0FBQ0E7QUFDQSxVQUFBLE1BQUksQ0FBQ0gsTUFBTCxDQUFZYSxJQUFaLHdCQUFpQ1YsSUFBakMsTUFBNEMsTUFBSSxDQUFDTSxJQUFMLENBQVUsT0FBVjtBQUhIO0FBQUEsT0FBL0IsQ0FBZDtBQUtILEssQ0FFRjs7OztXQUNBLGdCQUFjO0FBQ1QsV0FBS0ssTUFBTDtBQUNBLFVBQUlDLGtCQUFKO0FBQ0QsYUFBTyxLQUFLSCxNQUFMLEVBQVA7QUFDRjs7OztFQTdEdUJJLGtCIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuaW1wb3J0IGxvZ2dlciBmcm9tIFwiaW5rbG9nLmpzXCI7XG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJldmVudHNcIlxuXG5pbXBvcnQgc2VydmVyIGZyb20gXCIuLi9zZXJ2ZXIvU2VydmVyXCI7XG5pbXBvcnQgeyBkYkNsaWVudCB9IGZyb20gXCIuL2RiQ2xpZW50XCI7XG5cbmltcG9ydCB7IGRlZmF1bHRzIH0gZnJvbSBcIi4uL0RlZmF1bHRzXCI7XG5pbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tIFwiaHR0cFwiO1xuXG5pbXBvcnQgXCJyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanNcIjtcblxuZXhwb3J0IGNsYXNzIENsaWVudCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG5cbiAgICBwdWJsaWMgdGVzdDogYm9vbGVhbjtcbiAgICBwdWJsaWMgbG9nZ2VyOiB0eXBlb2YgbG9nZ2VyO1xuICAgIHB1YmxpYyBmczogdHlwZW9mIGZzO1xuICAgIHB1YmxpYyBkZWZhdWx0OiB0eXBlb2YgZGVmYXVsdHM7XG5cbiAgICBwdWJsaWMgcG9ydDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIHB1YmxpYyBkZWJ1ZzogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIHB1YmxpYyBzZXJ2ZXI6IFNlcnZlciB8IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB0ZXN0IFJ1bnMgdGhlIFNldmVyIGluIFRlc3RpbmcgTW9kZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHsgdGVzdCB9OiB7IHRlc3Q6IGJvb2xlYW4gfSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMudGVzdCA9IHRlc3Q7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgICAgICB0aGlzLmZzID0gZnM7XG4gICAgICAgIHRoaXMuZGVmYXVsdCA9IGRlZmF1bHRzO1xuICAgIH1cblxuICAgXG5cbiAgIHByaXZhdGUgY2hlY2tzKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gTWFpbiBDb25maWdcbiAgICAgICAgICAgIHRoaXMucG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgYXMgYW55O1xuICAgICAgICAgICAgdGhpcy5kZWJ1ZyA9IHByb2Nlc3MuZW52LkRFQlVHIGFzIGFueTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRGF0YWJhc2UgQ29uZmlnXG4gICAgICAgICAgICAgKiBNb3ZlZCB0byBAbGluayBkYkNsaWVudC50c1xuICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgIHRoaXMuZW1pdCgncnVubmluZ0NoZWNrcycpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMucG9ydCkgdGhpcy5wb3J0ID0gdGhpcy5kZWZhdWx0LnBvcnQ7XG4gICAgICAgIGlmICghdGhpcy5kZWJ1ZykgdGhpcy5kZWJ1ZyA9IHRoaXMuZGVmYXVsdC5kZWJ1ZztcblxuICAgIH1cblxuICAgcHJpdmF0ZSBsaXN0ZW4oKSB7XG4gICAgICAgIGNvbnN0IHBvcnQ6IG51bWJlciA9IHRoaXMucG9ydCB8fCA4MDgwO1xuICAgICAgICB0aGlzLnNlcnZlciA9IHNlcnZlci5saXN0ZW4ocG9ydCwgXCIwLjAuMC4wXCIsICgpID0+IC8vIEJpbmQgb24gMC4wLjAuMCwgSXQgYWxsb3dzIHlvdSB0byBhY2Nlc3MgdGhlIEFQSSBmcm9tIGFueSBJUFxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgQVBJIExpdmUgb246ICR7cG9ydH1gKSAmJiB0aGlzLmVtaXQoJ3JlYWR5JyksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuICAgcHVibGljIGxvYWQoKSB7XG4gICAgICAgIHRoaXMuY2hlY2tzKCk7XG4gICAgICAgIG5ldyBkYkNsaWVudCgpO1xuICAgICAgIHJldHVybiB0aGlzLmxpc3RlbigpO1xuICAgIH1cblxufSJdfQ==