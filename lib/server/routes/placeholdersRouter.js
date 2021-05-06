"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _Placeholders = _interopRequireDefault(require("../../models/Placeholders"));

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
    return res.json(res.placeholderByID); // @ts-ignore
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL3BsYWNlaG9sZGVyc1JvdXRlci50cyJdLCJuYW1lcyI6WyJyb3V0ZXIiLCJwbGFjZWhvbGRlcnNSb3V0ZXIiLCJ1c2UiLCJyZXEiLCJyZXMiLCJuZXh0IiwiaGVhZGVyIiwiZ2V0IiwiUGxhY2Vob2xkZXIiLCJmaW5kIiwicGxhY2Vob2xkZXJzIiwianNvbiIsInN0YXR1cyIsIm1lc3NhZ2UiLCJmaW5kUGxhY2Vob2xkZXJieUlEIiwiY2hlY2tUb2tlbiIsInBsYWNlaG9sZGVyQnlJRCIsImZpbmRCeUlkIiwicGFyYW1zIiwiaWQiLCJwbGFjZWhvbGRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOztBQUNBOztBQUdBOzs7Ozs7Ozs7Ozs7QUFLQSxJQUFNQSxNQUFNLEdBQUcsc0JBQWY7O0lBRU1DLGtCLEdBSUYsOEJBQWM7QUFBQTs7QUFBQTs7QUFFVixPQUFLRCxNQUFMLEdBQWNBLE1BQWQ7QUFFQSxPQUFLQSxNQUFMLENBQVlFLEdBQVosQ0FBZ0IsVUFBQ0MsR0FBRCxFQUFlQyxHQUFmLEVBQThCQyxJQUE5QixFQUFxRDtBQUNqRUQsSUFBQUEsR0FBRyxDQUFDRSxNQUFKLENBQVcsNkJBQVgsRUFBMEMsR0FBMUM7QUFDQUYsSUFBQUEsR0FBRyxDQUFDRSxNQUFKLENBQVcsOEJBQVgsRUFBMkMsZ0VBQTNDO0FBQ0FELElBQUFBLElBQUk7QUFDUCxHQUpEO0FBTUEsT0FBS0wsTUFBTCxDQUFZTyxHQUFaLENBQWdCLEdBQWhCO0FBQUEsdUVBQXFCLGlCQUFNSixHQUFOLEVBQW9CQyxHQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBRWNJLHlCQUFZQyxJQUFaLEVBRmQ7O0FBQUE7QUFFUEMsY0FBQUEsWUFGTztBQUFBLCtDQUdQTixHQUFHLENBQUNPLElBQUosQ0FBU0QsWUFBVCxDQUhPOztBQUFBO0FBQUE7QUFBQTtBQUtiTixjQUFBQSxHQUFHLENBQUNRLE1BQUosQ0FBVyxHQUFYLEVBQWdCRCxJQUFoQixDQUFxQjtBQUFFRSxnQkFBQUEsT0FBTyxFQUFFLFlBQUlBO0FBQWYsZUFBckI7O0FBTGE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBckI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFTQSxPQUFLYixNQUFMLENBQVlPLEdBQVosQ0FBZ0IsUUFBaEIsRUFBMEIsVUFBQ0osR0FBRCxFQUFlQyxHQUFmLEVBQWlDO0FBQ3ZEO0FBQ0E7QUFDRCxXQUFPQSxHQUFHLENBQUNPLElBQUosQ0FBUztBQUFFRSxNQUFBQSxPQUFPLEVBQUU7QUFBWCxLQUFULENBQVA7QUFDRixHQUpELEVBbkJVLENBeUJWOztBQUNBLE9BQUtiLE1BQUwsQ0FBWU8sR0FBWixDQUFnQixTQUFoQixFQUEyQk8sbUJBQTNCLEVBQWdEQyxzQkFBaEQsRUFBNEQsVUFBQ1osR0FBRCxFQUFlQyxHQUFmLEVBQThCQyxJQUE5QixFQUFxRDtBQUMxRyxXQUFPRCxHQUFHLENBQUNPLElBQUosQ0FBU1AsR0FBRyxDQUFDWSxlQUFiLENBQVAsQ0FEMEcsQ0FDcEU7QUFDeEMsR0FGTDtBQUdILEMsRUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7U0FHZUYsbUI7Ozs7O2lGQUFmLGtCQUFtQ1gsR0FBbkMsRUFBaURDLEdBQWpELEVBQWdFQyxJQUFoRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBSTRCRyx5QkFBWVMsUUFBWixDQUFxQmQsR0FBRyxDQUFDZSxNQUFKLENBQVdDLEVBQWhDLENBSjVCOztBQUFBO0FBSVFDLFlBQUFBLFdBSlI7O0FBQUEsa0JBS1lBLFdBQVcsSUFBSSxJQUwzQjtBQUFBO0FBQUE7QUFBQTs7QUFBQSw4Q0FNbUJoQixHQUFHLENBQUNRLE1BQUosQ0FBVyxHQUFYLEVBQWdCRCxJQUFoQixDQUFxQjtBQUFFRSxjQUFBQSxPQUFPLEVBQUU7QUFBWCxhQUFyQixDQU5uQjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUEsOENBU2VULEdBQUcsQ0FBQ1EsTUFBSixDQUFXLEdBQVgsRUFBZ0JELElBQWhCLENBQXFCO0FBQUVFLGNBQUFBLE9BQU8sRUFBRSxhQUFJQTtBQUFmLGFBQXJCLENBVGY7O0FBQUE7QUFZSTtBQUNBVCxZQUFBQSxHQUFHLENBQUNZLGVBQUosR0FBc0JJLFdBQXRCO0FBQ0FmLFlBQUFBLElBQUk7O0FBZFI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztBQWtCQSxJQUFJSixrQkFBSjtlQUVlRCxNIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50ICovXG5cbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgUGxhY2Vob2xkZXIgZnJvbSBcIi4uLy4uL21vZGVscy9QbGFjZWhvbGRlcnNcIjtcblxuaW1wb3J0IFVzZXIgZnJvbSBcIi4uLy4uL21vZGVscy9Vc2Vyc1wiO1xuaW1wb3J0IGNoZWNrVG9rZW4gZnJvbSBcIi4uL1JvdXRlckZ1bmN0aW9ucy9jaGVja1Rva2VuXCI7XG5cbi8vIEltcG9ydCBmb3IgVHlwZXNcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlLCBOZXh0RnVuY3Rpb24gfSBmcm9tIFwiZXhwcmVzc1wiO1xuXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxuY2xhc3MgcGxhY2Vob2xkZXJzUm91dGVyIHtcblxuICAgIHB1YmxpYyByb3V0ZXI6IFJvdXRlcjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xuXG4gICAgICAgIHRoaXMucm91dGVyLnVzZSgocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICAgICAgICAgIHJlcy5oZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiwgXCIqXCIpO1xuICAgICAgICAgICAgcmVzLmhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnNcIiwgXCJPcmlnaW4sIFgtUmVxdWVzdGVkLVdpdGgsIENvbnRlbnQtVHlwZSwgQWNjZXB0LCB4LWFjY2Vzcy10b2tlblwiKTtcbiAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXIuZ2V0KCcvJywgYXN5bmMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBsYWNlaG9sZGVycyA9IGF3YWl0IFBsYWNlaG9sZGVyLmZpbmQoKTtcbiAgICAgICAgICAgICAgIHJldHVybiByZXMuanNvbihwbGFjZWhvbGRlcnMpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnIubWVzc2FnZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXIuZ2V0KCcvOm5hbWUnLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAvLyByZXMuanNvbihyZXMucGxhY2Vob2xkZXIpOyAvLyBXaWxsIENyYXNoIEFwcFxuICAgICAgICAgICAgLy8gUmVhZDogaHR0cHM6Ly9tb25nb29zZWpzLmNvbS9kb2NzL3F1ZXJpZXMuaHRtbFxuICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oeyBtZXNzYWdlOiAnTm90IFdvcmtpbmcgWWV0JyB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgICB0aGlzLnJvdXRlci5nZXQoJy9pZC86aWQnLCBmaW5kUGxhY2Vob2xkZXJieUlELCBjaGVja1Rva2VuLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgIHJldHVybiByZXMuanNvbihyZXMucGxhY2Vob2xkZXJCeUlEKTsgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vLyBOb3QgV29ya2luZyBSaWdodCBOb3dcbi8vIFRPRE86IEZpeFxuLy8gYXN5bmMgZnVuY3Rpb24gZmluZFBsYWNlaG9sZGVyKHJlcSwgcmVzLCBuZXh0KSB7XG4vLyAgICB2YXIgcGxhY2Vob2xkZXI7XG4vL1xuLy8gICAgdHJ5IHtcbi8vICAgICAgICBwbGFjZWhvbGRlciA9IGF3YWl0IFBsYWNlaG9sZGVyLmZpbmRPbmUoeyAnbmFtZSc6IHJlcS5wYXJhbXMubmFtZSB9LCAoZXJyLCBvdXRwdXQpID0+IHtcbi8vICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfSk7XG4vLyAgICAgICAgICAgIGNvbnNvbGUubG9nKG91dHB1dC5uYW1lKTtcbi8vICAgICAgICB9KTtcbi8vICAgICAgICBpZiAocGxhY2Vob2xkZXIgPT0gbnVsbCkge1xuLy8gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiBcIlBsYWNlaG9sZGVyIG5vdCBGb3VuZFwiIH0pO1xuLy8gICAgICAgIH07XG4vLyAgIH0gY2F0Y2ggKGVycikge1xuLy8gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVyci5tZXNzYWdlIH0pO1xuLy8gICAgfTtcbi8vXG4vLyAgICByZXMucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbi8vICAgIG5leHQoKTtcbi8vIH07XG5cblxuYXN5bmMgZnVuY3Rpb24gZmluZFBsYWNlaG9sZGVyYnlJRChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xuICAgIGxldCBwbGFjZWhvbGRlcjtcblxuICAgIHRyeSB7XG4gICAgICAgIHBsYWNlaG9sZGVyID0gYXdhaXQgUGxhY2Vob2xkZXIuZmluZEJ5SWQocmVxLnBhcmFtcy5pZCk7XG4gICAgICAgIGlmIChwbGFjZWhvbGRlciA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiBcIlBsYWNlaG9sZGVyIG5vdCBGb3VuZFwiIH0pO1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVyci5tZXNzYWdlIH0pO1xuICAgIH1cblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICByZXMucGxhY2Vob2xkZXJCeUlEID0gcGxhY2Vob2xkZXI7XG4gICAgbmV4dCgpO1xufVxuXG5cbm5ldyBwbGFjZWhvbGRlcnNSb3V0ZXIoKTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyOyJdfQ==