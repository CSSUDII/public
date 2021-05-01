"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = void 0;

var _jsYaml = _interopRequireDefault(require("js-yaml"));

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

  function Client(test) {
    var _this;

    _classCallCheck(this, Client);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "test", void 0);

    _defineProperty(_assertThisInitialized(_this), "logger", void 0);

    _defineProperty(_assertThisInitialized(_this), "fs", void 0);

    _defineProperty(_assertThisInitialized(_this), "default", void 0);

    _defineProperty(_assertThisInitialized(_this), "config", void 0);

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
    key: "loadConfig",
    value: function loadConfig() {
      try {
        this.config = _jsYaml["default"].load(this.fs.readFileSync('./config.yml', 'utf8'));
        this.logger.info('Loaded Config File');
        this.emit('configLoaded');
      } catch (e) {
        this.logger.error('Error loading Config ' + e);
        this.logger.warn('Using Default Settings');
        this.emit('error', e);
      }
    }
  }, {
    key: "checks",
    value: function checks() {
      try {
        // Main Config
        this.port = this.config.port;
        this.debug = this.config.debug; // Databace Config
        // Moved to dbClient

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

      if (this.test) {
        this.server = _Server["default"].listen(this.port);
      } else {
        if (process.env.PORT) {// Do Stuff
        }

        var port = this.port || 8080;
        this.server = _Server["default"].listen(port, "0.0.0.0", function () {
          return (// Bind on 0.0.0.0, It allows you to access the API from any IP
            _this2.logger.info("API Live on: ".concat(port)) && _this2.emit('ready')
          );
        });
      }
    } // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

  }, {
    key: "load",
    value: function load() {
      this.loadConfig();
      this.checks();
      new _dbClient.dbClient();
      return this.listen();
    }
  }]);

  return Client;
}(_events["default"]);

