"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _db = _interopRequireDefault(require("../../config/db.config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-types
var checkToken = function checkToken(req, res, next) {
  var token = req.header("auth-token");
  if (!token) return res.status(401).json({
    auth: false,
    error: "No token was provided."
  });

  try {
    var configToken = _db["default"].token;

    var verified = _jsonwebtoken["default"].verify(token, configToken);

    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({
      auth: false,
      error: "Failed to authenticate token."
    });
  }

  next();
};

var _default = checkToken;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvUm91dGVyRnVuY3Rpb25zL2NoZWNrVG9rZW4udHMiXSwibmFtZXMiOlsiY2hlY2tUb2tlbiIsInJlcSIsInJlcyIsIm5leHQiLCJ0b2tlbiIsImhlYWRlciIsInN0YXR1cyIsImpzb24iLCJhdXRoIiwiZXJyb3IiLCJjb25maWdUb2tlbiIsImNvbmZpZyIsInZlcmlmaWVkIiwiand0IiwidmVyaWZ5IiwidXNlciIsImVyciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUVBOzs7O0FBSEE7QUFLQTtBQUNBLElBQU1BLFVBQWUsR0FBRyxTQUFsQkEsVUFBa0IsQ0FBQ0MsR0FBRCxFQUFpRUMsR0FBakUsRUFBdU1DLElBQXZNLEVBQTROO0FBQ2hQLE1BQU1DLEtBQUssR0FBR0gsR0FBRyxDQUFDSSxNQUFKLENBQVcsWUFBWCxDQUFkO0FBQ0EsTUFBSSxDQUFDRCxLQUFMLEVBQVksT0FBT0YsR0FBRyxDQUFDSSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFBRUMsSUFBQUEsSUFBSSxFQUFFLEtBQVI7QUFBZUMsSUFBQUEsS0FBSyxFQUFFO0FBQXRCLEdBQXJCLENBQVA7O0FBRVosTUFBSTtBQUNBLFFBQU1DLFdBQWdCLEdBQUdDLGVBQU9QLEtBQWhDOztBQUNBLFFBQU1RLFFBQVEsR0FBR0MseUJBQUlDLE1BQUosQ0FBV1YsS0FBWCxFQUFrQk0sV0FBbEIsQ0FBakI7O0FBQ0FULElBQUFBLEdBQUcsQ0FBQ2MsSUFBSixHQUFXSCxRQUFYO0FBQ0FULElBQUFBLElBQUk7QUFDUCxHQUxELENBS0UsT0FBT2EsR0FBUCxFQUFZO0FBQ1ZkLElBQUFBLEdBQUcsQ0FBQ0ksTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUVDLE1BQUFBLElBQUksRUFBRSxLQUFSO0FBQWVDLE1BQUFBLEtBQUssRUFBRTtBQUF0QixLQUFyQjtBQUNIOztBQUVETixFQUFBQSxJQUFJO0FBRVAsQ0FmRDs7ZUFpQmVILFUiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5pbXBvcnQgand0IGZyb20gXCJqc29ud2VidG9rZW5cIjtcblxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vLi4vY29uZmlnL2RiLmNvbmZpZ1wiO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10eXBlc1xuY29uc3QgY2hlY2tUb2tlbjogYW55ID0gKHJlcTogeyBoZWFkZXI6IChhcmcwOiBzdHJpbmcpID0+IGFueTsgdXNlcjogc3RyaW5nIHwgb2JqZWN0OyB9LCByZXM6IHsgc3RhdHVzOiAoYXJnMDogbnVtYmVyKSA9PiB7ICgpOiBhbnk7IG5ldygpOiBhbnk7IGpzb246IHsgKGFyZzA6IHsgYXV0aDogYm9vbGVhbjsgZXJyb3I6IHN0cmluZzsgfSk6IHZvaWQ7IG5ldygpOiBhbnk7IH07IH07IH0sIG5leHQ6ICgpID0+IHZvaWQpID0+IHtcbiAgICBjb25zdCB0b2tlbiA9IHJlcS5oZWFkZXIoXCJhdXRoLXRva2VuXCIpO1xuICAgIGlmICghdG9rZW4pIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7IGF1dGg6IGZhbHNlLCBlcnJvcjogXCJObyB0b2tlbiB3YXMgcHJvdmlkZWQuXCIgfSk7XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjb25maWdUb2tlbjogYW55ID0gY29uZmlnLnRva2VuXG4gICAgICAgIGNvbnN0IHZlcmlmaWVkID0gand0LnZlcmlmeSh0b2tlbiwgY29uZmlnVG9rZW4pO1xuICAgICAgICByZXEudXNlciA9IHZlcmlmaWVkO1xuICAgICAgICBuZXh0KCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgYXV0aDogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBhdXRoZW50aWNhdGUgdG9rZW4uXCIgfSk7XG4gICAgfVxuXG4gICAgbmV4dCgpO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjaGVja1Rva2VuOyJdfQ==