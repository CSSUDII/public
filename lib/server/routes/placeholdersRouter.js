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
              res.json(placeholders);
              _context.next = 10;
              break;

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
    res.json({
      message: 'Not Working Yet'
    });
  });
  this.router.get('/id/:id', findPlaceholderbyID, _checkToken["default"], function (req, res) {
    // @ts-ignore
    _Users["default"].findById(req.userId, {
      password: 0
    }, function (err, user) {
      // @ts-ignore
      if (err) return res.status(500).send("There was a problem finding the user."); // @ts-ignore

      if (!user) return res.status(404).send("No user was found."); // @ts-ignore

      res.json(res.placeholderByID); // @ts-ignore
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL3BsYWNlaG9sZGVyc1JvdXRlci50cyJdLCJuYW1lcyI6WyJyb3V0ZXIiLCJwbGFjZWhvbGRlcnNSb3V0ZXIiLCJ1c2UiLCJyZXEiLCJyZXMiLCJuZXh0IiwiaGVhZGVyIiwiZ2V0IiwiUGxhY2Vob2xkZXIiLCJmaW5kIiwicGxhY2Vob2xkZXJzIiwianNvbiIsInN0YXR1cyIsIm1lc3NhZ2UiLCJmaW5kUGxhY2Vob2xkZXJieUlEIiwiY2hlY2tUb2tlbiIsIlVzZXIiLCJmaW5kQnlJZCIsInVzZXJJZCIsInBhc3N3b3JkIiwiZXJyIiwidXNlciIsInNlbmQiLCJwbGFjZWhvbGRlckJ5SUQiLCJwYXJhbXMiLCJpZCIsInBsYWNlaG9sZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUtBLElBQU1BLE1BQU0sR0FBRyxzQkFBZjs7SUFFTUMsa0IsR0FJRiw4QkFBYztBQUFBOztBQUFBOztBQUVWLE9BQUtELE1BQUwsR0FBY0EsTUFBZDtBQUVBLE9BQUtBLE1BQUwsQ0FBWUUsR0FBWixDQUFnQixVQUFDQyxHQUFELEVBQWVDLEdBQWYsRUFBOEJDLElBQTlCLEVBQXFEO0FBQ2pFRCxJQUFBQSxHQUFHLENBQUNFLE1BQUosQ0FBVyw2QkFBWCxFQUEwQyxHQUExQztBQUNBRixJQUFBQSxHQUFHLENBQUNFLE1BQUosQ0FBVyw4QkFBWCxFQUEyQyxnRUFBM0M7QUFDQUQsSUFBQUEsSUFBSTtBQUNQLEdBSkQ7QUFNQSxPQUFLTCxNQUFMLENBQVlPLEdBQVosQ0FBZ0IsR0FBaEI7QUFBQSx1RUFBcUIsaUJBQU1KLEdBQU4sRUFBb0JDLEdBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFFY0kseUJBQVlDLElBQVosRUFGZDs7QUFBQTtBQUVQQyxjQUFBQSxZQUZPO0FBR2JOLGNBQUFBLEdBQUcsQ0FBQ08sSUFBSixDQUFTRCxZQUFUO0FBSGE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFLYk4sY0FBQUEsR0FBRyxDQUFDUSxNQUFKLENBQVcsR0FBWCxFQUFnQkQsSUFBaEIsQ0FBcUI7QUFBRUUsZ0JBQUFBLE9BQU8sRUFBRSxZQUFJQTtBQUFmLGVBQXJCOztBQUxhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQXJCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBU0EsT0FBS2IsTUFBTCxDQUFZTyxHQUFaLENBQWdCLFFBQWhCLEVBQTBCLFVBQUNKLEdBQUQsRUFBZUMsR0FBZixFQUFpQztBQUN2RDtBQUNBO0FBQ0FBLElBQUFBLEdBQUcsQ0FBQ08sSUFBSixDQUFTO0FBQUVFLE1BQUFBLE9BQU8sRUFBRTtBQUFYLEtBQVQ7QUFDSCxHQUpEO0FBTUEsT0FBS2IsTUFBTCxDQUFZTyxHQUFaLENBQWdCLFNBQWhCLEVBQTJCTyxtQkFBM0IsRUFBZ0RDLHNCQUFoRCxFQUE0RCxVQUFDWixHQUFELEVBQWVDLEdBQWYsRUFBaUM7QUFDekY7QUFDQVksc0JBQUtDLFFBQUwsQ0FBY2QsR0FBRyxDQUFDZSxNQUFsQixFQUEwQjtBQUFFQyxNQUFBQSxRQUFRLEVBQUU7QUFBWixLQUExQixFQUEyQyxVQUFDQyxHQUFELEVBQU1DLElBQU4sRUFBZTtBQUFFO0FBQ3hELFVBQUlELEdBQUosRUFBUyxPQUFPaEIsR0FBRyxDQUFDUSxNQUFKLENBQVcsR0FBWCxFQUFnQlUsSUFBaEIsQ0FBcUIsdUNBQXJCLENBQVAsQ0FENkMsQ0FDeUI7O0FBQy9FLFVBQUksQ0FBQ0QsSUFBTCxFQUFXLE9BQU9qQixHQUFHLENBQUNRLE1BQUosQ0FBVyxHQUFYLEVBQWdCVSxJQUFoQixDQUFxQixvQkFBckIsQ0FBUCxDQUYyQyxDQUVROztBQUM5RGxCLE1BQUFBLEdBQUcsQ0FBQ08sSUFBSixDQUFTUCxHQUFHLENBQUNtQixlQUFiLEVBSHNELENBR3ZCO0FBQ2xDLEtBSkQ7QUFLSCxHQVBEO0FBUUgsQyxFQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztTQUdlVCxtQjs7Ozs7aUZBQWYsa0JBQW1DWCxHQUFuQyxFQUFpREMsR0FBakQsRUFBZ0VDLElBQWhFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFJNEJHLHlCQUFZUyxRQUFaLENBQXFCZCxHQUFHLENBQUNxQixNQUFKLENBQVdDLEVBQWhDLENBSjVCOztBQUFBO0FBSVFDLFlBQUFBLFdBSlI7O0FBQUEsa0JBS1lBLFdBQVcsSUFBSSxJQUwzQjtBQUFBO0FBQUE7QUFBQTs7QUFBQSw4Q0FNbUJ0QixHQUFHLENBQUNRLE1BQUosQ0FBVyxHQUFYLEVBQWdCRCxJQUFoQixDQUFxQjtBQUFFRSxjQUFBQSxPQUFPLEVBQUU7QUFBWCxhQUFyQixDQU5uQjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUEsOENBU2VULEdBQUcsQ0FBQ1EsTUFBSixDQUFXLEdBQVgsRUFBZ0JELElBQWhCLENBQXFCO0FBQUVFLGNBQUFBLE9BQU8sRUFBRSxhQUFJQTtBQUFmLGFBQXJCLENBVGY7O0FBQUE7QUFZSTtBQUNBVCxZQUFBQSxHQUFHLENBQUNtQixlQUFKLEdBQXNCRyxXQUF0QjtBQUNBckIsWUFBQUEsSUFBSTs7QUFkUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O0FBa0JBLElBQUlKLGtCQUFKO2VBRWVELE0iLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnQgKi9cblxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCBQbGFjZWhvbGRlciBmcm9tIFwiLi4vLi4vbW9kZWxzL1BsYWNlaG9sZGVyc1wiO1xuXG5pbXBvcnQgVXNlciBmcm9tIFwiLi4vLi4vbW9kZWxzL1VzZXJzXCI7XG5pbXBvcnQgY2hlY2tUb2tlbiBmcm9tIFwiLi4vUm91dGVyRnVuY3Rpb25zL2NoZWNrVG9rZW5cIjtcblxuLy8gSW1wb3J0IGZvciBUeXBlc1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UsIE5leHRGdW5jdGlvbiB9IGZyb20gXCJleHByZXNzXCI7XG5cbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuXG5jbGFzcyBwbGFjZWhvbGRlcnNSb3V0ZXIge1xuXG4gICAgcHVibGljIHJvdXRlcjogUm91dGVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXIudXNlKChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICAgICAgICAgICAgcmVzLmhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiLCBcIipcIik7XG4gICAgICAgICAgICByZXMuaGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVyc1wiLCBcIk9yaWdpbiwgWC1SZXF1ZXN0ZWQtV2l0aCwgQ29udGVudC1UeXBlLCBBY2NlcHQsIHgtYWNjZXNzLXRva2VuXCIpO1xuICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnJvdXRlci5nZXQoJy8nLCBhc3luYyhyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGxhY2Vob2xkZXJzID0gYXdhaXQgUGxhY2Vob2xkZXIuZmluZCgpO1xuICAgICAgICAgICAgICAgIHJlcy5qc29uKHBsYWNlaG9sZGVycyk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVyci5tZXNzYWdlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnJvdXRlci5nZXQoJy86bmFtZScsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIC8vIHJlcy5qc29uKHJlcy5wbGFjZWhvbGRlcik7IC8vIFdpbGwgQ3Jhc2ggQXBwXG4gICAgICAgICAgICAvLyBSZWFkOiBodHRwczovL21vbmdvb3NlanMuY29tL2RvY3MvcXVlcmllcy5odG1sXG4gICAgICAgICAgICByZXMuanNvbih7IG1lc3NhZ2U6ICdOb3QgV29ya2luZyBZZXQnIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnJvdXRlci5nZXQoJy9pZC86aWQnLCBmaW5kUGxhY2Vob2xkZXJieUlELCBjaGVja1Rva2VuLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBVc2VyLmZpbmRCeUlkKHJlcS51c2VySWQsIHsgcGFzc3dvcmQ6IDAgfSwgKGVyciwgdXNlcikgPT4geyAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5zZW5kKFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBmaW5kaW5nIHRoZSB1c2VyLlwiKTsgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIGlmICghdXNlcikgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5zZW5kKFwiTm8gdXNlciB3YXMgZm91bmQuXCIpOyAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgcmVzLmpzb24ocmVzLnBsYWNlaG9sZGVyQnlJRCk7IC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8vIE5vdCBXb3JraW5nIFJpZ2h0IE5vd1xuLy8gVE9ETzogRml4XG4vLyBhc3luYyBmdW5jdGlvbiBmaW5kUGxhY2Vob2xkZXIocmVxLCByZXMsIG5leHQpIHtcbi8vICAgIHZhciBwbGFjZWhvbGRlcjtcbi8vXG4vLyAgICB0cnkge1xuLy8gICAgICAgIHBsYWNlaG9sZGVyID0gYXdhaXQgUGxhY2Vob2xkZXIuZmluZE9uZSh7ICduYW1lJzogcmVxLnBhcmFtcy5uYW1lIH0sIChlcnIsIG91dHB1dCkgPT4ge1xuLy8gICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnIubWVzc2FnZSB9KTtcbi8vICAgICAgICAgICAgY29uc29sZS5sb2cob3V0cHV0Lm5hbWUpO1xuLy8gICAgICAgIH0pO1xuLy8gICAgICAgIGlmIChwbGFjZWhvbGRlciA9PSBudWxsKSB7XG4vLyAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiUGxhY2Vob2xkZXIgbm90IEZvdW5kXCIgfSk7XG4vLyAgICAgICAgfTtcbi8vICAgfSBjYXRjaCAoZXJyKSB7XG4vLyAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfSk7XG4vLyAgICB9O1xuLy9cbi8vICAgIHJlcy5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuLy8gICAgbmV4dCgpO1xuLy8gfTtcblxuXG5hc3luYyBmdW5jdGlvbiBmaW5kUGxhY2Vob2xkZXJieUlEKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XG4gICAgbGV0IHBsYWNlaG9sZGVyO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgcGxhY2Vob2xkZXIgPSBhd2FpdCBQbGFjZWhvbGRlci5maW5kQnlJZChyZXEucGFyYW1zLmlkKTtcbiAgICAgICAgaWYgKHBsYWNlaG9sZGVyID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiUGxhY2Vob2xkZXIgbm90IEZvdW5kXCIgfSk7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfSk7XG4gICAgfVxuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHJlcy5wbGFjZWhvbGRlckJ5SUQgPSBwbGFjZWhvbGRlcjtcbiAgICBuZXh0KCk7XG59XG5cblxubmV3IHBsYWNlaG9sZGVyc1JvdXRlcigpO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7Il19