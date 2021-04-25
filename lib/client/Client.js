"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = void 0;

var _jsYaml = _interopRequireDefault(require("js-yaml"));

var _inklog = _interopRequireDefault(require("inklog.js"));

var _fs = _interopRequireDefault(require("fs"));

var _events = _interopRequireDefault(require("events"));

var _mongoose = _interopRequireDefault(require("mongoose"));

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

    try {
      this.dbConfig = _jsYaml.default.load(this.fs.readFileSync('./config/db.config.yml', 'utf8'));
    } catch (e) {
      this.emit('error', e);
      throw new Error('Error loading dbConfig' + e);
    }
  }

  checks() {
    try {
      // Main Config
      this.port = this.config.port;
      this.debug = this.config.debug; // Databace Config

      this.dbURL = this.dbConfig.url;
      this.emit('runningChecks');
    } catch (e) {
      this.emit('error', e);
    }

    ;
    if (!this.port) this.port = this.default.port;
    if (!this.debug) this.debug = this.default.debug;
  }

  connectDB() {
    try {
      _mongoose.default.connect(this.dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    } catch (e) {
      this.logger.error('Error Connecting to DB');
    }

    ;
  }

  dbInit() {
    this.db = _mongoose.default.connection;
    this.db.on('error', e => {
      this.logger.error(e);
      this.emit('error', `db error: ${e}`);
    });
    this.db.once('open', () => {
      this.logger.info('[DB] Connected to MongoDB');
    });
  }

  dbDataSchema() {
    this.placeHoldersSchema = new _mongoose.default.Schema({
      name: String,
      data: String
    });
  }

  dbDataModel() {
    this.placeholdersDB = _mongoose.default.model('placeholdersDB', this.placeHoldersSchema);
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
    this.connectDB();
    this.dbInit();
    this.dbDataSchema();
    this.dbDataModel();
    this.listen();
    return;
  }

}

exports.Client = Client;
;