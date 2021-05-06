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
    // @ts-ignore
    return res.json(res.placeholderByID);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzL3BsYWNlaG9sZGVyc1JvdXRlci50cyJdLCJuYW1lcyI6WyJyb3V0ZXIiLCJwbGFjZWhvbGRlcnNSb3V0ZXIiLCJ1c2UiLCJyZXEiLCJyZXMiLCJuZXh0IiwiaGVhZGVyIiwiZ2V0IiwiUGxhY2Vob2xkZXIiLCJmaW5kIiwicGxhY2Vob2xkZXJzIiwianNvbiIsInN0YXR1cyIsIm1lc3NhZ2UiLCJmaW5kUGxhY2Vob2xkZXJieUlEIiwiY2hlY2tUb2tlbiIsInBsYWNlaG9sZGVyQnlJRCIsImZpbmRCeUlkIiwicGFyYW1zIiwiaWQiLCJwbGFjZWhvbGRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOztBQUNBOztBQUdBOzs7Ozs7Ozs7Ozs7QUFLQSxJQUFNQSxNQUFNLEdBQUcsc0JBQWY7O0lBRU1DLGtCLEdBSUYsOEJBQWM7QUFBQTs7QUFBQTs7QUFFVixPQUFLRCxNQUFMLEdBQWNBLE1BQWQ7QUFFQSxPQUFLQSxNQUFMLENBQVlFLEdBQVosQ0FBZ0IsVUFBQ0MsR0FBRCxFQUFlQyxHQUFmLEVBQThCQyxJQUE5QixFQUFxRDtBQUNqRUQsSUFBQUEsR0FBRyxDQUFDRSxNQUFKLENBQVcsNkJBQVgsRUFBMEMsR0FBMUM7QUFDQUYsSUFBQUEsR0FBRyxDQUFDRSxNQUFKLENBQVcsOEJBQVgsRUFBMkMsZ0VBQTNDO0FBQ0FELElBQUFBLElBQUk7QUFDUCxHQUpEO0FBTUEsT0FBS0wsTUFBTCxDQUFZTyxHQUFaLENBQWdCLEdBQWhCO0FBQUEsdUVBQXFCLGlCQUFNSixHQUFOLEVBQW9CQyxHQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBRWNJLHlCQUFZQyxJQUFaLEVBRmQ7O0FBQUE7QUFFUEMsY0FBQUEsWUFGTztBQUFBLCtDQUdQTixHQUFHLENBQUNPLElBQUosQ0FBU0QsWUFBVCxDQUhPOztBQUFBO0FBQUE7QUFBQTtBQUtiTixjQUFBQSxHQUFHLENBQUNRLE1BQUosQ0FBVyxHQUFYLEVBQWdCRCxJQUFoQixDQUFxQjtBQUFFRSxnQkFBQUEsT0FBTyxFQUFFLFlBQUlBO0FBQWYsZUFBckI7O0FBTGE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBckI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFTQSxPQUFLYixNQUFMLENBQVlPLEdBQVosQ0FBZ0IsUUFBaEIsRUFBMEIsVUFBQ0osR0FBRCxFQUFlQyxHQUFmLEVBQWlDO0FBQ3ZEO0FBQ0E7QUFDRCxXQUFPQSxHQUFHLENBQUNPLElBQUosQ0FBUztBQUFFRSxNQUFBQSxPQUFPLEVBQUU7QUFBWCxLQUFULENBQVA7QUFDRixHQUpELEVBbkJVLENBeUJWOztBQUNBLE9BQUtiLE1BQUwsQ0FBWU8sR0FBWixDQUFnQixTQUFoQixFQUEyQk8sbUJBQTNCLEVBQWdEQyxzQkFBaEQsRUFBNEQsVUFBQ1osR0FBRCxFQUFlQyxHQUFmLEVBQThCQyxJQUE5QixFQUFxRDtBQUN6RztBQUNKLFdBQU9ELEdBQUcsQ0FBQ08sSUFBSixDQUFTUCxHQUFHLENBQUNZLGVBQWIsQ0FBUDtBQUNILEdBSEQ7QUFJSCxDLEVBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O1NBR2VGLG1COzs7OztpRkFBZixrQkFBbUNYLEdBQW5DLEVBQWlEQyxHQUFqRCxFQUFnRUMsSUFBaEU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUk0QkcseUJBQVlTLFFBQVosQ0FBcUJkLEdBQUcsQ0FBQ2UsTUFBSixDQUFXQyxFQUFoQyxDQUo1Qjs7QUFBQTtBQUlRQyxZQUFBQSxXQUpSOztBQUFBLGtCQUtZQSxXQUFXLElBQUksSUFMM0I7QUFBQTtBQUFBO0FBQUE7O0FBQUEsOENBTW1CaEIsR0FBRyxDQUFDUSxNQUFKLENBQVcsR0FBWCxFQUFnQkQsSUFBaEIsQ0FBcUI7QUFBRUUsY0FBQUEsT0FBTyxFQUFFO0FBQVgsYUFBckIsQ0FObkI7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBLDhDQVNlVCxHQUFHLENBQUNRLE1BQUosQ0FBVyxHQUFYLEVBQWdCRCxJQUFoQixDQUFxQjtBQUFFRSxjQUFBQSxPQUFPLEVBQUUsYUFBSUE7QUFBZixhQUFyQixDQVRmOztBQUFBO0FBWUk7QUFDQVQsWUFBQUEsR0FBRyxDQUFDWSxlQUFKLEdBQXNCSSxXQUF0QjtBQUNBZixZQUFBQSxJQUFJOztBQWRSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7QUFrQkEsSUFBSUosa0JBQUo7ZUFFZUQsTSIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudCAqL1xuXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IFBsYWNlaG9sZGVyIGZyb20gXCIuLi8uLi9tb2RlbHMvUGxhY2Vob2xkZXJzXCI7XG5cbmltcG9ydCBVc2VyIGZyb20gXCIuLi8uLi9tb2RlbHMvVXNlcnNcIjtcbmltcG9ydCBjaGVja1Rva2VuIGZyb20gXCIuLi9Sb3V0ZXJGdW5jdGlvbnMvY2hlY2tUb2tlblwiO1xuXG4vLyBJbXBvcnQgZm9yIFR5cGVzXG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSwgTmV4dEZ1bmN0aW9uIH0gZnJvbSBcImV4cHJlc3NcIjtcblxuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbmNsYXNzIHBsYWNlaG9sZGVyc1JvdXRlciB7XG5cbiAgICBwdWJsaWMgcm91dGVyOiBSb3V0ZXI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICB0aGlzLnJvdXRlciA9IHJvdXRlcjtcblxuICAgICAgICB0aGlzLnJvdXRlci51c2UoKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXMuaGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIsIFwiKlwiKTtcbiAgICAgICAgICAgIHJlcy5oZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCIsIFwiT3JpZ2luLCBYLVJlcXVlc3RlZC1XaXRoLCBDb250ZW50LVR5cGUsIEFjY2VwdCwgeC1hY2Nlc3MtdG9rZW5cIik7XG4gICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucm91dGVyLmdldCgnLycsIGFzeW5jKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwbGFjZWhvbGRlcnMgPSBhd2FpdCBQbGFjZWhvbGRlci5maW5kKCk7XG4gICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24ocGxhY2Vob2xkZXJzKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucm91dGVyLmdldCgnLzpuYW1lJywgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgLy8gcmVzLmpzb24ocmVzLnBsYWNlaG9sZGVyKTsgLy8gV2lsbCBDcmFzaCBBcHBcbiAgICAgICAgICAgIC8vIFJlYWQ6IGh0dHBzOi8vbW9uZ29vc2Vqcy5jb20vZG9jcy9xdWVyaWVzLmh0bWxcbiAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKHsgbWVzc2FnZTogJ05vdCBXb3JraW5nIFlldCcgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICAgICAgdGhpcy5yb3V0ZXIuZ2V0KCcvaWQvOmlkJywgZmluZFBsYWNlaG9sZGVyYnlJRCwgY2hlY2tUb2tlbiwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKHJlcy5wbGFjZWhvbGRlckJ5SUQpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8vIE5vdCBXb3JraW5nIFJpZ2h0IE5vd1xuLy8gVE9ETzogRml4XG4vLyBhc3luYyBmdW5jdGlvbiBmaW5kUGxhY2Vob2xkZXIocmVxLCByZXMsIG5leHQpIHtcbi8vICAgIHZhciBwbGFjZWhvbGRlcjtcbi8vXG4vLyAgICB0cnkge1xuLy8gICAgICAgIHBsYWNlaG9sZGVyID0gYXdhaXQgUGxhY2Vob2xkZXIuZmluZE9uZSh7ICduYW1lJzogcmVxLnBhcmFtcy5uYW1lIH0sIChlcnIsIG91dHB1dCkgPT4ge1xuLy8gICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnIubWVzc2FnZSB9KTtcbi8vICAgICAgICAgICAgY29uc29sZS5sb2cob3V0cHV0Lm5hbWUpO1xuLy8gICAgICAgIH0pO1xuLy8gICAgICAgIGlmIChwbGFjZWhvbGRlciA9PSBudWxsKSB7XG4vLyAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiUGxhY2Vob2xkZXIgbm90IEZvdW5kXCIgfSk7XG4vLyAgICAgICAgfTtcbi8vICAgfSBjYXRjaCAoZXJyKSB7XG4vLyAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfSk7XG4vLyAgICB9O1xuLy9cbi8vICAgIHJlcy5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuLy8gICAgbmV4dCgpO1xuLy8gfTtcblxuXG5hc3luYyBmdW5jdGlvbiBmaW5kUGxhY2Vob2xkZXJieUlEKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XG4gICAgbGV0IHBsYWNlaG9sZGVyO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgcGxhY2Vob2xkZXIgPSBhd2FpdCBQbGFjZWhvbGRlci5maW5kQnlJZChyZXEucGFyYW1zLmlkKTtcbiAgICAgICAgaWYgKHBsYWNlaG9sZGVyID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiUGxhY2Vob2xkZXIgbm90IEZvdW5kXCIgfSk7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfSk7XG4gICAgfVxuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHJlcy5wbGFjZWhvbGRlckJ5SUQgPSBwbGFjZWhvbGRlcjtcbiAgICBuZXh0KCk7XG59XG5cblxubmV3IHBsYWNlaG9sZGVyc1JvdXRlcigpO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7Il19