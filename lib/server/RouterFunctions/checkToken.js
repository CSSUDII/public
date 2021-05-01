"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _db = _interopRequireDefault(require("../../config/db.config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-types
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function checkToken(req, res, next) {
  var token = req.header("x-access-token");
  if (!token) return res.status(401).json({
    auth: false,
    error: "No token was provided."
  });

  try {
    var configToken = _db["default"].token;

    var verified = _jsonwebtoken["default"].verify(token, configToken); // @ts-ignore


    req.user = verified;
    return next();
  } catch (err) {
    return res.status(400).json({
      auth: false,
      error: "Failed to authenticate token."
    });
  }
}

var _default = checkToken;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvUm91dGVyRnVuY3Rpb25zL2NoZWNrVG9rZW4udHMiXSwibmFtZXMiOlsiY2hlY2tUb2tlbiIsInJlcSIsInJlcyIsIm5leHQiLCJ0b2tlbiIsImhlYWRlciIsInN0YXR1cyIsImpzb24iLCJhdXRoIiwiZXJyb3IiLCJjb25maWdUb2tlbiIsImNvbmZpZyIsInZlcmlmaWVkIiwiand0IiwidmVyaWZ5IiwidXNlciIsImVyciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOztBQUlBOzs7O0FBTkE7O0FBQ0E7QUFPQTtBQUNBO0FBQ0EsU0FBU0EsVUFBVCxDQUFxQkMsR0FBckIsRUFBbUNDLEdBQW5DLEVBQWtEQyxJQUFsRCxFQUFzRTtBQUNsRSxNQUFNQyxLQUFLLEdBQUdILEdBQUcsQ0FBQ0ksTUFBSixDQUFXLGdCQUFYLENBQWQ7QUFDQSxNQUFJLENBQUNELEtBQUwsRUFBWSxPQUFPRixHQUFHLENBQUNJLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUFFQyxJQUFBQSxJQUFJLEVBQUUsS0FBUjtBQUFlQyxJQUFBQSxLQUFLLEVBQUU7QUFBdEIsR0FBckIsQ0FBUDs7QUFFWixNQUFJO0FBQ0EsUUFBTUMsV0FBZ0IsR0FBR0MsZUFBT1AsS0FBaEM7O0FBQ0EsUUFBTVEsUUFBUSxHQUFHQyx5QkFBSUMsTUFBSixDQUFXVixLQUFYLEVBQWtCTSxXQUFsQixDQUFqQixDQUZBLENBR0E7OztBQUNBVCxJQUFBQSxHQUFHLENBQUNjLElBQUosR0FBV0gsUUFBWDtBQUNELFdBQU9ULElBQUksRUFBWDtBQUNGLEdBTkQsQ0FNRSxPQUFPYSxHQUFQLEVBQVk7QUFDWCxXQUFPZCxHQUFHLENBQUNJLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUFFQyxNQUFBQSxJQUFJLEVBQUUsS0FBUjtBQUFlQyxNQUFBQSxLQUFLLEVBQUU7QUFBdEIsS0FBckIsQ0FBUDtBQUNGO0FBQ0o7O2VBRWNULFUiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnQgKi9cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbmltcG9ydCBqd3QgZnJvbSBcImpzb253ZWJ0b2tlblwiO1xuXG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSwgTmV4dEZ1bmN0aW9uIH0gZnJvbSBcImV4cHJlc3NcIjtcblxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vLi4vY29uZmlnL2RiLmNvbmZpZ1wiO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10eXBlc1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbmZ1bmN0aW9uIGNoZWNrVG9rZW4gKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XG4gICAgY29uc3QgdG9rZW4gPSByZXEuaGVhZGVyKFwieC1hY2Nlc3MtdG9rZW5cIik7XG4gICAgaWYgKCF0b2tlbikgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5qc29uKHsgYXV0aDogZmFsc2UsIGVycm9yOiBcIk5vIHRva2VuIHdhcyBwcm92aWRlZC5cIiB9KTtcblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZ1Rva2VuOiBhbnkgPSBjb25maWcudG9rZW5cbiAgICAgICAgY29uc3QgdmVyaWZpZWQgPSBqd3QudmVyaWZ5KHRva2VuLCBjb25maWdUb2tlbik7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmVxLnVzZXIgPSB2ZXJpZmllZDtcbiAgICAgICByZXR1cm4gbmV4dCgpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGF1dGg6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gYXV0aGVudGljYXRlIHRva2VuLlwiIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2hlY2tUb2tlbjsiXX0=