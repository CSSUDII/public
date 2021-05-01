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
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
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
              ;

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
  this.router.get('/:name', function (req, res, next) {
    // res.json(res.placeholder); // Will Crash App
    // Read: https://mongoosejs.com/docs/queries.html
    res.json({
      message: 'Not Working Yet'
    });
  });
  this.router.get('/id/:id', findPlaceholderbyID, _checkToken["default"], function (req, res, next) {
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
};

; // Not Working Right Now
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

function findPlaceholderbyID(_x4, _x5, _x6) {
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
            ;
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).json({
              message: _context2.t0.message
            }));

          case 12:
            ; // @ts-ignore

            res.placeholderByID = placeholder;
            next();

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return _findPlaceholderbyID.apply(this, arguments);
}

;
new placeholdersRouter();
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL3BsYWNlaG9sZGVyc1JvdXRlci50cyJdLCJuYW1lcyI6WyJyb3V0ZXIiLCJwbGFjZWhvbGRlcnNSb3V0ZXIiLCJ1c2UiLCJyZXEiLCJyZXMiLCJuZXh0IiwiaGVhZGVyIiwiZ2V0IiwiUGxhY2Vob2xkZXIiLCJmaW5kIiwicGxhY2Vob2xkZXJzIiwianNvbiIsInN0YXR1cyIsIm1lc3NhZ2UiLCJmaW5kUGxhY2Vob2xkZXJieUlEIiwiY2hlY2tUb2tlbiIsIlVzZXIiLCJmaW5kQnlJZCIsInVzZXJJZCIsInBhc3N3b3JkIiwiZXJyIiwidXNlciIsInNlbmQiLCJwbGFjZWhvbGRlckJ5SUQiLCJwYXJhbXMiLCJpZCIsInBsYWNlaG9sZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUtBLElBQU1BLE1BQU0sR0FBRyxzQkFBZjs7SUFFTUMsa0IsR0FJRiw4QkFBYztBQUFBOztBQUFBOztBQUVWLE9BQUtELE1BQUwsR0FBY0EsTUFBZDtBQUVBLE9BQUtBLE1BQUwsQ0FBWUUsR0FBWixDQUFnQixVQUFDQyxHQUFELEVBQWVDLEdBQWYsRUFBOEJDLElBQTlCLEVBQXFEO0FBQ2pFRCxJQUFBQSxHQUFHLENBQUNFLE1BQUosQ0FBVyw2QkFBWCxFQUEwQyxHQUExQztBQUNBRixJQUFBQSxHQUFHLENBQUNFLE1BQUosQ0FBVyw4QkFBWCxFQUEyQyxnRUFBM0M7QUFDQUQsSUFBQUEsSUFBSTtBQUNQLEdBSkQ7QUFNQSxPQUFLTCxNQUFMLENBQVlPLEdBQVosQ0FBZ0IsR0FBaEI7QUFBQSx1RUFBcUIsaUJBQU1KLEdBQU4sRUFBb0JDLEdBQXBCLEVBQW1DQyxJQUFuQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBRWNHLHlCQUFZQyxJQUFaLEVBRmQ7O0FBQUE7QUFFUEMsY0FBQUEsWUFGTztBQUdiTixjQUFBQSxHQUFHLENBQUNPLElBQUosQ0FBU0QsWUFBVDtBQUhhO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBS2JOLGNBQUFBLEdBQUcsQ0FBQ1EsTUFBSixDQUFXLEdBQVgsRUFBZ0JELElBQWhCLENBQXFCO0FBQUVFLGdCQUFBQSxPQUFPLEVBQUUsWUFBSUE7QUFBZixlQUFyQjs7QUFMYTtBQU1oQjs7QUFOZ0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBckI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFTQSxPQUFLYixNQUFMLENBQVlPLEdBQVosQ0FBZ0IsUUFBaEIsRUFBMEIsVUFBQ0osR0FBRCxFQUFlQyxHQUFmLEVBQThCQyxJQUE5QixFQUFxRDtBQUMzRTtBQUNBO0FBQ0FELElBQUFBLEdBQUcsQ0FBQ08sSUFBSixDQUFTO0FBQUVFLE1BQUFBLE9BQU8sRUFBRTtBQUFYLEtBQVQ7QUFDSCxHQUpEO0FBTUEsT0FBS2IsTUFBTCxDQUFZTyxHQUFaLENBQWdCLFNBQWhCLEVBQTJCTyxtQkFBM0IsRUFBZ0RDLHNCQUFoRCxFQUE0RCxVQUFDWixHQUFELEVBQWVDLEdBQWYsRUFBOEJDLElBQTlCLEVBQXFEO0FBQzdHO0FBQ0FXLHNCQUFLQyxRQUFMLENBQWNkLEdBQUcsQ0FBQ2UsTUFBbEIsRUFBMEI7QUFBRUMsTUFBQUEsUUFBUSxFQUFFO0FBQVosS0FBMUIsRUFBMkMsVUFBQ0MsR0FBRCxFQUFNQyxJQUFOLEVBQWU7QUFBRTtBQUN4RCxVQUFJRCxHQUFKLEVBQVMsT0FBT2hCLEdBQUcsQ0FBQ1EsTUFBSixDQUFXLEdBQVgsRUFBZ0JVLElBQWhCLENBQXFCLHVDQUFyQixDQUFQLENBRDZDLENBQ3lCOztBQUMvRSxVQUFJLENBQUNELElBQUwsRUFBVyxPQUFPakIsR0FBRyxDQUFDUSxNQUFKLENBQVcsR0FBWCxFQUFnQlUsSUFBaEIsQ0FBcUIsb0JBQXJCLENBQVAsQ0FGMkMsQ0FFUTs7QUFDOURsQixNQUFBQSxHQUFHLENBQUNPLElBQUosQ0FBU1AsR0FBRyxDQUFDbUIsZUFBYixFQUhzRCxDQUd2QjtBQUNsQyxLQUpEO0FBS0gsR0FQRDtBQVFILEM7O0FBQ0osQyxDQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O1NBR2VULG1COzs7OztpRkFBZixrQkFBbUNYLEdBQW5DLEVBQWlEQyxHQUFqRCxFQUFnRUMsSUFBaEU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUk0QkcseUJBQVlTLFFBQVosQ0FBcUJkLEdBQUcsQ0FBQ3FCLE1BQUosQ0FBV0MsRUFBaEMsQ0FKNUI7O0FBQUE7QUFJUUMsWUFBQUEsV0FKUjs7QUFBQSxrQkFLWUEsV0FBVyxJQUFJLElBTDNCO0FBQUE7QUFBQTtBQUFBOztBQUFBLDhDQU1tQnRCLEdBQUcsQ0FBQ1EsTUFBSixDQUFXLEdBQVgsRUFBZ0JELElBQWhCLENBQXFCO0FBQUVFLGNBQUFBLE9BQU8sRUFBRTtBQUFYLGFBQXJCLENBTm5COztBQUFBO0FBT1M7QUFQVDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBLDhDQVNlVCxHQUFHLENBQUNRLE1BQUosQ0FBVyxHQUFYLEVBQWdCRCxJQUFoQixDQUFxQjtBQUFFRSxjQUFBQSxPQUFPLEVBQUUsYUFBSUE7QUFBZixhQUFyQixDQVRmOztBQUFBO0FBVUssYUFWTCxDQVlJOztBQUNBVCxZQUFBQSxHQUFHLENBQUNtQixlQUFKLEdBQXNCRyxXQUF0QjtBQUNBckIsWUFBQUEsSUFBSTs7QUFkUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O0FBZUM7QUFHRCxJQUFJSixrQkFBSjtlQUVlRCxNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCBQbGFjZWhvbGRlciBmcm9tIFwiLi4vLi4vbW9kZWxzL1BsYWNlaG9sZGVyc1wiO1xuXG5pbXBvcnQgVXNlciBmcm9tIFwiLi4vLi4vbW9kZWxzL1VzZXJzXCI7XG5pbXBvcnQgY2hlY2tUb2tlbiBmcm9tIFwiLi4vUm91dGVyRnVuY3Rpb25zL2NoZWNrVG9rZW5cIjtcblxuLy8gSW1wb3J0IGZvciBUeXBlc1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UsIE5leHRGdW5jdGlvbiB9IGZyb20gXCJleHByZXNzXCI7XG5cbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuXG5jbGFzcyBwbGFjZWhvbGRlcnNSb3V0ZXIge1xuXG4gICAgcHVibGljIHJvdXRlcjogUm91dGVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXIudXNlKChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICAgICAgICAgICAgcmVzLmhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiLCBcIipcIik7XG4gICAgICAgICAgICByZXMuaGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVyc1wiLCBcIk9yaWdpbiwgWC1SZXF1ZXN0ZWQtV2l0aCwgQ29udGVudC1UeXBlLCBBY2NlcHQsIHgtYWNjZXNzLXRva2VuXCIpO1xuICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnJvdXRlci5nZXQoJy8nLCBhc3luYyhyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwbGFjZWhvbGRlcnMgPSBhd2FpdCBQbGFjZWhvbGRlci5maW5kKCk7XG4gICAgICAgICAgICAgICAgcmVzLmpzb24ocGxhY2Vob2xkZXJzKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnJvdXRlci5nZXQoJy86bmFtZScsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICAgICAgICAgICAgLy8gcmVzLmpzb24ocmVzLnBsYWNlaG9sZGVyKTsgLy8gV2lsbCBDcmFzaCBBcHBcbiAgICAgICAgICAgIC8vIFJlYWQ6IGh0dHBzOi8vbW9uZ29vc2Vqcy5jb20vZG9jcy9xdWVyaWVzLmh0bWxcbiAgICAgICAgICAgIHJlcy5qc29uKHsgbWVzc2FnZTogJ05vdCBXb3JraW5nIFlldCcgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucm91dGVyLmdldCgnL2lkLzppZCcsIGZpbmRQbGFjZWhvbGRlcmJ5SUQsIGNoZWNrVG9rZW4sIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgVXNlci5maW5kQnlJZChyZXEudXNlcklkLCB7IHBhc3N3b3JkOiAwIH0sIChlcnIsIHVzZXIpID0+IHsgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiByZXMuc3RhdHVzKDUwMCkuc2VuZChcIlRoZXJlIHdhcyBhIHByb2JsZW0gZmluZGluZyB0aGUgdXNlci5cIik7IC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBpZiAoIXVzZXIpIHJldHVybiByZXMuc3RhdHVzKDQwNCkuc2VuZChcIk5vIHVzZXIgd2FzIGZvdW5kLlwiKTsgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIHJlcy5qc29uKHJlcy5wbGFjZWhvbGRlckJ5SUQpOyAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG5cbi8vIE5vdCBXb3JraW5nIFJpZ2h0IE5vd1xuLy8gVE9ETzogRml4XG4vLyBhc3luYyBmdW5jdGlvbiBmaW5kUGxhY2Vob2xkZXIocmVxLCByZXMsIG5leHQpIHtcbi8vICAgIHZhciBwbGFjZWhvbGRlcjtcbi8vXG4vLyAgICB0cnkge1xuLy8gICAgICAgIHBsYWNlaG9sZGVyID0gYXdhaXQgUGxhY2Vob2xkZXIuZmluZE9uZSh7ICduYW1lJzogcmVxLnBhcmFtcy5uYW1lIH0sIChlcnIsIG91dHB1dCkgPT4ge1xuLy8gICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnIubWVzc2FnZSB9KTtcbi8vICAgICAgICAgICAgY29uc29sZS5sb2cob3V0cHV0Lm5hbWUpO1xuLy8gICAgICAgIH0pO1xuLy8gICAgICAgIGlmIChwbGFjZWhvbGRlciA9PSBudWxsKSB7XG4vLyAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiUGxhY2Vob2xkZXIgbm90IEZvdW5kXCIgfSk7XG4vLyAgICAgICAgfTtcbi8vICAgfSBjYXRjaCAoZXJyKSB7XG4vLyAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfSk7XG4vLyAgICB9O1xuLy9cbi8vICAgIHJlcy5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuLy8gICAgbmV4dCgpO1xuLy8gfTtcblxuXG5hc3luYyBmdW5jdGlvbiBmaW5kUGxhY2Vob2xkZXJieUlEKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XG4gICAgdmFyIHBsYWNlaG9sZGVyO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgcGxhY2Vob2xkZXIgPSBhd2FpdCBQbGFjZWhvbGRlci5maW5kQnlJZChyZXEucGFyYW1zLmlkKTtcbiAgICAgICAgaWYgKHBsYWNlaG9sZGVyID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiUGxhY2Vob2xkZXIgbm90IEZvdW5kXCIgfSk7XG4gICAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVyci5tZXNzYWdlIH0pO1xuICAgIH07XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcmVzLnBsYWNlaG9sZGVyQnlJRCA9IHBsYWNlaG9sZGVyO1xuICAgIG5leHQoKTtcbn07XG5cblxubmV3IHBsYWNlaG9sZGVyc1JvdXRlcigpO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7Il19