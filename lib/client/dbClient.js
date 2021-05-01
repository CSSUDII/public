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

    ;
    _this.dbURL = _this.dbConfig.url;

    try {
      _mongoose["default"].connect(_this.dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    } catch (e) {
      _this.logger.error('Error Connecting to DB');
    }

    ;
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
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnQvZGJDbGllbnQudHMiXSwibmFtZXMiOlsiZGJDbGllbnQiLCJsb2dnZXIiLCJkYkNvbmZpZyIsImNvbmZpZyIsImUiLCJFcnJvciIsImRiVVJMIiwidXJsIiwibW9uZ29vc2UiLCJjb25uZWN0IiwidXNlTmV3VXJsUGFyc2VyIiwidXNlVW5pZmllZFRvcG9sb2d5IiwiZXJyb3IiLCJkYiIsImNvbm5lY3Rpb24iLCJvbiIsImVtaXQiLCJvbmNlIiwiaW5mbyIsIkV2ZW50RW1pdHRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFYUEsUTs7Ozs7QUFPVCxzQkFBYztBQUFBOztBQUFBOztBQUNWOztBQURVOztBQUFBOztBQUFBOztBQUFBOztBQUdWLFVBQUtDLE1BQUwsR0FBY0Esa0JBQWQ7O0FBRUEsUUFBSTtBQUNBLFlBQUtDLFFBQUwsR0FBZ0JDLGNBQWhCO0FBQ0gsS0FGRCxDQUVFLE9BQU9DLENBQVAsRUFBVTtBQUNSLFlBQU0sSUFBSUMsS0FBSixDQUFVLDJCQUEyQkQsQ0FBckMsQ0FBTjtBQUNIOztBQUFBO0FBRUQsVUFBS0UsS0FBTCxHQUFhLE1BQUtKLFFBQUwsQ0FBY0ssR0FBM0I7O0FBRUEsUUFBSTtBQUNBQywyQkFBU0MsT0FBVCxDQUFpQixNQUFLSCxLQUF0QixFQUE2QjtBQUN6QkksUUFBQUEsZUFBZSxFQUFFLElBRFE7QUFFekJDLFFBQUFBLGtCQUFrQixFQUFFO0FBRkssT0FBN0I7QUFJSCxLQUxELENBS0UsT0FBT1AsQ0FBUCxFQUFVO0FBQ1IsWUFBS0gsTUFBTCxDQUFZVyxLQUFaLENBQWtCLHdCQUFsQjtBQUNIOztBQUFBO0FBRUQsVUFBS0MsRUFBTCxHQUFVTCxxQkFBU00sVUFBbkI7O0FBRUEsVUFBS0QsRUFBTCxDQUFRRSxFQUFSLENBQVcsT0FBWCxFQUFvQixVQUFDWCxDQUFELEVBQU87QUFDdkIsWUFBS0gsTUFBTCxDQUFZVyxLQUFaLENBQWtCUixDQUFsQjs7QUFDQSxZQUFLWSxJQUFMLENBQVUsT0FBVixzQkFBZ0NaLENBQWhDO0FBQ0gsS0FIRDs7QUFLQSxVQUFLUyxFQUFMLENBQVFJLElBQVIsQ0FBYSxNQUFiLEVBQXFCLFlBQU07QUFDdkIsWUFBS2hCLE1BQUwsQ0FBWWlCLElBQVosQ0FBaUIsMkJBQWpCO0FBQ0gsS0FGRDs7QUE3QlU7QUFnQ2I7OztFQXZDeUJDLGtCOzs7QUF3QzdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xuaW1wb3J0IGxvZ2dlciBmcm9tIFwiaW5rbG9nLmpzXCI7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJldmVudHNcIjtcblxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vY29uZmlnL2RiLmNvbmZpZ1wiO1xuXG5leHBvcnQgY2xhc3MgZGJDbGllbnQgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuXG4gICAgcHVibGljIGxvZ2dlcjogYW55O1xuICAgIHB1YmxpYyBkYkNvbmZpZzogdHlwZW9mIGNvbmZpZztcbiAgICBwdWJsaWMgZGJVUkw6IGFueTtcbiAgICBwdWJsaWMgZGI6IG1vbmdvb3NlLkNvbm5lY3Rpb247XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5kYkNvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciBsb2FkaW5nIGRiQ29uZmlnJyArIGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZGJVUkwgPSB0aGlzLmRiQ29uZmlnLnVybDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbW9uZ29vc2UuY29ubmVjdCh0aGlzLmRiVVJMLCB7XG4gICAgICAgICAgICAgICAgdXNlTmV3VXJsUGFyc2VyOiB0cnVlLFxuICAgICAgICAgICAgICAgIHVzZVVuaWZpZWRUb3BvbG9neTogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKCdFcnJvciBDb25uZWN0aW5nIHRvIERCJylcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmRiID0gbW9uZ29vc2UuY29ubmVjdGlvbjtcblxuICAgICAgICB0aGlzLmRiLm9uKCdlcnJvcicsIChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihlKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnZXJyb3InLCBgZGIgZXJyb3I6ICR7ZX1gKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5kYi5vbmNlKCdvcGVuJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbygnW0RCXSBDb25uZWN0ZWQgdG8gTW9uZ29EQicpO1xuICAgICAgICB9KTtcbiAgICB9O1xufTsiXX0=