"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _Placeholders = _interopRequireDefault(require("../../models/Placeholders"));

var _Users = _interopRequireDefault(require("../../models/Users"));

var _checkToken = _interopRequireDefault(require("../RouterFunctions/checkToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var router = (0, _express.Router)();

var placeholdersRouter = function placeholdersRouter() {
  _classCallCheck(this, placeholdersRouter);

  _defineProperty(this, "router", void 0);

  this.router = router;
  this.router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
  });
  this.router.get('/', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var placeholders;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _Placeholders["default"].find();

            case 3:
              placeholders = _context.sent;
              return _context.abrupt("return", res.json(placeholders));

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              res.status(500).json({
                message: _context.t0.message
              });

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  this.router.get('/:name', function (req, res) {
    // res.json(res.placeholder); // Will Crash App
    // Read: https://mongoosejs.com/docs/queries.html
    return res.json({
      message: 'Not Working Yet'
    });
  }); // eslint-disable-next-line @typescript-eslint/no-unused-vars

  this.router.get('/id/:id', findPlaceholderbyID, _checkToken["default"], function (req, res, next) {
    // @ts-ignore
    return _Users["default"].findById(req.userId, {
      password: 0
    }, function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user."); // @ts-ignore

      if (!user) return res.status(404).send("No user was found."); // @ts-ignore

      return res.json(res.placeholderByID); // @ts-ignore
    });
  });
}; // Not Working Right Now
// TODO: Fix
// async function findPlaceholder(req, res, next) {
//    var placeholder;
//
//    try {
//        placeholder = await Placeholder.findOne({ 'name': req.params.name }, (err, output) => {
//            if (err) return res.status(500).json({ message: err.message });
//            console.log(output.name);
//        });
//        if (placeholder == null) {
//            return res.status(404).json({ message: "Placeholder not Found" });
//        };
//   } catch (err) {
//        return res.status(500).json({ message: err.message });
//    };
//
//    res.placeholder = placeholder;
//    next();
// };


function findPlaceholderbyID(_x3, _x4, _x5) {
  return _findPlaceholderbyID.apply(this, arguments);
}

function _findPlaceholderbyID() {
  _findPlaceholderbyID = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var placeholder;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Placeholders["default"].findById(req.params.id);

          case 3:
            placeholder = _context2.sent;

            if (!(placeholder == null)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              message: "Placeholder not Found"
            }));

          case 6:
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).json({
              message: _context2.t0.message
            }));

          case 11:
            // @ts-ignore
            res.placeholderByID = placeholder;
            next();

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return _findPlaceholderbyID.apply(this, arguments);
}

