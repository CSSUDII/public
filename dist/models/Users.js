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
  },
  bypassImageLimit: {
    type: Boolean
  }
});

var Users = _mongoose["default"].model("users", UsersSchema);

var _default = Users;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvVXNlcnMudHMiXSwibmFtZXMiOlsiU2NoZW1hIiwibW9uZ29vc2UiLCJVc2Vyc1NjaGVtYSIsIm5hbWUiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJ1bmlxdWUiLCJlbWFpbCIsInBhc3N3b3JkIiwiYnlwYXNzSW1hZ2VMaW1pdCIsIkJvb2xlYW4iLCJVc2VycyIsIm1vZGVsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFFQSxJQUFNQSxNQUFNLEdBQUdDLHFCQUFTRCxNQUF4QjtBQUNBLElBQU1FLFdBQVcsR0FBRyxJQUFJRixNQUFKLENBQVc7QUFDM0JHLEVBQUFBLElBQUksRUFBRTtBQUNGQyxJQUFBQSxJQUFJLEVBQUVDLE1BREo7QUFFRkMsSUFBQUEsUUFBUSxFQUFFLGtCQUZSO0FBR0ZDLElBQUFBLE1BQU0sRUFBRTtBQUhOLEdBRHFCO0FBTTNCQyxFQUFBQSxLQUFLLEVBQUU7QUFDSEosSUFBQUEsSUFBSSxFQUFFQyxNQURIO0FBRUhDLElBQUFBLFFBQVEsRUFBRSxtQkFGUDtBQUdIQyxJQUFBQSxNQUFNLEVBQUU7QUFITCxHQU5vQjtBQVczQkUsRUFBQUEsUUFBUSxFQUFFO0FBQ05MLElBQUFBLElBQUksRUFBRUMsTUFEQTtBQUVOQyxJQUFBQSxRQUFRLEVBQUUsc0JBRko7QUFHTkMsSUFBQUEsTUFBTSxFQUFFO0FBSEYsR0FYaUI7QUFnQjNCRyxFQUFBQSxnQkFBZ0IsRUFBRTtBQUNkTixJQUFBQSxJQUFJLEVBQUVPO0FBRFE7QUFoQlMsQ0FBWCxDQUFwQjs7QUFvQkEsSUFBTUMsS0FBSyxHQUFHWCxxQkFBU1ksS0FBVCxDQUFlLE9BQWYsRUFBd0JYLFdBQXhCLENBQWQ7O2VBQ2VVLEsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XG5cbmNvbnN0IFNjaGVtYSA9IG1vbmdvb3NlLlNjaGVtYTtcbmNvbnN0IFVzZXJzU2NoZW1hID0gbmV3IFNjaGVtYSh7XG4gICAgbmFtZToge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiAnTm8gTmFtZSBQcm92aWRlZCcsXG4gICAgICAgIHVuaXF1ZTogZmFsc2VcbiAgICB9LFxuICAgIGVtYWlsOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6ICdObyBFbWFpbCBQcm92aWRlZCcsXG4gICAgICAgIHVuaXF1ZTogdHJ1ZVxuICAgIH0sXG4gICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogJ05vIFBhc3N3b3JkIFByb3ZpZGVkJyxcbiAgICAgICAgdW5pcXVlOiBmYWxzZVxuICAgIH0sXG4gICAgYnlwYXNzSW1hZ2VMaW1pdDoge1xuICAgICAgICB0eXBlOiBCb29sZWFuXG4gICAgfVxufSk7XG5jb25zdCBVc2VycyA9IG1vbmdvb3NlLm1vZGVsKFwidXNlcnNcIiwgVXNlcnNTY2hlbWEpO1xuZXhwb3J0IGRlZmF1bHQgVXNlcnM7Il19