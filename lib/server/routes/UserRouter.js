"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _Users = _interopRequireDefault(require("../../models/Users"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _jsYaml = _interopRequireDefault(require("js-yaml"));

var _fs = _interopRequireDefault(require("fs"));

var _checkToken = _interopRequireDefault(require("../RouterFunctions/checkToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();

class UsersRouter {
  constructor() {
    this.dbConfig = _jsYaml.default.load(_fs.default.readFileSync('./config/db.config.yml', 'utf8'));

    const dbConfig = _jsYaml.default.load(_fs.default.readFileSync('./config/db.config.yml', 'utf8'));

    router.use(_bodyParser.default.urlencoded({
      extended: false
    }));
    router.use(_bodyParser.default.json());
    router.post('/register', (req, res) => {
      var hashedPassword = _bcryptjs.default.hashSync(req.body.password, 8);

      _Users.default.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      }, function (err, user) {
        if (err) return res.status(500).send("There was a problem registering the user.");

        var token = _jsonwebtoken.default.sign({
          id: user._id
        }, dbConfig.token, {
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
    router.post('/login', (req, res) => {
      _Users.default.findOne({
        email: req.body.email
      }, (err, user) => {
        if (err) return res.status(500).send(`Server Error: ${err}`);
        if (!user) return res.status(404).send('No user was found.');

        var passwordIsValid = _bcryptjs.default.compareSync(req.body.password, user.password);

        if (!passwordIsValid) return res.status(401).send({
          auth: false,
          token: null
        });

        var token = _jsonwebtoken.default.sign({
          id: user._id
        }, dbConfig.token, {
          expiresIn: 86400
        });

        res.status(200).send({
          auth: true,
          token: token
        });
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