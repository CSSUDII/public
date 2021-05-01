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

      ;
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

      ;
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

      ;
    }
  }, {
    key: "load",
    value: function load() {
      this.loadConfig();
      this.checks();
      new _dbClient.dbClient();
      this.listen();
      return;
    }
  }]);

  return Client;
}(_events["default"]);

exports.Client = Client;
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnQvQ2xpZW50LnRzIl0sIm5hbWVzIjpbIkNsaWVudCIsInRlc3QiLCJsb2dnZXIiLCJmcyIsImRlZmF1bHRzIiwiY29uZmlnIiwieWFtbCIsImxvYWQiLCJyZWFkRmlsZVN5bmMiLCJpbmZvIiwiZW1pdCIsImUiLCJlcnJvciIsIndhcm4iLCJwb3J0IiwiZGVidWciLCJzZXJ2ZXIiLCJsaXN0ZW4iLCJwcm9jZXNzIiwiZW52IiwiUE9SVCIsImxvYWRDb25maWciLCJjaGVja3MiLCJkYkNsaWVudCIsIkV2ZW50RW1pdHRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBR2FBLE07Ozs7O0FBYVQsa0JBQVlDLElBQVosRUFBMkI7QUFBQTs7QUFBQTs7QUFDdkI7O0FBRHVCOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUd2QixVQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDQSxVQUFLQyxNQUFMLEdBQWNBLGtCQUFkO0FBQ0EsVUFBS0MsRUFBTCxHQUFVQSxjQUFWO0FBQ0EsdUJBQWVDLGtCQUFmO0FBTnVCO0FBTzFCOzs7O1dBRUYsc0JBQXFCO0FBQ2hCLFVBQUk7QUFDQSxhQUFLQyxNQUFMLEdBQWNDLG1CQUFLQyxJQUFMLENBQVUsS0FBS0osRUFBTCxDQUFRSyxZQUFSLENBQXFCLGNBQXJCLEVBQXFDLE1BQXJDLENBQVYsQ0FBZDtBQUNBLGFBQUtOLE1BQUwsQ0FBWU8sSUFBWixDQUFpQixvQkFBakI7QUFDQSxhQUFLQyxJQUFMLENBQVUsY0FBVjtBQUNILE9BSkQsQ0FJRSxPQUFPQyxDQUFQLEVBQVU7QUFDUixhQUFLVCxNQUFMLENBQVlVLEtBQVosQ0FBa0IsMEJBQTBCRCxDQUE1QztBQUNBLGFBQUtULE1BQUwsQ0FBWVcsSUFBWixDQUFpQix3QkFBakI7QUFDQSxhQUFLSCxJQUFMLENBQVUsT0FBVixFQUFtQkMsQ0FBbkI7QUFDSDs7QUFBQTtBQUVKOzs7V0FFRixrQkFBaUI7QUFDWixVQUFJO0FBQ0E7QUFDQSxhQUFLRyxJQUFMLEdBQVksS0FBS1QsTUFBTCxDQUFZUyxJQUF4QjtBQUNBLGFBQUtDLEtBQUwsR0FBYSxLQUFLVixNQUFMLENBQVlVLEtBQXpCLENBSEEsQ0FJQTtBQUNBOztBQUVBLGFBQUtMLElBQUwsQ0FBVSxlQUFWO0FBQ0gsT0FSRCxDQVFFLE9BQU9DLENBQVAsRUFBVTtBQUNSLGFBQUtELElBQUwsQ0FBVSxPQUFWLEVBQW1CQyxDQUFuQjtBQUNIOztBQUFBO0FBRUQsVUFBSSxDQUFDLEtBQUtHLElBQVYsRUFBZ0IsS0FBS0EsSUFBTCxHQUFZLGdCQUFhQSxJQUF6QjtBQUNoQixVQUFJLENBQUMsS0FBS0MsS0FBVixFQUFpQixLQUFLQSxLQUFMLEdBQWEsZ0JBQWFBLEtBQTFCO0FBRXBCOzs7V0FFRixrQkFBaUI7QUFBQTs7QUFDWixVQUFJLEtBQUtkLElBQVQsRUFBZTtBQUNYLGFBQUtlLE1BQUwsR0FBY0EsbUJBQU9DLE1BQVAsQ0FBYyxLQUFLSCxJQUFuQixDQUFkO0FBQ0gsT0FGRCxNQUVPO0FBQ0gsWUFBSUksT0FBTyxDQUFDQyxHQUFSLENBQVlDLElBQWhCLEVBQXNCLENBQ2xCO0FBQ0g7O0FBRUQsWUFBTU4sSUFBWSxHQUFHLEtBQUtBLElBQUwsSUFBYSxJQUFsQztBQUNBLGFBQUtFLE1BQUwsR0FBY0EsbUJBQU9DLE1BQVAsQ0FBY0gsSUFBZCxFQUFvQixTQUFwQixFQUErQjtBQUFBLGlCQUFNO0FBQy9DLFlBQUEsTUFBSSxDQUFDWixNQUFMLENBQVlPLElBQVosd0JBQWlDSyxJQUFqQyxNQUE0QyxNQUFJLENBQUNKLElBQUwsQ0FBVSxPQUFWO0FBREg7QUFBQSxTQUEvQixDQUFkO0FBR0g7O0FBQUE7QUFDSjs7O1dBRUYsZ0JBQWM7QUFDVCxXQUFLVyxVQUFMO0FBQ0EsV0FBS0MsTUFBTDtBQUNBLFVBQUlDLGtCQUFKO0FBQ0EsV0FBS04sTUFBTDtBQUNBO0FBQ0g7Ozs7RUExRXVCTyxrQjs7O0FBNEUzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB5YW1sIGZyb20gXCJqcy15YW1sXCI7XG5pbXBvcnQgbG9nZ2VyIGZyb20gXCJpbmtsb2cuanNcIjtcbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImV2ZW50c1wiXG5cbmltcG9ydCBzZXJ2ZXIgZnJvbSBcIi4uL3NlcnZlci9TZXJ2ZXJcIjtcbmltcG9ydCB7IGRiQ2xpZW50IH0gZnJvbSBcIi4vZGJDbGllbnRcIjtcblxuaW1wb3J0IHsgZGVmYXVsdHMgfSBmcm9tIFwiLi4vRGVmYXVsdHNcIjtcblxuaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzXCI7XG5cblxuZXhwb3J0IGNsYXNzIENsaWVudCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG5cbiAgICBwdWJsaWMgdGVzdDogYm9vbGVhbjtcbiAgICBwdWJsaWMgbG9nZ2VyOiBhbnk7XG4gICAgcHVibGljIGZzOiBhbnk7XG4gICAgcHVibGljIGRlZmF1bHQ6IHR5cGVvZiBkZWZhdWx0cztcbiAgICBwdWJsaWMgY29uZmlnOiBhbnk7XG5cbiAgICBwdWJsaWMgcG9ydDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIHB1YmxpYyBkZWJ1ZzogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIHB1YmxpYyBzZXJ2ZXI6IGFueVxuXG4gICAgY29uc3RydWN0b3IodGVzdDogYm9vbGVhbikge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMudGVzdCA9IHRlc3Q7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgICAgICB0aGlzLmZzID0gZnM7XG4gICAgICAgIHRoaXMuZGVmYXVsdCA9IGRlZmF1bHRzO1xuICAgIH1cblxuICAgcHJpdmF0ZSBsb2FkQ29uZmlnKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5jb25maWcgPSB5YW1sLmxvYWQodGhpcy5mcy5yZWFkRmlsZVN5bmMoJy4vY29uZmlnLnltbCcsICd1dGY4JykpO1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbygnTG9hZGVkIENvbmZpZyBGaWxlJyk7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2NvbmZpZ0xvYWRlZCcpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcignRXJyb3IgbG9hZGluZyBDb25maWcgJyArIGUpO1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybignVXNpbmcgRGVmYXVsdCBTZXR0aW5ncycpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIGUpO1xuICAgICAgICB9O1xuXG4gICAgfTtcblxuICAgcHJpdmF0ZSBjaGVja3MoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBNYWluIENvbmZpZ1xuICAgICAgICAgICAgdGhpcy5wb3J0ID0gdGhpcy5jb25maWcucG9ydDtcbiAgICAgICAgICAgIHRoaXMuZGVidWcgPSB0aGlzLmNvbmZpZy5kZWJ1ZztcbiAgICAgICAgICAgIC8vIERhdGFiYWNlIENvbmZpZ1xuICAgICAgICAgICAgLy8gTW92ZWQgdG8gZGJDbGllbnRcblxuICAgICAgICAgICAgdGhpcy5lbWl0KCdydW5uaW5nQ2hlY2tzJyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnZXJyb3InLCBlKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoIXRoaXMucG9ydCkgdGhpcy5wb3J0ID0gdGhpcy5kZWZhdWx0LnBvcnQ7XG4gICAgICAgIGlmICghdGhpcy5kZWJ1ZykgdGhpcy5kZWJ1ZyA9IHRoaXMuZGVmYXVsdC5kZWJ1ZztcblxuICAgIH07XG5cbiAgIHByaXZhdGUgbGlzdGVuKCkge1xuICAgICAgICBpZiAodGhpcy50ZXN0KSB7XG4gICAgICAgICAgICB0aGlzLnNlcnZlciA9IHNlcnZlci5saXN0ZW4odGhpcy5wb3J0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5QT1JUKSB7XG4gICAgICAgICAgICAgICAgLy8gRG8gU3R1ZmZcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgcG9ydDogbnVtYmVyID0gdGhpcy5wb3J0IHx8IDgwODA7XG4gICAgICAgICAgICB0aGlzLnNlcnZlciA9IHNlcnZlci5saXN0ZW4ocG9ydCwgXCIwLjAuMC4wXCIsICgpID0+IC8vIEJpbmQgb24gMC4wLjAuMCwgSXQgYWxsb3dzIHlvdSB0byBhY2Nlc3MgdGhlIEFQSSBmcm9tIGFueSBJUFxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYEFQSSBMaXZlIG9uOiAke3BvcnR9YCkgJiYgdGhpcy5lbWl0KCdyZWFkeScpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICBwdWJsaWMgbG9hZCgpIHtcbiAgICAgICAgdGhpcy5sb2FkQ29uZmlnKCk7XG4gICAgICAgIHRoaXMuY2hlY2tzKCk7XG4gICAgICAgIG5ldyBkYkNsaWVudCgpO1xuICAgICAgICB0aGlzLmxpc3RlbigpO1xuICAgICAgICByZXR1cm47XG4gICAgfTtcblxufTsiXX0=