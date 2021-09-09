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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnQvQ2xpZW50LnRzIl0sIm5hbWVzIjpbIkNsaWVudCIsImxvZ2dlciIsImZzIiwiZGVmYXVsdHMiLCJwcmlzbWEiLCIkY29ubmVjdCIsInRoZW4iLCJpbmZvIiwicG9ydCIsInByb2Nlc3MiLCJlbnYiLCJQT1JUIiwiZGVidWciLCJERUJVRyIsImUiLCJlcnJvciIsInNlcnZlciIsImxpc3RlbiIsInNldHVwRGF0YWJhc2UiLCJjaGVja3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7OztJQUdhQSxNO0FBV1Q7QUFDSjtBQUNBO0FBQ0E7QUFDSSxvQkFBYztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUNWLFNBQUtDLE1BQUwsR0FBY0Esa0JBQWQ7QUFDQSxTQUFLQyxFQUFMLEdBQVVBLGNBQVY7QUFDQSxzQkFBZUMsa0JBQWY7QUFDSDs7Ozs7bUZBRUQ7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQ1VDLDJCQUFPQyxRQUFQLEdBQWtCQyxJQUFsQixDQUF1QixZQUFNO0FBQy9CLGtCQUFBLEtBQUksQ0FBQ0wsTUFBTCxDQUFZTSxJQUFaLENBQWlCLDRCQUFqQjtBQUNILGlCQUZLLENBRFY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTzs7Ozs7Ozs7OztXQU1BLGtCQUF1QjtBQUNuQixVQUFJO0FBQ0EsYUFBS0MsSUFBTCxHQUFZQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsSUFBeEI7QUFDQSxhQUFLQyxLQUFMLEdBQWFILE9BQU8sQ0FBQ0MsR0FBUixDQUFZRyxLQUF6QjtBQUNILE9BSEQsQ0FHRSxPQUFPQyxDQUFQLEVBQVU7QUFDVCxhQUFLYixNQUFMLENBQVljLEtBQVosQ0FBa0JELENBQWxCO0FBQ0E7QUFDRjs7QUFFRCxVQUFJLENBQUMsS0FBS04sSUFBVixFQUFnQixLQUFLQSxJQUFMLEdBQVksZ0JBQWFBLElBQXpCO0FBQ2hCLFVBQUksQ0FBQyxLQUFLSSxLQUFWLEVBQWlCLEtBQUtBLEtBQUwsR0FBYSxnQkFBYUEsS0FBMUI7QUFFcEI7OztXQUVELGtCQUF1QjtBQUFBOztBQUNuQixVQUFNSixJQUFZLEdBQUcsS0FBS0EsSUFBTCxJQUFhLElBQWxDO0FBQ0EsV0FBS1EsTUFBTCxHQUFjQSxlQUFPQyxNQUFQLENBQWNULElBQWQsRUFBb0IsU0FBcEIsRUFBK0I7QUFBQSxlQUFNO0FBQy9DLFVBQUEsTUFBSSxDQUFDUCxNQUFMLENBQVlNLElBQVosd0JBQWlDQyxJQUFqQztBQUR5QztBQUFBLE9BQS9CLENBQWQ7QUFHSDtBQUVEO0FBQ0o7QUFDQTtBQUNBOzs7O1dBQ0ksZ0JBQW9CO0FBQ2hCLFdBQUtVLGFBQUw7QUFDQSxXQUFLQyxNQUFMO0FBQ0QsYUFBTyxLQUFLRixNQUFMLEVBQVA7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbmltcG9ydCBsb2dnZXIgZnJvbSBcImlua2xvZy5qc1wiO1xuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xuXG5pbXBvcnQgeyBzZXJ2ZXIgfSBmcm9tIFwiLi4vc2VydmVyL1NlcnZlclwiO1xuaW1wb3J0IHByaXNtYSBmcm9tIFwiLi9EYXRhYmFzZUNsaWVudFwiO1xuXG5pbXBvcnQgeyBkZWZhdWx0cyB9IGZyb20gXCIuLi9kZWZhdWx0c1wiO1xuaW1wb3J0IHsgU2VydmVyIH0gZnJvbSBcImh0dHBcIjtcblxuaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzXCI7XG5pbXBvcnQgeyBQcmlzbWEsIFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xuXG5leHBvcnQgY2xhc3MgQ2xpZW50IHtcblxuICAgIHB1YmxpYyBsb2dnZXI6IHR5cGVvZiBsb2dnZXI7XG4gICAgcHVibGljIGZzOiB0eXBlb2YgZnM7XG4gICAgcHVibGljIGRlZmF1bHQ6IHR5cGVvZiBkZWZhdWx0cztcblxuICAgIHB1YmxpYyBwb3J0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgcHVibGljIGRlYnVnOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgcHVibGljIHNlcnZlcjogU2VydmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBDbGllbnRcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gICAgICAgIHRoaXMuZnMgPSBmcztcbiAgICAgICAgdGhpcy5kZWZhdWx0ID0gZGVmYXVsdHM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBzZXR1cERhdGFiYXNlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCBwcmlzbWEuJGNvbm5lY3QoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oXCJbREJdIENvbm5lY3RlZCB0byBkYXRhYmFzZVwiKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrcygpOiB2b2lkIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMucG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgYXMgYW55O1xuICAgICAgICAgICAgdGhpcy5kZWJ1ZyA9IHByb2Nlc3MuZW52LkRFQlVHIGFzIGFueTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihlKTtcbiAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnBvcnQpIHRoaXMucG9ydCA9IHRoaXMuZGVmYXVsdC5wb3J0O1xuICAgICAgICBpZiAoIXRoaXMuZGVidWcpIHRoaXMuZGVidWcgPSB0aGlzLmRlZmF1bHQuZGVidWc7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGxpc3RlbigpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcG9ydDogbnVtYmVyID0gdGhpcy5wb3J0IHx8IDgwODA7XG4gICAgICAgIHRoaXMuc2VydmVyID0gc2VydmVyLmxpc3Rlbihwb3J0LCBcIjAuMC4wLjBcIiwgKCkgPT4gLy8gQmluZCBvbiAwLjAuMC4wLCBJdCBhbGxvd3MgeW91IHRvIGFjY2VzcyB0aGUgQVBJIGZyb20gYW55IElQXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGBBUEkgTGl2ZSBvbjogJHtwb3J0fWApLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWRzIHRoZSBjbGllbnRcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKi9cbiAgICBwdWJsaWMgbG9hZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXR1cERhdGFiYXNlKCk7XG4gICAgICAgIHRoaXMuY2hlY2tzKCk7XG4gICAgICAgcmV0dXJuIHRoaXMubGlzdGVuKCk7XG4gICAgfVxufSJdfQ==