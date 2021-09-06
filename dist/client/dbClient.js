"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbClient = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _inklog = _interopRequireDefault(require("inklog.js"));

var _events = _interopRequireDefault(require("events"));

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

    _defineProperty(_assertThisInitialized(_this), "dbURL", void 0);

    _defineProperty(_assertThisInitialized(_this), "db", void 0);

    _this.logger = _inklog["default"];
    _this.dbURL = process.env.DB_URL;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnQvZGJDbGllbnQudHMiXSwibmFtZXMiOlsiZGJDbGllbnQiLCJsb2dnZXIiLCJkYlVSTCIsInByb2Nlc3MiLCJlbnYiLCJEQl9VUkwiLCJtb25nb29zZSIsImNvbm5lY3QiLCJ1c2VOZXdVcmxQYXJzZXIiLCJ1c2VVbmlmaWVkVG9wb2xvZ3kiLCJlIiwiZXJyb3IiLCJkYiIsImNvbm5lY3Rpb24iLCJvbiIsImVtaXQiLCJvbmNlIiwiaW5mbyIsIkV2ZW50RW1pdHRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFYUEsUTs7Ozs7QUFNVCxzQkFBYztBQUFBOztBQUFBOztBQUNWOztBQURVOztBQUFBOztBQUFBOztBQUdWLFVBQUtDLE1BQUwsR0FBY0Esa0JBQWQ7QUFFQSxVQUFLQyxLQUFMLEdBQWFDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxNQUF6Qjs7QUFFQSxRQUFJO0FBQ0FDLDJCQUFTQyxPQUFULENBQWlCLE1BQUtMLEtBQXRCLEVBQTZCO0FBQ3pCTSxRQUFBQSxlQUFlLEVBQUUsSUFEUTtBQUV6QkMsUUFBQUEsa0JBQWtCLEVBQUU7QUFGSyxPQUE3QjtBQUlILEtBTEQsQ0FLRSxPQUFPQyxDQUFQLEVBQVU7QUFDUixZQUFLVCxNQUFMLENBQVlVLEtBQVosQ0FBa0Isd0JBQWxCO0FBQ0g7O0FBRUQsVUFBS0MsRUFBTCxHQUFVTixxQkFBU08sVUFBbkI7O0FBRUEsVUFBS0QsRUFBTCxDQUFRRSxFQUFSLENBQVcsT0FBWCxFQUFvQixVQUFDSixDQUFELEVBQU87QUFDdkIsWUFBS1QsTUFBTCxDQUFZVSxLQUFaLENBQWtCRCxDQUFsQjs7QUFDQSxZQUFLSyxJQUFMLENBQVUsT0FBVixzQkFBZ0NMLENBQWhDO0FBQ0gsS0FIRDs7QUFLQSxVQUFLRSxFQUFMLENBQVFJLElBQVIsQ0FBYSxNQUFiLEVBQXFCLFlBQU07QUFDdkIsWUFBS2YsTUFBTCxDQUFZZ0IsSUFBWixDQUFpQiwyQkFBakI7QUFDSCxLQUZEOztBQXZCVTtBQTBCYjs7O0VBaEN5QkMsa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5pbXBvcnQgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XG5pbXBvcnQgbG9nZ2VyIGZyb20gXCJpbmtsb2cuanNcIjtcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImV2ZW50c1wiO1xuXG5leHBvcnQgY2xhc3MgZGJDbGllbnQgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuXG4gICAgcHVibGljIGxvZ2dlcjogYW55O1xuICAgIHB1YmxpYyBkYlVSTDogc3RyaW5nO1xuICAgIHB1YmxpYyBkYjogbW9uZ29vc2UuQ29ubmVjdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuXG4gICAgICAgIHRoaXMuZGJVUkwgPSBwcm9jZXNzLmVudi5EQl9VUkwgYXMgc3RyaW5nO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBtb25nb29zZS5jb25uZWN0KHRoaXMuZGJVUkwsIHtcbiAgICAgICAgICAgICAgICB1c2VOZXdVcmxQYXJzZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgdXNlVW5pZmllZFRvcG9sb2d5OiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoJ0Vycm9yIENvbm5lY3RpbmcgdG8gREInKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kYiA9IG1vbmdvb3NlLmNvbm5lY3Rpb247XG5cbiAgICAgICAgdGhpcy5kYi5vbignZXJyb3InLCAoZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoZSk7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgYGRiIGVycm9yOiAke2V9YCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZGIub25jZSgnb3BlbicsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oJ1tEQl0gQ29ubmVjdGVkIHRvIE1vbmdvREInKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==