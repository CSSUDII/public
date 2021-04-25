"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbClient = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _jsYaml = _interopRequireDefault(require("js-yaml"));

var _inklog = _interopRequireDefault(require("inklog.js"));

var _fs = _interopRequireDefault(require("fs"));

var _events = _interopRequireDefault(require("events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class dbClient extends _events.default {
  constructor() {
    super();
    this.logger = _inklog.default;
    this.fs = _fs.default;

    try {
      this.dbConfig = _jsYaml.default.load(_fs.default.readFileSync('./config/db.config.yml', 'utf8'));
    } catch (e) {
      throw new Error('Error loading dbConfig' + e);
    }

    ;
    this.dbURL = this.dbConfig.url;

    try {
      _mongoose.default.connect(this.dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    } catch (e) {
      this.logger.error('Error Connecting to DB');
    }

    ;
    this.db = _mongoose.default.connection;
    this.db.on('error', e => {
      this.logger.error(e);
      this.emit('error', `db error: ${e}`);
    });
    this.db.once('open', () => {
      this.logger.info('[DB] Connected to MongoDB');
    });
    this.placeHoldersSchema = new _mongoose.default.Schema({
      name: String,
      data: String
    });
    this.placeholdersDB = _mongoose.default.model('placeholdersDB', this.placeHoldersSchema);
  }

}

exports.dbClient = dbClient;
;