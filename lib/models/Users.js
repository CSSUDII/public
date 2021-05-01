"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var UsersSchema = new Schema({
  name: {
    type: String,
    required: 'No Name Provided',
    unique: false
  },
  email: {
    type: String,
    required: 'No Email Provided',
    unique: true
  },
  password: {
    type: String,
    required: 'No Password Provided',
    unique: false
  }
});

var Users = _mongoose["default"].model("users", UsersSchema);

var _default = Users;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvVXNlcnMudHMiXSwibmFtZXMiOlsiU2NoZW1hIiwibW9uZ29vc2UiLCJVc2Vyc1NjaGVtYSIsIm5hbWUiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJ1bmlxdWUiLCJlbWFpbCIsInBhc3N3b3JkIiwiVXNlcnMiLCJtb2RlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBRUEsSUFBTUEsTUFBTSxHQUFHQyxxQkFBU0QsTUFBeEI7QUFDQSxJQUFNRSxXQUFXLEdBQUcsSUFBSUYsTUFBSixDQUFXO0FBQzNCRyxFQUFBQSxJQUFJLEVBQUU7QUFDRkMsSUFBQUEsSUFBSSxFQUFFQyxNQURKO0FBRUZDLElBQUFBLFFBQVEsRUFBRSxrQkFGUjtBQUdGQyxJQUFBQSxNQUFNLEVBQUU7QUFITixHQURxQjtBQU0zQkMsRUFBQUEsS0FBSyxFQUFFO0FBQ0hKLElBQUFBLElBQUksRUFBRUMsTUFESDtBQUVIQyxJQUFBQSxRQUFRLEVBQUUsbUJBRlA7QUFHSEMsSUFBQUEsTUFBTSxFQUFFO0FBSEwsR0FOb0I7QUFXM0JFLEVBQUFBLFFBQVEsRUFBRTtBQUNOTCxJQUFBQSxJQUFJLEVBQUVDLE1BREE7QUFFTkMsSUFBQUEsUUFBUSxFQUFFLHNCQUZKO0FBR05DLElBQUFBLE1BQU0sRUFBRTtBQUhGO0FBWGlCLENBQVgsQ0FBcEI7O0FBaUJBLElBQU1HLEtBQUssR0FBR1QscUJBQVNVLEtBQVQsQ0FBZSxPQUFmLEVBQXdCVCxXQUF4QixDQUFkOztlQUNlUSxLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xuXG5jb25zdCBTY2hlbWEgPSBtb25nb29zZS5TY2hlbWE7XG5jb25zdCBVc2Vyc1NjaGVtYSA9IG5ldyBTY2hlbWEoe1xuICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogJ05vIE5hbWUgUHJvdmlkZWQnLFxuICAgICAgICB1bmlxdWU6IGZhbHNlXG4gICAgfSxcbiAgICBlbWFpbDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiAnTm8gRW1haWwgUHJvdmlkZWQnLFxuICAgICAgICB1bmlxdWU6IHRydWVcbiAgICB9LFxuICAgIHBhc3N3b3JkOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6ICdObyBQYXNzd29yZCBQcm92aWRlZCcsXG4gICAgICAgIHVuaXF1ZTogZmFsc2VcbiAgICB9XG59KTtcbmNvbnN0IFVzZXJzID0gbW9uZ29vc2UubW9kZWwoXCJ1c2Vyc1wiLCBVc2Vyc1NjaGVtYSk7XG5leHBvcnQgZGVmYXVsdCBVc2VyczsiXX0=