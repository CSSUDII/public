"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

const router = (0, _express.Router)();

class placeholdersRouter {
  constructor() {
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