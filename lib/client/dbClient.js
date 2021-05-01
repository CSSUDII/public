"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbClient = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _inklog = _interopRequireDefault(require("inklog.js"));

var _events = _interopRequireDefault(require("events"));

var _db = _interopRequireDefault(require("../config/db.config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var dbClient = /*#__PURE__*/function (_EventEmitter) {
  _inherits(dbClient, _EventEmitter);

  var _super = _createSuper(dbClient);

  function dbClient() {
    var _this;

    _classCallCheck(this, dbClient);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "logger", void 0);

    _defineProperty(_assertThisInitialized(_this), "dbConfig", void 0);

    _defineProperty(_assertThisInitialized(_this), "dbURL", void 0);

    _defineProperty(_assertThisInitialized(_this), "db", void 0);

    _this.logger = _inklog["default"];

    try {
      _this.dbConfig = _db["default"];
    } catch (e) {
      throw new Error('Error loading dbConfig' + e);
    }

    _this.dbURL = _this.dbConfig.url;

    try {
      _mongoose["default"].connect(_this.dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    } catch (e) {
      _this.logger.error('Error Connecting to DB');
    }

    _this.db = _mongoose["default"].connection;

    _this.db.on('error', function (e) {
      _this.logger.error(e);

      _this.emit('error', "db error: ".concat(e));
    });

    _this.db.once('open', function () {
      _this.logger.info('[DB] Connected to MongoDB');
    });

    return _this;
  }

  return dbClient;
}(_events["default"]);

exports.dbClient = dbClient;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnQvZGJDbGllbnQudHMiXSwibmFtZXMiOlsiZGJDbGllbnQiLCJsb2dnZXIiLCJkYkNvbmZpZyIsImNvbmZpZyIsImUiLCJFcnJvciIsImRiVVJMIiwidXJsIiwibW9uZ29vc2UiLCJjb25uZWN0IiwidXNlTmV3VXJsUGFyc2VyIiwidXNlVW5pZmllZFRvcG9sb2d5IiwiZXJyb3IiLCJkYiIsImNvbm5lY3Rpb24iLCJvbiIsImVtaXQiLCJvbmNlIiwiaW5mbyIsIkV2ZW50RW1pdHRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFYUEsUTs7Ozs7QUFPVCxzQkFBYztBQUFBOztBQUFBOztBQUNWOztBQURVOztBQUFBOztBQUFBOztBQUFBOztBQUdWLFVBQUtDLE1BQUwsR0FBY0Esa0JBQWQ7O0FBRUEsUUFBSTtBQUNBLFlBQUtDLFFBQUwsR0FBZ0JDLGNBQWhCO0FBQ0gsS0FGRCxDQUVFLE9BQU9DLENBQVAsRUFBVTtBQUNSLFlBQU0sSUFBSUMsS0FBSixDQUFVLDJCQUEyQkQsQ0FBckMsQ0FBTjtBQUNIOztBQUVELFVBQUtFLEtBQUwsR0FBYSxNQUFLSixRQUFMLENBQWNLLEdBQTNCOztBQUVBLFFBQUk7QUFDQUMsMkJBQVNDLE9BQVQsQ0FBaUIsTUFBS0gsS0FBdEIsRUFBNkI7QUFDekJJLFFBQUFBLGVBQWUsRUFBRSxJQURRO0FBRXpCQyxRQUFBQSxrQkFBa0IsRUFBRTtBQUZLLE9BQTdCO0FBSUgsS0FMRCxDQUtFLE9BQU9QLENBQVAsRUFBVTtBQUNSLFlBQUtILE1BQUwsQ0FBWVcsS0FBWixDQUFrQix3QkFBbEI7QUFDSDs7QUFFRCxVQUFLQyxFQUFMLEdBQVVMLHFCQUFTTSxVQUFuQjs7QUFFQSxVQUFLRCxFQUFMLENBQVFFLEVBQVIsQ0FBVyxPQUFYLEVBQW9CLFVBQUNYLENBQUQsRUFBTztBQUN2QixZQUFLSCxNQUFMLENBQVlXLEtBQVosQ0FBa0JSLENBQWxCOztBQUNBLFlBQUtZLElBQUwsQ0FBVSxPQUFWLHNCQUFnQ1osQ0FBaEM7QUFDSCxLQUhEOztBQUtBLFVBQUtTLEVBQUwsQ0FBUUksSUFBUixDQUFhLE1BQWIsRUFBcUIsWUFBTTtBQUN2QixZQUFLaEIsTUFBTCxDQUFZaUIsSUFBWixDQUFpQiwyQkFBakI7QUFDSCxLQUZEOztBQTdCVTtBQWdDYjs7O0VBdkN5QkMsa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5pbXBvcnQgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XG5pbXBvcnQgbG9nZ2VyIGZyb20gXCJpbmtsb2cuanNcIjtcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImV2ZW50c1wiO1xuXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi9jb25maWcvZGIuY29uZmlnXCI7XG5cbmV4cG9ydCBjbGFzcyBkYkNsaWVudCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG5cbiAgICBwdWJsaWMgbG9nZ2VyOiBhbnk7XG4gICAgcHVibGljIGRiQ29uZmlnOiB0eXBlb2YgY29uZmlnO1xuICAgIHB1YmxpYyBkYlVSTDogYW55O1xuICAgIHB1YmxpYyBkYjogbW9uZ29vc2UuQ29ubmVjdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmRiQ29uZmlnID0gY29uZmlnO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIGxvYWRpbmcgZGJDb25maWcnICsgZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRiVVJMID0gdGhpcy5kYkNvbmZpZy51cmw7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG1vbmdvb3NlLmNvbm5lY3QodGhpcy5kYlVSTCwge1xuICAgICAgICAgICAgICAgIHVzZU5ld1VybFBhcnNlcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB1c2VVbmlmaWVkVG9wb2xvZ3k6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcignRXJyb3IgQ29ubmVjdGluZyB0byBEQicpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRiID0gbW9uZ29vc2UuY29ubmVjdGlvbjtcblxuICAgICAgICB0aGlzLmRiLm9uKCdlcnJvcicsIChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihlKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnZXJyb3InLCBgZGIgZXJyb3I6ICR7ZX1gKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5kYi5vbmNlKCdvcGVuJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbygnW0RCXSBDb25uZWN0ZWQgdG8gTW9uZ29EQicpO1xuICAgICAgICB9KTtcbiAgICB9XG59Il19