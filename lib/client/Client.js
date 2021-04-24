"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = void 0;

var _jsYaml = _interopRequireDefault(require("js-yaml"));

var _inklog = _interopRequireDefault(require("inklog.js"));

var _fs = _interopRequireDefault(require("fs"));

var _events = _interopRequireDefault(require("events"));

var _Server = _interopRequireDefault(require("../server/Server"));

var _Defaults = require("../Defaults");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Client extends _events.default {
  constructor(test) {
    super();
    this.test = test;
    this.logger = _inklog.default;
    this.fs = _fs.default;
    this.default = _Defaults.defaults;
  }

  loadConfig() {
    try {
      this.config = _jsYaml.default.load(this.fs.readFileSync('./config.yml', 'utf8'));
      this.logger.info('Loaded Config File');
      this.emit('configLoaded');
    } catch (e) {
      this.logger.error('Error loading Config ' + e);
      this.logger.warn('Using Default Settings');
      this.emit('error', e);
    }

    ;
  }

  checks() {
    try {
      this.port = this.config.port;
      this.debug = this.config.debug;
      this.emit('runningChecks');
    } catch (e) {
      this.emit('error', e);
    }

    ;
    if (!this.port) this.port = this.default.port;
    if (!this.debug) this.debug = this.default.debug;
  }

  listen() {
    if (this.test) {
      this.server = _Server.default.listen(this.port);
    } else {
      this.server = _Server.default.listen(this.port, () => this.logger.info(`API Live on: ${this.port}`) && this.emit('ready'));
    }

    ;
  }

  load() {
    this.loadConfig();
    this.checks();
    this.listen();
    return;
  }

}

exports.Client = Client;
;