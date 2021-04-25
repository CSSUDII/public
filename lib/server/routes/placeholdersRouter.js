"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _dbClient = require("../../client/dbClient");

const router = (0, _express.Router)();

class placeholdersRouter extends _dbClient.dbClient {
  constructor() {
    super();
    const db = this.placeholdersDB;
    router.get('/:name', (req, res, next) => {
      const name = req.params.name;
      res.json({
        name: name,
        data: `Example Data for ${name}`,
        text: 'Not Emplanted'
      });
    });
  }

}

;
new placeholdersRouter();
var _default = router;
exports.default = _default;