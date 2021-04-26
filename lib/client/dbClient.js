"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbClient = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _inklog = _interopRequireDefault(require("inklog.js"));

var _events = _interopRequireDefault(require("events"));

var _db = _interopRequireDefault(require("../../config/db.config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class dbClient extends _events.default {
  constructor() {
    super();
    this.logger = _inklog.default;

    try {
      this.dbConfig = _db.default;
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
  }

}

exports.dbClient = dbClient;
;