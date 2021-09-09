"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = void 0;

var _inklog = _interopRequireDefault(require("inklog.js"));

var _fs = _interopRequireDefault(require("fs"));

var _Server = require("../server/Server");

var _DatabaseClient = _interopRequireDefault(require("./DatabaseClient"));

var _defaults = require("../defaults");

require("regenerator-runtime/runtime.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Client = /*#__PURE__*/function () {
  /**
   * Creates a new Client
   * @constructor
   */
  function Client() {
    _classCallCheck(this, Client);

    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "fs", void 0);

    _defineProperty(this, "default", void 0);

    _defineProperty(this, "port", void 0);

    _defineProperty(this, "debug", void 0);

    _defineProperty(this, "server", void 0);

    this.logger = _inklog["default"];
    this.fs = _fs["default"];
    this["default"] = _defaults.defaults;
  }

  _createClass(Client, [{
    key: "setupDatabase",
    value: function () {
      var _setupDatabase = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _DatabaseClient["default"].$connect().then(function () {
                  _this.logger.info("[DB] Connected to database");
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function setupDatabase() {
        return _setupDatabase.apply(this, arguments);
      }

      return setupDatabase;
    }()
  }, {
    key: "checks",
    value: function checks() {
      try {
        this.port = process.env.PORT;
        this.debug = process.env.DEBUG;
      } catch (e) {
        this.logger.error(e);
        return;
      }

      if (!this.port) this.port = this["default"].port;
      if (!this.debug) this.debug = this["default"].debug;
    }
  }, {
    key: "listen",
    value: function listen() {
      var _this2 = this;

      var port = this.port || 8080;
      this.server = _Server.server.listen(port, "0.0.0.0", function () {
        return (// Bind on 0.0.0.0, It allows you to access the API from any IP
          _this2.logger.info("API Live on: ".concat(port))
        );
      });
    }
    /**
     * Loads the client
     * @returns {void}
     */

  }, {
    key: "load",
    value: function load() {
      this.setupDatabase();
      this.checks();
      return this.listen();
    }
  }]);

  return Client;
}();

exports.Client = Client;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnQvQ2xpZW50LnRzIl0sIm5hbWVzIjpbIkNsaWVudCIsImxvZ2dlciIsImZzIiwiZGVmYXVsdHMiLCJwcmlzbWEiLCIkY29ubmVjdCIsInRoZW4iLCJpbmZvIiwicG9ydCIsInByb2Nlc3MiLCJlbnYiLCJQT1JUIiwiZGVidWciLCJERUJVRyIsImUiLCJlcnJvciIsInNlcnZlciIsImxpc3RlbiIsInNldHVwRGF0YWJhc2UiLCJjaGVja3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7OztJQUVhQSxNO0FBV1Q7QUFDSjtBQUNBO0FBQ0E7QUFDSSxvQkFBYztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUNWLFNBQUtDLE1BQUwsR0FBY0Esa0JBQWQ7QUFDQSxTQUFLQyxFQUFMLEdBQVVBLGNBQVY7QUFDQSxzQkFBZUMsa0JBQWY7QUFDSDs7Ozs7bUZBRUQ7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQ1VDLDJCQUFPQyxRQUFQLEdBQWtCQyxJQUFsQixDQUF1QixZQUFNO0FBQy9CLGtCQUFBLEtBQUksQ0FBQ0wsTUFBTCxDQUFZTSxJQUFaLENBQWlCLDRCQUFqQjtBQUNILGlCQUZLLENBRFY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTzs7Ozs7Ozs7OztXQU1BLGtCQUF1QjtBQUNuQixVQUFJO0FBQ0EsYUFBS0MsSUFBTCxHQUFZQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsSUFBeEI7QUFDQSxhQUFLQyxLQUFMLEdBQWFILE9BQU8sQ0FBQ0MsR0FBUixDQUFZRyxLQUF6QjtBQUNILE9BSEQsQ0FHRSxPQUFPQyxDQUFQLEVBQVU7QUFDVCxhQUFLYixNQUFMLENBQVljLEtBQVosQ0FBa0JELENBQWxCO0FBQ0E7QUFDRjs7QUFFRCxVQUFJLENBQUMsS0FBS04sSUFBVixFQUFnQixLQUFLQSxJQUFMLEdBQVksZ0JBQWFBLElBQXpCO0FBQ2hCLFVBQUksQ0FBQyxLQUFLSSxLQUFWLEVBQWlCLEtBQUtBLEtBQUwsR0FBYSxnQkFBYUEsS0FBMUI7QUFFcEI7OztXQUVELGtCQUF1QjtBQUFBOztBQUNuQixVQUFNSixJQUFZLEdBQUcsS0FBS0EsSUFBTCxJQUFhLElBQWxDO0FBQ0EsV0FBS1EsTUFBTCxHQUFjQSxlQUFPQyxNQUFQLENBQWNULElBQWQsRUFBb0IsU0FBcEIsRUFBK0I7QUFBQSxlQUFNO0FBQy9DLFVBQUEsTUFBSSxDQUFDUCxNQUFMLENBQVlNLElBQVosd0JBQWlDQyxJQUFqQztBQUR5QztBQUFBLE9BQS9CLENBQWQ7QUFHSDtBQUVEO0FBQ0o7QUFDQTtBQUNBOzs7O1dBQ0ksZ0JBQW9CO0FBQ2hCLFdBQUtVLGFBQUw7QUFDQSxXQUFLQyxNQUFMO0FBQ0QsYUFBTyxLQUFLRixNQUFMLEVBQVA7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbmltcG9ydCBsb2dnZXIgZnJvbSBcImlua2xvZy5qc1wiO1xuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xuXG5pbXBvcnQgeyBzZXJ2ZXIgfSBmcm9tIFwiLi4vc2VydmVyL1NlcnZlclwiO1xuaW1wb3J0IHByaXNtYSBmcm9tIFwiLi9EYXRhYmFzZUNsaWVudFwiO1xuXG5pbXBvcnQgeyBkZWZhdWx0cyB9IGZyb20gXCIuLi9kZWZhdWx0c1wiO1xuaW1wb3J0IHsgU2VydmVyIH0gZnJvbSBcImh0dHBcIjtcblxuaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBDbGllbnQge1xuXG4gICAgcHVibGljIGxvZ2dlcjogdHlwZW9mIGxvZ2dlcjtcbiAgICBwdWJsaWMgZnM6IHR5cGVvZiBmcztcbiAgICBwdWJsaWMgZGVmYXVsdDogdHlwZW9mIGRlZmF1bHRzO1xuXG4gICAgcHVibGljIHBvcnQ6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICBwdWJsaWMgZGVidWc6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBwdWJsaWMgc2VydmVyOiBTZXJ2ZXIgfCB1bmRlZmluZWQ7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IENsaWVudFxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgICAgICAgdGhpcy5mcyA9IGZzO1xuICAgICAgICB0aGlzLmRlZmF1bHQgPSBkZWZhdWx0cztcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIHNldHVwRGF0YWJhc2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IHByaXNtYS4kY29ubmVjdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhcIltEQl0gQ29ubmVjdGVkIHRvIGRhdGFiYXNlXCIpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tzKCk6IHZvaWQge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5wb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCBhcyBhbnk7XG4gICAgICAgICAgICB0aGlzLmRlYnVnID0gcHJvY2Vzcy5lbnYuREVCVUcgYXMgYW55O1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGUpO1xuICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMucG9ydCkgdGhpcy5wb3J0ID0gdGhpcy5kZWZhdWx0LnBvcnQ7XG4gICAgICAgIGlmICghdGhpcy5kZWJ1ZykgdGhpcy5kZWJ1ZyA9IHRoaXMuZGVmYXVsdC5kZWJ1ZztcblxuICAgIH1cblxuICAgIHByaXZhdGUgbGlzdGVuKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBwb3J0OiBudW1iZXIgPSB0aGlzLnBvcnQgfHwgODA4MDtcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBzZXJ2ZXIubGlzdGVuKHBvcnQsIFwiMC4wLjAuMFwiLCAoKSA9PiAvLyBCaW5kIG9uIDAuMC4wLjAsIEl0IGFsbG93cyB5b3UgdG8gYWNjZXNzIHRoZSBBUEkgZnJvbSBhbnkgSVBcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYEFQSSBMaXZlIG9uOiAke3BvcnR9YCksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZHMgdGhlIGNsaWVudFxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqL1xuICAgIHB1YmxpYyBsb2FkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNldHVwRGF0YWJhc2UoKTtcbiAgICAgICAgdGhpcy5jaGVja3MoKTtcbiAgICAgICByZXR1cm4gdGhpcy5saXN0ZW4oKTtcbiAgICB9XG59Il19