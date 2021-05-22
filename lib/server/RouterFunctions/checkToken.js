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

/**
 * Check the Auth Token
 * @param req Express Request
 * @param res Express Response
 * @param next Express NextFunction
 * @returns If the input token is valid
 */
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
      error: "Failed to authenticate token.",
      message: err
    });
  }
}

var _default = checkToken;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvUm91dGVyRnVuY3Rpb25zL2NoZWNrVG9rZW4udHMiXSwibmFtZXMiOlsiY2hlY2tUb2tlbiIsInJlcSIsInJlcyIsIm5leHQiLCJ0b2tlbiIsImhlYWRlciIsInN0YXR1cyIsImpzb24iLCJhdXRoIiwiZXJyb3IiLCJjb25maWdUb2tlbiIsImNvbmZpZyIsInZlcmlmaWVkIiwiand0IiwidmVyaWZ5IiwidXNlciIsImVyciIsIm1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7QUFJQTs7OztBQU5BOztBQUNBOztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVNBLFVBQVQsQ0FBcUJDLEdBQXJCLEVBQW1DQyxHQUFuQyxFQUFrREMsSUFBbEQsRUFBc0U7QUFDbEUsTUFBTUMsS0FBSyxHQUFHSCxHQUFHLENBQUNJLE1BQUosQ0FBVyxnQkFBWCxDQUFkO0FBQ0EsTUFBSSxDQUFDRCxLQUFMLEVBQVksT0FBT0YsR0FBRyxDQUFDSSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFBRUMsSUFBQUEsSUFBSSxFQUFFLEtBQVI7QUFBZUMsSUFBQUEsS0FBSyxFQUFFO0FBQXRCLEdBQXJCLENBQVA7O0FBRVosTUFBSTtBQUNBLFFBQU1DLFdBQWdCLEdBQUdDLGVBQU9QLEtBQWhDOztBQUNBLFFBQU1RLFFBQVEsR0FBR0MseUJBQUlDLE1BQUosQ0FBV1YsS0FBWCxFQUFrQk0sV0FBbEIsQ0FBakIsQ0FGQSxDQUdBOzs7QUFDQVQsSUFBQUEsR0FBRyxDQUFDYyxJQUFKLEdBQVdILFFBQVg7QUFDRCxXQUFPVCxJQUFJLEVBQVg7QUFDRixHQU5ELENBTUUsT0FBT2EsR0FBUCxFQUFZO0FBQ1gsV0FBT2QsR0FBRyxDQUFDSSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFBRUMsTUFBQUEsSUFBSSxFQUFFLEtBQVI7QUFBZUMsTUFBQUEsS0FBSyxFQUFFLCtCQUF0QjtBQUF1RFEsTUFBQUEsT0FBTyxFQUFFRDtBQUFoRSxLQUFyQixDQUFQO0FBQ0Y7QUFDSjs7ZUFFY2hCLFUiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnQgKi9cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbmltcG9ydCBqd3QgZnJvbSBcImpzb253ZWJ0b2tlblwiO1xuXG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSwgTmV4dEZ1bmN0aW9uIH0gZnJvbSBcImV4cHJlc3NcIjtcblxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vLi4vY29uZmlnL2RiLmNvbmZpZ1wiO1xuXG4vKipcbiAqIENoZWNrIHRoZSBBdXRoIFRva2VuXG4gKiBAcGFyYW0gcmVxIEV4cHJlc3MgUmVxdWVzdFxuICogQHBhcmFtIHJlcyBFeHByZXNzIFJlc3BvbnNlXG4gKiBAcGFyYW0gbmV4dCBFeHByZXNzIE5leHRGdW5jdGlvblxuICogQHJldHVybnMgSWYgdGhlIGlucHV0IHRva2VuIGlzIHZhbGlkXG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXR5cGVzXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuZnVuY3Rpb24gY2hlY2tUb2tlbiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcbiAgICBjb25zdCB0b2tlbiA9IHJlcS5oZWFkZXIoXCJ4LWFjY2Vzcy10b2tlblwiKTtcbiAgICBpZiAoIXRva2VuKSByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBhdXRoOiBmYWxzZSwgZXJyb3I6IFwiTm8gdG9rZW4gd2FzIHByb3ZpZGVkLlwiIH0pO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY29uZmlnVG9rZW46IGFueSA9IGNvbmZpZy50b2tlblxuICAgICAgICBjb25zdCB2ZXJpZmllZCA9IGp3dC52ZXJpZnkodG9rZW4sIGNvbmZpZ1Rva2VuKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICByZXEudXNlciA9IHZlcmlmaWVkO1xuICAgICAgIHJldHVybiBuZXh0KCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgYXV0aDogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBhdXRoZW50aWNhdGUgdG9rZW4uXCIsIG1lc3NhZ2U6IGVyciB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNoZWNrVG9rZW47Il19