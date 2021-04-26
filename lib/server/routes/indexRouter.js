"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

const router = (0, _express.Router)();

class indexRouter {
  constructor() {
    router.get('/', (req, res, next) => {
      res.send('Hello World');
    });
  }

}

;
new indexRouter();
var _default = router;
exports.default = _default;