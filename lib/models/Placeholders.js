"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var PlaceholderSchema = new Schema({
  name: String,
  data: String
});

var Placeholder = _mongoose["default"].model("placeholders", PlaceholderSchema);

var _default = Placeholder;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvUGxhY2Vob2xkZXJzLnRzIl0sIm5hbWVzIjpbIlNjaGVtYSIsIm1vbmdvb3NlIiwiUGxhY2Vob2xkZXJTY2hlbWEiLCJuYW1lIiwiU3RyaW5nIiwiZGF0YSIsIlBsYWNlaG9sZGVyIiwibW9kZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUVBLElBQU1BLE1BQU0sR0FBR0MscUJBQVNELE1BQXhCO0FBQ0EsSUFBTUUsaUJBQWlCLEdBQUcsSUFBSUYsTUFBSixDQUFXO0FBQ2pDRyxFQUFBQSxJQUFJLEVBQUVDLE1BRDJCO0FBRWpDQyxFQUFBQSxJQUFJLEVBQUVEO0FBRjJCLENBQVgsQ0FBMUI7O0FBSUEsSUFBTUUsV0FBVyxHQUFHTCxxQkFBU00sS0FBVCxDQUFlLGNBQWYsRUFBK0JMLGlCQUEvQixDQUFwQjs7ZUFDZUksVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcblxuY29uc3QgU2NoZW1hID0gbW9uZ29vc2UuU2NoZW1hO1xuY29uc3QgUGxhY2Vob2xkZXJTY2hlbWEgPSBuZXcgU2NoZW1hKHtcbiAgICBuYW1lOiBTdHJpbmcsXG4gICAgZGF0YTogU3RyaW5nLFxufSk7XG5jb25zdCBQbGFjZWhvbGRlciA9IG1vbmdvb3NlLm1vZGVsKFwicGxhY2Vob2xkZXJzXCIsIFBsYWNlaG9sZGVyU2NoZW1hKTtcbmV4cG9ydCBkZWZhdWx0IFBsYWNlaG9sZGVyOyJdfQ==