"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _scroller = _interopRequireDefault(require("../../1-atoms/scroller/scroller"));

var _tableCell = _interopRequireDefault(require("../../1-atoms/table-cell/table-cell"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  overflow-x: hidden;\n  overflow-y: auto;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/* ======= Component ======= */

/* === styled === */
var Container = _styledComponents.default.div.attrs(function (_ref) {
  var width = _ref.width,
      height = _ref.height;
  return {
    style: {
      width: width,
      height: height
    }
  };
})(_templateObject());
/* === Main === */


var VirtualizedList =
/*#__PURE__*/
function (_Component) {
  _inherits(VirtualizedList, _Component);

  // --- lifecycle functions --- //
  function VirtualizedList(props) {
    var _this;

    _classCallCheck(this, VirtualizedList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VirtualizedList).call(this, props));
    _this.state = {
      idx: props.initIdx
    }; // event handlers

    _this._onScroll = _this._onScroll.bind(_assertThisInitialized(_assertThisInitialized(_this))); // other functions

    _this._afterChangeIdx = _this._afterChangeIdx.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(VirtualizedList, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          width = _this$props.width,
          height = _this$props.height,
          style = _this$props.style,
          itemCount = _this$props.itemCount,
          renderItemCount = _this$props.renderItemCount,
          itemHeight = _this$props.itemHeight,
          renderItem = _this$props.renderItem,
          innerRef = _this$props.innerRef,
          idx = this.state.idx,
          _onScroll = this._onScroll;
      var listItems = [];

      for (var i = 0; i < renderItemCount; i++) {
        var _idx = i + idx;

        var top = _idx * itemHeight;
        var _style = {
          position: 'absolute',
          width: '100%',
          height: "".concat(itemHeight, "px"),
          top: "".concat(top, "px"),
          zIndex: 2
        };
        listItems.push(renderItem(_idx, _style));
      }

      return _react.default.createElement(Container, {
        width: width,
        height: height,
        style: style,
        onScroll: _onScroll,
        ref: innerRef
      }, _react.default.createElement(_scroller.default, {
        width: "100%",
        height: "".concat(itemHeight * itemCount, "px")
      }, listItems));
    } // --- event handlers --- //

  }, {
    key: "_onScroll",
    value: function _onScroll(_ref2) {
      var scrollTop = _ref2.target.scrollTop;
      var _this$props2 = this.props,
          itemHeight = _this$props2.itemHeight,
          itemCount = _this$props2.itemCount,
          renderItemCount = _this$props2.renderItemCount,
          idx = this.state.idx,
          _afterChangeIdx = this._afterChangeIdx;
      var currentIdx = Math.floor(scrollTop / itemHeight);

      if (idx !== currentIdx) {
        var maxIdx = itemCount - renderItemCount;
        var updateIdx = currentIdx < maxIdx ? currentIdx : maxIdx;
        this.setState({
          idx: updateIdx
        }, _afterChangeIdx);
      }
    } // --- other functions --- //

  }, {
    key: "_afterChangeIdx",
    value: function _afterChangeIdx() {
      var onChangeIdx = this.props.onChangeIdx,
          idx = this.state.idx;
      onChangeIdx(idx);
    }
  }]);

  return VirtualizedList;
}(_react.Component);

_defineProperty(VirtualizedList, "propTypes", {
  width: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  height: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  style: _propTypes.default.object,
  itemCount: _propTypes.default.number,
  renderItemCount: _propTypes.default.number,
  initIdx: _propTypes.default.number,
  itemHeight: _propTypes.default.number,
  renderItem: _propTypes.default.func,
  onChangeIdx: _propTypes.default.func,
  innerRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
});

_defineProperty(VirtualizedList, "defaultProps", {
  width: 300,
  height: 300,
  style: {},
  itemCount: 1000,
  renderItemCount: 20,
  initIdx: 0,
  itemHeight: 40,
  renderItem: function renderItem(idx, style) {
    return _react.default.createElement(_tableCell.default, {
      key: idx,
      style: style
    }, idx);
  },
  onChangeIdx: function onChangeIdx(idx) {},
  innerRef: function innerRef(el) {}
});

var _default = VirtualizedList;
exports.default = _default;