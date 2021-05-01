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
    return _Users["default"].findById(req.user, {
      password: 0
    }, function (err, user) {
      // @ts-ignore
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL3BsYWNlaG9sZGVyc1JvdXRlci50cyJdLCJuYW1lcyI6WyJyb3V0ZXIiLCJwbGFjZWhvbGRlcnNSb3V0ZXIiLCJ1c2UiLCJyZXEiLCJyZXMiLCJuZXh0IiwiaGVhZGVyIiwiZ2V0IiwiUGxhY2Vob2xkZXIiLCJmaW5kIiwicGxhY2Vob2xkZXJzIiwianNvbiIsInN0YXR1cyIsIm1lc3NhZ2UiLCJmaW5kUGxhY2Vob2xkZXJieUlEIiwiY2hlY2tUb2tlbiIsIlVzZXIiLCJmaW5kQnlJZCIsInVzZXIiLCJwYXNzd29yZCIsImVyciIsInNlbmQiLCJwbGFjZWhvbGRlckJ5SUQiLCJwYXJhbXMiLCJpZCIsInBsYWNlaG9sZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUtBLElBQU1BLE1BQU0sR0FBRyxzQkFBZjs7SUFFTUMsa0IsR0FJRiw4QkFBYztBQUFBOztBQUFBOztBQUVWLE9BQUtELE1BQUwsR0FBY0EsTUFBZDtBQUVBLE9BQUtBLE1BQUwsQ0FBWUUsR0FBWixDQUFnQixVQUFDQyxHQUFELEVBQWVDLEdBQWYsRUFBOEJDLElBQTlCLEVBQXFEO0FBQ2pFRCxJQUFBQSxHQUFHLENBQUNFLE1BQUosQ0FBVyw2QkFBWCxFQUEwQyxHQUExQztBQUNBRixJQUFBQSxHQUFHLENBQUNFLE1BQUosQ0FBVyw4QkFBWCxFQUEyQyxnRUFBM0M7QUFDQUQsSUFBQUEsSUFBSTtBQUNQLEdBSkQ7QUFNQSxPQUFLTCxNQUFMLENBQVlPLEdBQVosQ0FBZ0IsR0FBaEI7QUFBQSx1RUFBcUIsaUJBQU1KLEdBQU4sRUFBb0JDLEdBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFFY0kseUJBQVlDLElBQVosRUFGZDs7QUFBQTtBQUVQQyxjQUFBQSxZQUZPO0FBQUEsK0NBR1BOLEdBQUcsQ0FBQ08sSUFBSixDQUFTRCxZQUFULENBSE87O0FBQUE7QUFBQTtBQUFBO0FBS2JOLGNBQUFBLEdBQUcsQ0FBQ1EsTUFBSixDQUFXLEdBQVgsRUFBZ0JELElBQWhCLENBQXFCO0FBQUVFLGdCQUFBQSxPQUFPLEVBQUUsWUFBSUE7QUFBZixlQUFyQjs7QUFMYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFyQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNBLE9BQUtiLE1BQUwsQ0FBWU8sR0FBWixDQUFnQixRQUFoQixFQUEwQixVQUFDSixHQUFELEVBQWVDLEdBQWYsRUFBaUM7QUFDdkQ7QUFDQTtBQUNELFdBQU9BLEdBQUcsQ0FBQ08sSUFBSixDQUFTO0FBQUVFLE1BQUFBLE9BQU8sRUFBRTtBQUFYLEtBQVQsQ0FBUDtBQUNGLEdBSkQsRUFuQlUsQ0F5QlY7O0FBQ0EsT0FBS2IsTUFBTCxDQUFZTyxHQUFaLENBQWdCLFNBQWhCLEVBQTJCTyxtQkFBM0IsRUFBZ0RDLHNCQUFoRCxFQUE0RCxVQUFDWixHQUFELEVBQWVDLEdBQWYsRUFBOEJDLElBQTlCLEVBQXFEO0FBQzdHO0FBQ0QsV0FBT1csa0JBQUtDLFFBQUwsQ0FBY2QsR0FBRyxDQUFDZSxJQUFsQixFQUF3QjtBQUFFQyxNQUFBQSxRQUFRLEVBQUU7QUFBWixLQUF4QixFQUF5QyxVQUFDQyxHQUFELEVBQU1GLElBQU4sRUFBZTtBQUFFO0FBQzVELFVBQUlFLEdBQUosRUFBUyxPQUFPaEIsR0FBRyxDQUFDUSxNQUFKLENBQVcsR0FBWCxFQUFnQlMsSUFBaEIsQ0FBcUIsdUNBQXJCLENBQVAsQ0FEaUQsQ0FDcUI7O0FBQy9FLFVBQUksQ0FBQ0gsSUFBTCxFQUFXLE9BQU9kLEdBQUcsQ0FBQ1EsTUFBSixDQUFXLEdBQVgsRUFBZ0JTLElBQWhCLENBQXFCLG9CQUFyQixDQUFQLENBRitDLENBRUk7O0FBQy9ELGFBQU9qQixHQUFHLENBQUNPLElBQUosQ0FBU1AsR0FBRyxDQUFDa0IsZUFBYixDQUFQLENBSDJELENBR3JCO0FBQ3hDLEtBSkssQ0FBUDtBQUtGLEdBUEQ7QUFRSCxDLEVBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O1NBR2VSLG1COzs7OztpRkFBZixrQkFBbUNYLEdBQW5DLEVBQWlEQyxHQUFqRCxFQUFnRUMsSUFBaEU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUk0QkcseUJBQVlTLFFBQVosQ0FBcUJkLEdBQUcsQ0FBQ29CLE1BQUosQ0FBV0MsRUFBaEMsQ0FKNUI7O0FBQUE7QUFJUUMsWUFBQUEsV0FKUjs7QUFBQSxrQkFLWUEsV0FBVyxJQUFJLElBTDNCO0FBQUE7QUFBQTtBQUFBOztBQUFBLDhDQU1tQnJCLEdBQUcsQ0FBQ1EsTUFBSixDQUFXLEdBQVgsRUFBZ0JELElBQWhCLENBQXFCO0FBQUVFLGNBQUFBLE9BQU8sRUFBRTtBQUFYLGFBQXJCLENBTm5COztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSw4Q0FTZVQsR0FBRyxDQUFDUSxNQUFKLENBQVcsR0FBWCxFQUFnQkQsSUFBaEIsQ0FBcUI7QUFBRUUsY0FBQUEsT0FBTyxFQUFFLGFBQUlBO0FBQWYsYUFBckIsQ0FUZjs7QUFBQTtBQVlJO0FBQ0FULFlBQUFBLEdBQUcsQ0FBQ2tCLGVBQUosR0FBc0JHLFdBQXRCO0FBQ0FwQixZQUFBQSxJQUFJOztBQWRSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7QUFrQkEsSUFBSUosa0JBQUo7ZUFFZUQsTSIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudCAqL1xuXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IFBsYWNlaG9sZGVyIGZyb20gXCIuLi8uLi9tb2RlbHMvUGxhY2Vob2xkZXJzXCI7XG5cbmltcG9ydCBVc2VyIGZyb20gXCIuLi8uLi9tb2RlbHMvVXNlcnNcIjtcbmltcG9ydCBjaGVja1Rva2VuIGZyb20gXCIuLi9Sb3V0ZXJGdW5jdGlvbnMvY2hlY2tUb2tlblwiO1xuXG4vLyBJbXBvcnQgZm9yIFR5cGVzXG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSwgTmV4dEZ1bmN0aW9uIH0gZnJvbSBcImV4cHJlc3NcIjtcblxuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbmNsYXNzIHBsYWNlaG9sZGVyc1JvdXRlciB7XG5cbiAgICBwdWJsaWMgcm91dGVyOiBSb3V0ZXI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICB0aGlzLnJvdXRlciA9IHJvdXRlcjtcblxuICAgICAgICB0aGlzLnJvdXRlci51c2UoKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXMuaGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIsIFwiKlwiKTtcbiAgICAgICAgICAgIHJlcy5oZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCIsIFwiT3JpZ2luLCBYLVJlcXVlc3RlZC1XaXRoLCBDb250ZW50LVR5cGUsIEFjY2VwdCwgeC1hY2Nlc3MtdG9rZW5cIik7XG4gICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucm91dGVyLmdldCgnLycsIGFzeW5jKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwbGFjZWhvbGRlcnMgPSBhd2FpdCBQbGFjZWhvbGRlci5maW5kKCk7XG4gICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24ocGxhY2Vob2xkZXJzKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucm91dGVyLmdldCgnLzpuYW1lJywgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgLy8gcmVzLmpzb24ocmVzLnBsYWNlaG9sZGVyKTsgLy8gV2lsbCBDcmFzaCBBcHBcbiAgICAgICAgICAgIC8vIFJlYWQ6IGh0dHBzOi8vbW9uZ29vc2Vqcy5jb20vZG9jcy9xdWVyaWVzLmh0bWxcbiAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKHsgbWVzc2FnZTogJ05vdCBXb3JraW5nIFlldCcgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICAgICAgdGhpcy5yb3V0ZXIuZ2V0KCcvaWQvOmlkJywgZmluZFBsYWNlaG9sZGVyYnlJRCwgY2hlY2tUb2tlbiwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgIHJldHVybiBVc2VyLmZpbmRCeUlkKHJlcS51c2VyLCB7IHBhc3N3b3JkOiAwIH0sIChlcnIsIHVzZXIpID0+IHsgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiByZXMuc3RhdHVzKDUwMCkuc2VuZChcIlRoZXJlIHdhcyBhIHByb2JsZW0gZmluZGluZyB0aGUgdXNlci5cIik7IC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBpZiAoIXVzZXIpIHJldHVybiByZXMuc3RhdHVzKDQwNCkuc2VuZChcIk5vIHVzZXIgd2FzIGZvdW5kLlwiKTsgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKHJlcy5wbGFjZWhvbGRlckJ5SUQpOyAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vLyBOb3QgV29ya2luZyBSaWdodCBOb3dcbi8vIFRPRE86IEZpeFxuLy8gYXN5bmMgZnVuY3Rpb24gZmluZFBsYWNlaG9sZGVyKHJlcSwgcmVzLCBuZXh0KSB7XG4vLyAgICB2YXIgcGxhY2Vob2xkZXI7XG4vL1xuLy8gICAgdHJ5IHtcbi8vICAgICAgICBwbGFjZWhvbGRlciA9IGF3YWl0IFBsYWNlaG9sZGVyLmZpbmRPbmUoeyAnbmFtZSc6IHJlcS5wYXJhbXMubmFtZSB9LCAoZXJyLCBvdXRwdXQpID0+IHtcbi8vICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfSk7XG4vLyAgICAgICAgICAgIGNvbnNvbGUubG9nKG91dHB1dC5uYW1lKTtcbi8vICAgICAgICB9KTtcbi8vICAgICAgICBpZiAocGxhY2Vob2xkZXIgPT0gbnVsbCkge1xuLy8gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiBcIlBsYWNlaG9sZGVyIG5vdCBGb3VuZFwiIH0pO1xuLy8gICAgICAgIH07XG4vLyAgIH0gY2F0Y2ggKGVycikge1xuLy8gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVyci5tZXNzYWdlIH0pO1xuLy8gICAgfTtcbi8vXG4vLyAgICByZXMucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbi8vICAgIG5leHQoKTtcbi8vIH07XG5cblxuYXN5bmMgZnVuY3Rpb24gZmluZFBsYWNlaG9sZGVyYnlJRChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xuICAgIGxldCBwbGFjZWhvbGRlcjtcblxuICAgIHRyeSB7XG4gICAgICAgIHBsYWNlaG9sZGVyID0gYXdhaXQgUGxhY2Vob2xkZXIuZmluZEJ5SWQocmVxLnBhcmFtcy5pZCk7XG4gICAgICAgIGlmIChwbGFjZWhvbGRlciA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiBcIlBsYWNlaG9sZGVyIG5vdCBGb3VuZFwiIH0pO1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVyci5tZXNzYWdlIH0pO1xuICAgIH1cblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICByZXMucGxhY2Vob2xkZXJCeUlEID0gcGxhY2Vob2xkZXI7XG4gICAgbmV4dCgpO1xufVxuXG5cbm5ldyBwbGFjZWhvbGRlcnNSb3V0ZXIoKTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyOyJdfQ==