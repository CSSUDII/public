"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Client = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _jsYaml = require("js-yaml");

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _inklog = require("inklog.js");

var _inklog2 = _interopRequireDefault(_inklog);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _events = require("events");

var _events2 = _interopRequireDefault(_events);

var _Defaults = require("./Defaults");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // WE-BT16 API


var server = (0, _express2.default)();

var Client = exports.Client = function (_EventEmitter) {
    _inherits(Client, _EventEmitter);

    function Client() {
        _classCallCheck(this, Client);

        var _this = _possibleConstructorReturn(this, (Client.__proto__ || Object.getPrototypeOf(Client)).call(this));

        _this.logger = _inklog2.default;
        _this.fs = _fs2.default;
        _this.default = _Defaults.defaults;
        return _this;
    }

    _createClass(Client, [{
        key: "loadConfig",
        value: function loadConfig() {
            try {
                this.config = _jsYaml2.default.load(this.fs.readFileSync('./config.yml', 'utf8'));
                this.logger.info('Loaded Config File');
                this.emit('configLoaded');
            } catch (e) {
                this.logger.error('Error loading Config ' + e);
                this.logger.warn('Using Default Settings');
                this.emit('error', e);
            };
        }
    }, {
        key: "checks",
        value: function checks() {
            try {
                this.port = this.config.port;
                this.debug = this.config.debug;
                this.emit('runningChecks');
            } catch (e) {
                this.emit('error', e);
            };

            if (!this.port) this.port = this.default.port;
            if (!this.debug) this.debug = this.default.debug;
        }
    }, {
        key: "get",
        value: function get() {
            var _this2 = this;

            server.get('/', function (req, res) {
                if (_this2.debug) {
                    _this2.logger.debug('Received a GET HTTP method');
                    _this2.emit('getEvent');
                };
                return res.send('Received a GET HTTP method');
            });
        }
    }, {
        key: "listen",
        value: function listen() {
            var _this3 = this;

            server.listen(this.port, function () {
                return _this3.logger.info("API Live on: " + _this3.port) && _this3.emit('ready');
            });
        }
    }, {
        key: "load",
        value: function load() {
            this.loadConfig();
            this.checks();
            this.get();
            this.listen();
        }
    }]);

    return Client;
}(_events2.default);

;