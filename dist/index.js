"use strict";

var _Client = require("./client/Client");

var _dotenv = require("dotenv");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _dotenv.config)({
  //path: "/Volumes/Lucas's HHD/git/public/@env/.env"
  path: _path["default"].resolve("@env/.env")
});
var client = new _Client.Client({
  test: false
});
client.load();
console.log(process.env);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJwYXRoIiwicmVzb2x2ZSIsImNsaWVudCIsIkNsaWVudCIsInRlc3QiLCJsb2FkIiwiY29uc29sZSIsImxvZyIsInByb2Nlc3MiLCJlbnYiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQSxvQkFBTztBQUNIO0FBQ0FBLEVBQUFBLElBQUksRUFBRUEsaUJBQUtDLE9BQUwsQ0FBYSxXQUFiO0FBRkgsQ0FBUDtBQUlBLElBQU1DLE1BQWMsR0FBRyxJQUFJQyxjQUFKLENBQVc7QUFBRUMsRUFBQUEsSUFBSSxFQUFFO0FBQVIsQ0FBWCxDQUF2QjtBQUNBRixNQUFNLENBQUNHLElBQVA7QUFFQUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLE9BQU8sQ0FBQ0MsR0FBcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDbGllbnQgfSBmcm9tIFwiLi9jbGllbnQvQ2xpZW50XCI7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiZG90ZW52XCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuY29uZmlnKHtcbiAgICAvL3BhdGg6IFwiL1ZvbHVtZXMvTHVjYXMncyBISEQvZ2l0L3B1YmxpYy9AZW52Ly5lbnZcIlxuICAgIHBhdGg6IHBhdGgucmVzb2x2ZShcIkBlbnYvLmVudlwiKVxufSk7XG5jb25zdCBjbGllbnQ6IENsaWVudCA9IG5ldyBDbGllbnQoeyB0ZXN0OiBmYWxzZSB9KTtcbmNsaWVudC5sb2FkKCk7XG5cbmNvbnNvbGUubG9nKHByb2Nlc3MuZW52KTsiXX0=