exports.Client = Client;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnQvQ2xpZW50LnRzIl0sIm5hbWVzIjpbIkNsaWVudCIsInRlc3QiLCJsb2dnZXIiLCJmcyIsImRlZmF1bHRzIiwiY29uZmlnIiwieWFtbCIsImxvYWQiLCJyZWFkRmlsZVN5bmMiLCJpbmZvIiwiZW1pdCIsImUiLCJlcnJvciIsIndhcm4iLCJwb3J0IiwiZGVidWciLCJzZXJ2ZXIiLCJsaXN0ZW4iLCJwcm9jZXNzIiwiZW52IiwiUE9SVCIsImxvYWRDb25maWciLCJjaGVja3MiLCJkYkNsaWVudCIsIkV2ZW50RW1pdHRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBR2FBLE07Ozs7O0FBYVQsa0JBQVlDLElBQVosRUFBMkI7QUFBQTs7QUFBQTs7QUFDdkI7O0FBRHVCOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUd2QixVQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDQSxVQUFLQyxNQUFMLEdBQWNBLGtCQUFkO0FBQ0EsVUFBS0MsRUFBTCxHQUFVQSxjQUFWO0FBQ0EsdUJBQWVDLGtCQUFmO0FBTnVCO0FBTzFCOzs7O1dBRUYsc0JBQXFCO0FBQ2hCLFVBQUk7QUFDQSxhQUFLQyxNQUFMLEdBQWNDLG1CQUFLQyxJQUFMLENBQVUsS0FBS0osRUFBTCxDQUFRSyxZQUFSLENBQXFCLGNBQXJCLEVBQXFDLE1BQXJDLENBQVYsQ0FBZDtBQUNBLGFBQUtOLE1BQUwsQ0FBWU8sSUFBWixDQUFpQixvQkFBakI7QUFDQSxhQUFLQyxJQUFMLENBQVUsY0FBVjtBQUNILE9BSkQsQ0FJRSxPQUFPQyxDQUFQLEVBQVU7QUFDUixhQUFLVCxNQUFMLENBQVlVLEtBQVosQ0FBa0IsMEJBQTBCRCxDQUE1QztBQUNBLGFBQUtULE1BQUwsQ0FBWVcsSUFBWixDQUFpQix3QkFBakI7QUFDQSxhQUFLSCxJQUFMLENBQVUsT0FBVixFQUFtQkMsQ0FBbkI7QUFDSDtBQUVKOzs7V0FFRixrQkFBaUI7QUFDWixVQUFJO0FBQ0E7QUFDQSxhQUFLRyxJQUFMLEdBQVksS0FBS1QsTUFBTCxDQUFZUyxJQUF4QjtBQUNBLGFBQUtDLEtBQUwsR0FBYSxLQUFLVixNQUFMLENBQVlVLEtBQXpCLENBSEEsQ0FJQTtBQUNBOztBQUVBLGFBQUtMLElBQUwsQ0FBVSxlQUFWO0FBQ0gsT0FSRCxDQVFFLE9BQU9DLENBQVAsRUFBVTtBQUNSLGFBQUtELElBQUwsQ0FBVSxPQUFWLEVBQW1CQyxDQUFuQjtBQUNIOztBQUVELFVBQUksQ0FBQyxLQUFLRyxJQUFWLEVBQWdCLEtBQUtBLElBQUwsR0FBWSxnQkFBYUEsSUFBekI7QUFDaEIsVUFBSSxDQUFDLEtBQUtDLEtBQVYsRUFBaUIsS0FBS0EsS0FBTCxHQUFhLGdCQUFhQSxLQUExQjtBQUVwQjs7O1dBRUYsa0JBQWlCO0FBQUE7O0FBQ1osVUFBSSxLQUFLZCxJQUFULEVBQWU7QUFDWCxhQUFLZSxNQUFMLEdBQWNBLG1CQUFPQyxNQUFQLENBQWMsS0FBS0gsSUFBbkIsQ0FBZDtBQUNILE9BRkQsTUFFTztBQUNILFlBQUlJLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxJQUFoQixFQUFzQixDQUNsQjtBQUNIOztBQUVELFlBQU1OLElBQVksR0FBRyxLQUFLQSxJQUFMLElBQWEsSUFBbEM7QUFDQSxhQUFLRSxNQUFMLEdBQWNBLG1CQUFPQyxNQUFQLENBQWNILElBQWQsRUFBb0IsU0FBcEIsRUFBK0I7QUFBQSxpQkFBTTtBQUMvQyxZQUFBLE1BQUksQ0FBQ1osTUFBTCxDQUFZTyxJQUFaLHdCQUFpQ0ssSUFBakMsTUFBNEMsTUFBSSxDQUFDSixJQUFMLENBQVUsT0FBVjtBQURIO0FBQUEsU0FBL0IsQ0FBZDtBQUdIO0FBQ0osSyxDQUVGOzs7O1dBQ0EsZ0JBQWM7QUFDVCxXQUFLVyxVQUFMO0FBQ0EsV0FBS0MsTUFBTDtBQUNBLFVBQUlDLGtCQUFKO0FBQ0QsYUFBTyxLQUFLTixNQUFMLEVBQVA7QUFDRjs7OztFQTFFdUJPLGtCIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuaW1wb3J0IHlhbWwgZnJvbSBcImpzLXlhbWxcIjtcbmltcG9ydCBsb2dnZXIgZnJvbSBcImlua2xvZy5qc1wiO1xuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiZXZlbnRzXCJcblxuaW1wb3J0IHNlcnZlciBmcm9tIFwiLi4vc2VydmVyL1NlcnZlclwiO1xuaW1wb3J0IHsgZGJDbGllbnQgfSBmcm9tIFwiLi9kYkNsaWVudFwiO1xuXG5pbXBvcnQgeyBkZWZhdWx0cyB9IGZyb20gXCIuLi9EZWZhdWx0c1wiO1xuXG5pbXBvcnQgXCJyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanNcIjtcblxuXG5leHBvcnQgY2xhc3MgQ2xpZW50IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcblxuICAgIHB1YmxpYyB0ZXN0OiBib29sZWFuO1xuICAgIHB1YmxpYyBsb2dnZXI6IGFueTtcbiAgICBwdWJsaWMgZnM6IGFueTtcbiAgICBwdWJsaWMgZGVmYXVsdDogdHlwZW9mIGRlZmF1bHRzO1xuICAgIHB1YmxpYyBjb25maWc6IGFueTtcblxuICAgIHB1YmxpYyBwb3J0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgcHVibGljIGRlYnVnOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgcHVibGljIHNlcnZlcjogYW55XG5cbiAgICBjb25zdHJ1Y3Rvcih0ZXN0OiBib29sZWFuKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy50ZXN0ID0gdGVzdDtcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gICAgICAgIHRoaXMuZnMgPSBmcztcbiAgICAgICAgdGhpcy5kZWZhdWx0ID0gZGVmYXVsdHM7XG4gICAgfVxuXG4gICBwcml2YXRlIGxvYWRDb25maWcoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZyA9IHlhbWwubG9hZCh0aGlzLmZzLnJlYWRGaWxlU3luYygnLi9jb25maWcueW1sJywgJ3V0ZjgnKSk7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdMb2FkZWQgQ29uZmlnIEZpbGUnKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnY29uZmlnTG9hZGVkJyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKCdFcnJvciBsb2FkaW5nIENvbmZpZyAnICsgZSk7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdVc2luZyBEZWZhdWx0IFNldHRpbmdzJyk7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgcHJpdmF0ZSBjaGVja3MoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBNYWluIENvbmZpZ1xuICAgICAgICAgICAgdGhpcy5wb3J0ID0gdGhpcy5jb25maWcucG9ydDtcbiAgICAgICAgICAgIHRoaXMuZGVidWcgPSB0aGlzLmNvbmZpZy5kZWJ1ZztcbiAgICAgICAgICAgIC8vIERhdGFiYWNlIENvbmZpZ1xuICAgICAgICAgICAgLy8gTW92ZWQgdG8gZGJDbGllbnRcblxuICAgICAgICAgICAgdGhpcy5lbWl0KCdydW5uaW5nQ2hlY2tzJyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnZXJyb3InLCBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5wb3J0KSB0aGlzLnBvcnQgPSB0aGlzLmRlZmF1bHQucG9ydDtcbiAgICAgICAgaWYgKCF0aGlzLmRlYnVnKSB0aGlzLmRlYnVnID0gdGhpcy5kZWZhdWx0LmRlYnVnO1xuXG4gICAgfVxuXG4gICBwcml2YXRlIGxpc3RlbigpIHtcbiAgICAgICAgaWYgKHRoaXMudGVzdCkge1xuICAgICAgICAgICAgdGhpcy5zZXJ2ZXIgPSBzZXJ2ZXIubGlzdGVuKHRoaXMucG9ydCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuUE9SVCkge1xuICAgICAgICAgICAgICAgIC8vIERvIFN0dWZmXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHBvcnQ6IG51bWJlciA9IHRoaXMucG9ydCB8fCA4MDgwO1xuICAgICAgICAgICAgdGhpcy5zZXJ2ZXIgPSBzZXJ2ZXIubGlzdGVuKHBvcnQsIFwiMC4wLjAuMFwiLCAoKSA9PiAvLyBCaW5kIG9uIDAuMC4wLjAsIEl0IGFsbG93cyB5b3UgdG8gYWNjZXNzIHRoZSBBUEkgZnJvbSBhbnkgSVBcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGBBUEkgTGl2ZSBvbjogJHtwb3J0fWApICYmIHRoaXMuZW1pdCgncmVhZHknKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG4gICBwdWJsaWMgbG9hZCgpIHtcbiAgICAgICAgdGhpcy5sb2FkQ29uZmlnKCk7XG4gICAgICAgIHRoaXMuY2hlY2tzKCk7XG4gICAgICAgIG5ldyBkYkNsaWVudCgpO1xuICAgICAgIHJldHVybiB0aGlzLmxpc3RlbigpO1xuICAgIH1cblxufSJdfQ==