new placeholdersRouter();
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL3BsYWNlaG9sZGVyc1JvdXRlci50cyJdLCJuYW1lcyI6WyJyb3V0ZXIiLCJwbGFjZWhvbGRlcnNSb3V0ZXIiLCJ1c2UiLCJyZXEiLCJyZXMiLCJuZXh0IiwiaGVhZGVyIiwiZ2V0IiwiUGxhY2Vob2xkZXIiLCJmaW5kIiwicGxhY2Vob2xkZXJzIiwianNvbiIsInN0YXR1cyIsIm1lc3NhZ2UiLCJmaW5kUGxhY2Vob2xkZXJieUlEIiwiY2hlY2tUb2tlbiIsIlVzZXIiLCJmaW5kQnlJZCIsInVzZXJJZCIsInBhc3N3b3JkIiwiZXJyIiwidXNlciIsInNlbmQiLCJwbGFjZWhvbGRlckJ5SUQiLCJwYXJhbXMiLCJpZCIsInBsYWNlaG9sZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUtBLElBQU1BLE1BQU0sR0FBRyxzQkFBZjs7SUFFTUMsa0IsR0FJRiw4QkFBYztBQUFBOztBQUFBOztBQUVWLE9BQUtELE1BQUwsR0FBY0EsTUFBZDtBQUVBLE9BQUtBLE1BQUwsQ0FBWUUsR0FBWixDQUFnQixVQUFDQyxHQUFELEVBQWVDLEdBQWYsRUFBOEJDLElBQTlCLEVBQXFEO0FBQ2pFRCxJQUFBQSxHQUFHLENBQUNFLE1BQUosQ0FBVyw2QkFBWCxFQUEwQyxHQUExQztBQUNBRixJQUFBQSxHQUFHLENBQUNFLE1BQUosQ0FBVyw4QkFBWCxFQUEyQyxnRUFBM0M7QUFDQUQsSUFBQUEsSUFBSTtBQUNQLEdBSkQ7QUFNQSxPQUFLTCxNQUFMLENBQVlPLEdBQVosQ0FBZ0IsR0FBaEI7QUFBQSx1RUFBcUIsaUJBQU1KLEdBQU4sRUFBb0JDLEdBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFFY0kseUJBQVlDLElBQVosRUFGZDs7QUFBQTtBQUVQQyxjQUFBQSxZQUZPO0FBQUEsK0NBR1BOLEdBQUcsQ0FBQ08sSUFBSixDQUFTRCxZQUFULENBSE87O0FBQUE7QUFBQTtBQUFBO0FBS2JOLGNBQUFBLEdBQUcsQ0FBQ1EsTUFBSixDQUFXLEdBQVgsRUFBZ0JELElBQWhCLENBQXFCO0FBQUVFLGdCQUFBQSxPQUFPLEVBQUUsWUFBSUE7QUFBZixlQUFyQjs7QUFMYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFyQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNBLE9BQUtiLE1BQUwsQ0FBWU8sR0FBWixDQUFnQixRQUFoQixFQUEwQixVQUFDSixHQUFELEVBQWVDLEdBQWYsRUFBaUM7QUFDdkQ7QUFDQTtBQUNELFdBQU9BLEdBQUcsQ0FBQ08sSUFBSixDQUFTO0FBQUVFLE1BQUFBLE9BQU8sRUFBRTtBQUFYLEtBQVQsQ0FBUDtBQUNGLEdBSkQsRUFuQlUsQ0F5QlY7O0FBQ0EsT0FBS2IsTUFBTCxDQUFZTyxHQUFaLENBQWdCLFNBQWhCLEVBQTJCTyxtQkFBM0IsRUFBZ0RDLHNCQUFoRCxFQUE0RCxVQUFDWixHQUFELEVBQWVDLEdBQWYsRUFBOEJDLElBQTlCLEVBQXFEO0FBQzdHO0FBQ0QsV0FBT1csa0JBQUtDLFFBQUwsQ0FBY2QsR0FBRyxDQUFDZSxNQUFsQixFQUEwQjtBQUFFQyxNQUFBQSxRQUFRLEVBQUU7QUFBWixLQUExQixFQUEyQyxVQUFDQyxHQUFELEVBQU1DLElBQU4sRUFBZTtBQUM1RCxVQUFJRCxHQUFKLEVBQVMsT0FBT2hCLEdBQUcsQ0FBQ1EsTUFBSixDQUFXLEdBQVgsRUFBZ0JVLElBQWhCLENBQXFCLHVDQUFyQixDQUFQLENBRG1ELENBQ21COztBQUMvRSxVQUFJLENBQUNELElBQUwsRUFBVyxPQUFPakIsR0FBRyxDQUFDUSxNQUFKLENBQVcsR0FBWCxFQUFnQlUsSUFBaEIsQ0FBcUIsb0JBQXJCLENBQVAsQ0FGaUQsQ0FFRTs7QUFDL0QsYUFBT2xCLEdBQUcsQ0FBQ08sSUFBSixDQUFTUCxHQUFHLENBQUNtQixlQUFiLENBQVAsQ0FINkQsQ0FHdkI7QUFDeEMsS0FKSyxDQUFQO0FBS0YsR0FQRDtBQVFILEMsRUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7U0FHZVQsbUI7Ozs7O2lGQUFmLGtCQUFtQ1gsR0FBbkMsRUFBaURDLEdBQWpELEVBQWdFQyxJQUFoRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBSTRCRyx5QkFBWVMsUUFBWixDQUFxQmQsR0FBRyxDQUFDcUIsTUFBSixDQUFXQyxFQUFoQyxDQUo1Qjs7QUFBQTtBQUlRQyxZQUFBQSxXQUpSOztBQUFBLGtCQUtZQSxXQUFXLElBQUksSUFMM0I7QUFBQTtBQUFBO0FBQUE7O0FBQUEsOENBTW1CdEIsR0FBRyxDQUFDUSxNQUFKLENBQVcsR0FBWCxFQUFnQkQsSUFBaEIsQ0FBcUI7QUFBRUUsY0FBQUEsT0FBTyxFQUFFO0FBQVgsYUFBckIsQ0FObkI7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBLDhDQVNlVCxHQUFHLENBQUNRLE1BQUosQ0FBVyxHQUFYLEVBQWdCRCxJQUFoQixDQUFxQjtBQUFFRSxjQUFBQSxPQUFPLEVBQUUsYUFBSUE7QUFBZixhQUFyQixDQVRmOztBQUFBO0FBWUk7QUFDQVQsWUFBQUEsR0FBRyxDQUFDbUIsZUFBSixHQUFzQkcsV0FBdEI7QUFDQXJCLFlBQUFBLElBQUk7O0FBZFI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztBQWtCQSxJQUFJSixrQkFBSjtlQUVlRCxNIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50ICovXG5cbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgUGxhY2Vob2xkZXIgZnJvbSBcIi4uLy4uL21vZGVscy9QbGFjZWhvbGRlcnNcIjtcblxuaW1wb3J0IFVzZXIgZnJvbSBcIi4uLy4uL21vZGVscy9Vc2Vyc1wiO1xuaW1wb3J0IGNoZWNrVG9rZW4gZnJvbSBcIi4uL1JvdXRlckZ1bmN0aW9ucy9jaGVja1Rva2VuXCI7XG5cbi8vIEltcG9ydCBmb3IgVHlwZXNcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlLCBOZXh0RnVuY3Rpb24gfSBmcm9tIFwiZXhwcmVzc1wiO1xuXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxuY2xhc3MgcGxhY2Vob2xkZXJzUm91dGVyIHtcblxuICAgIHB1YmxpYyByb3V0ZXI6IFJvdXRlcjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xuXG4gICAgICAgIHRoaXMucm91dGVyLnVzZSgocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICAgICAgICAgIHJlcy5oZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiwgXCIqXCIpO1xuICAgICAgICAgICAgcmVzLmhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnNcIiwgXCJPcmlnaW4sIFgtUmVxdWVzdGVkLVdpdGgsIENvbnRlbnQtVHlwZSwgQWNjZXB0LCB4LWFjY2Vzcy10b2tlblwiKTtcbiAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXIuZ2V0KCcvJywgYXN5bmMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBsYWNlaG9sZGVycyA9IGF3YWl0IFBsYWNlaG9sZGVyLmZpbmQoKTtcbiAgICAgICAgICAgICAgIHJldHVybiByZXMuanNvbihwbGFjZWhvbGRlcnMpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnIubWVzc2FnZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXIuZ2V0KCcvOm5hbWUnLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAvLyByZXMuanNvbihyZXMucGxhY2Vob2xkZXIpOyAvLyBXaWxsIENyYXNoIEFwcFxuICAgICAgICAgICAgLy8gUmVhZDogaHR0cHM6Ly9tb25nb29zZWpzLmNvbS9kb2NzL3F1ZXJpZXMuaHRtbFxuICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oeyBtZXNzYWdlOiAnTm90IFdvcmtpbmcgWWV0JyB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgICB0aGlzLnJvdXRlci5nZXQoJy9pZC86aWQnLCBmaW5kUGxhY2Vob2xkZXJieUlELCBjaGVja1Rva2VuLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgcmV0dXJuIFVzZXIuZmluZEJ5SWQocmVxLnVzZXJJZCwgeyBwYXNzd29yZDogMCB9LCAoZXJyLCB1c2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5zZW5kKFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBmaW5kaW5nIHRoZSB1c2VyLlwiKTsgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIGlmICghdXNlcikgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5zZW5kKFwiTm8gdXNlciB3YXMgZm91bmQuXCIpOyAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24ocmVzLnBsYWNlaG9sZGVyQnlJRCk7IC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8vIE5vdCBXb3JraW5nIFJpZ2h0IE5vd1xuLy8gVE9ETzogRml4XG4vLyBhc3luYyBmdW5jdGlvbiBmaW5kUGxhY2Vob2xkZXIocmVxLCByZXMsIG5leHQpIHtcbi8vICAgIHZhciBwbGFjZWhvbGRlcjtcbi8vXG4vLyAgICB0cnkge1xuLy8gICAgICAgIHBsYWNlaG9sZGVyID0gYXdhaXQgUGxhY2Vob2xkZXIuZmluZE9uZSh7ICduYW1lJzogcmVxLnBhcmFtcy5uYW1lIH0sIChlcnIsIG91dHB1dCkgPT4ge1xuLy8gICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnIubWVzc2FnZSB9KTtcbi8vICAgICAgICAgICAgY29uc29sZS5sb2cob3V0cHV0Lm5hbWUpO1xuLy8gICAgICAgIH0pO1xuLy8gICAgICAgIGlmIChwbGFjZWhvbGRlciA9PSBudWxsKSB7XG4vLyAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiUGxhY2Vob2xkZXIgbm90IEZvdW5kXCIgfSk7XG4vLyAgICAgICAgfTtcbi8vICAgfSBjYXRjaCAoZXJyKSB7XG4vLyAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfSk7XG4vLyAgICB9O1xuLy9cbi8vICAgIHJlcy5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuLy8gICAgbmV4dCgpO1xuLy8gfTtcblxuXG5hc3luYyBmdW5jdGlvbiBmaW5kUGxhY2Vob2xkZXJieUlEKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XG4gICAgbGV0IHBsYWNlaG9sZGVyO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgcGxhY2Vob2xkZXIgPSBhd2FpdCBQbGFjZWhvbGRlci5maW5kQnlJZChyZXEucGFyYW1zLmlkKTtcbiAgICAgICAgaWYgKHBsYWNlaG9sZGVyID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiUGxhY2Vob2xkZXIgbm90IEZvdW5kXCIgfSk7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfSk7XG4gICAgfVxuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHJlcy5wbGFjZWhvbGRlckJ5SUQgPSBwbGFjZWhvbGRlcjtcbiAgICBuZXh0KCk7XG59XG5cblxubmV3IHBsYWNlaG9sZGVyc1JvdXRlcigpO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7Il19