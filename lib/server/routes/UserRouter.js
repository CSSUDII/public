"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _Users = _interopRequireDefault(require("../../models/Users"));

var _dbConfig = _interopRequireDefault(require("../../../config/db.config.js"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _checkToken = _interopRequireDefault(require("../RouterFunctions/checkToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();

class UsersRouter {
  constructor() {
    router.use(_bodyParser.default.urlencoded({
      extended: false
    }));
    router.use(_bodyParser.default.json());
    router.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
      next();
    });
    router.post('/register', async (req, res) => {
      var hashedPassword = _bcryptjs.default.hashSync(req.body.password, 8);

      const doseEmailExist = await _Users.default.findOne({
        email: req.body.email
      });
      if (doseEmailExist) return res.status(400).json({
        error: "Email already exists"
      });

      _Users.default.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      }, function (err, user) {
        if (err) return res.status(500).send("There was a problem registering the user.");

        var token = _jsonwebtoken.default.sign({
          id: user._id
        }, _dbConfig.default.token, {
          expiresIn: 86400
        });

        res.status(200).send({
          auth: true,
          token: token
        });
      });
    });
    router.get('/me', _checkToken.default, (req, res, next) => {
      _Users.default.findById(req.userId, {
        password: 0
      }, (err, user) => {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user was found.");
        res.status(200).send(user);
      });
    });
    router.post("/login", async (req, res) => {
      const user = await _Users.default.findOne({
        email: req.body.email
      });
      if (!user) return res.status(400).json({
        error: "No user was found"
      });
      const validPassword = await _bcryptjs.default.compare(req.body.password, user.password);
      if (!validPassword) return res.status(400).json({
        error: "Password is wrong",
        auth: false,
        token: null
      });

      const token = _jsonwebtoken.default.sign({
        name: user.name,
        id: user._id
      }, _dbConfig.default.token);

      res.header("auth-token", token).json({
        error: null,
        data: {
          token
        }
      });
    });
    router.get('/logout', (req, res) => {
      res.status(200).send({
        auth: false,
        token: null
      });
    });
  }

}

;
new UsersRouter();
var _default = router;
exports.default = _default;