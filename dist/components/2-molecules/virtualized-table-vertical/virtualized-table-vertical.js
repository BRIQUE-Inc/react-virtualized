"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _constants = require("../../../assets/js/constants");

var _scroller = _interopRequireDefault(require("../../1-atoms/scroller/scroller"));

var _tableCell = _interopRequireDefault(require("../../1-atoms/table-cell/table-cell"));

var _tableContainer = _interopRequireDefault(require("../../1-atoms/table-container/table-container"));

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

/* ======= Component ======= */

/* === Main === */
var VirtualizedTableVertical =
/*#__PURE__*/
function (_Component) {
  _inherits(VirtualizedTableVertical, _Component);

  // --- lifecycle functions --- //
  function VirtualizedTableVertical(props) {
    var _this;

    _classCallCheck(this, VirtualizedTableVertical);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VirtualizedTableVertical).call(this, props));
    _this.state = {
      rowIdx: props.initRowIdx
    }; // refs

    _this._fixedRow = _react.default.createRef(); // event handlers

    _this._onScroll = _this._onScroll.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._afterChangeRowIdx = _this._afterChangeRowIdx.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(VirtualizedTableVertical, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          height = _this$props.height,
          width = _this$props.width,
          style = _this$props.style,
          rowCount = _this$props.rowCount,
          colCount = _this$props.colCount,
          renderRowCount = _this$props.renderRowCount,
          itemHeight = _this$props.itemHeight,
          itemWidth = _this$props.itemWidth,
          isFixedRow = _this$props.isFixedRow,
          fixedRowHeight = _this$props.fixedRowHeight,
          renderRow = _this$props.renderRow,
          renderItem = _this$props.renderItem,
          renderFixedRow = _this$props.renderFixedRow,
          renderFixedRowItem = _this$props.renderFixedRowItem,
          innerRef = _this$props.innerRef,
          rowIdx = this.state.rowIdx,
          _fixedRow = this._fixedRow,
          _onScroll = this._onScroll; // make fixed row

      var fixedRow = [];

      if (isFixedRow) {
        for (var j = 0; j < colCount; j++) {
          var _style = {
            width: typeof itemWidth === 'string' ? itemWidth : "".concat(itemWidth, "px"),
            height: '100%'
          };
          fixedRow.push(renderFixedRowItem(j, _style));
        }
      }

      var fixedRowStyle = {
        position: 'absolute',
        width: '100%',
        height: "".concat(fixedRowHeight, "px"),
        display: 'flex',
        zIndex: 10
      };
      fixedRow = renderFixedRow(fixedRowStyle, fixedRow, _fixedRow); // make rows

      var rows = [];

      for (var i = 0; i < renderRowCount; i++) {
        // make row
        var row = [];

        var _rIdx = i + rowIdx;

        var top = isFixedRow ? _rIdx * itemHeight + fixedRowHeight : _rIdx * itemHeight; // make items

        for (var _j = 0; _j < colCount; _j++) {
          var _style2 = {
            width: typeof itemWidth === 'string' ? itemWidth : "".concat(itemWidth, "px"),
            height: '100%'
          };
          row.push(renderItem(_rIdx, _j, _style2));
        }

        var rowStyle = {
          position: 'absolute',
          top: "".concat(top, "px"),
          zIndex: 2,
          width: '100%',
          height: "".concat(itemHeight, "px"),
          display: 'flex'
        };
        rows.push(renderRow(_rIdx, rowStyle, row));
      }

      return _react.default.createElement(_tableContainer.default, {
        width: width,
        height: height,
        style: style,
        onScroll: _onScroll,
        ref: innerRef
      }, _react.default.createElement(_scroller.default, {
        width: "100%",
        height: "".concat(itemHeight * rowCount, "px")
      }, isFixedRow && fixedRow, rows));
    } // --- event handlers --- //

  }, {
    key: "_onScroll",
    value: function _onScroll(_ref) {
      var scrollTop = _ref.target.scrollTop;
      var _this$props2 = this.props,
          itemHeight = _this$props2.itemHeight,
          isFixedRow = _this$props2.isFixedRow,
          rowCount = _this$props2.rowCount,
          renderRowCount = _this$props2.renderRowCount,
          rowIdx = this.state.rowIdx,
          _fixedRow = this._fixedRow,
          _afterChangeRowIdx = this._afterChangeRowIdx;

      if (isFixedRow) {
        _fixedRow.current.style.top = "".concat(scrollTop, "px");
      }

      var currentRowIdx = Math.floor(scrollTop / itemHeight);

      if (rowIdx !== currentRowIdx) {
        var maxRowIdx = rowCount - renderRowCount;
        var updateRowIdx = currentRowIdx < maxRowIdx ? currentRowIdx : maxRowIdx;
        this.setState({
          rowIdx: updateRowIdx
        }, _afterChangeRowIdx);
      }
    } // --- other functions --- //

  }, {
    key: "_afterChangeRowIdx",
    value: function _afterChangeRowIdx() {
      var onChangeRowIdx = this.props.onChangeRowIdx,
          rowIdx = this.state.rowIdx;
      onChangeRowIdx(rowIdx);
    }
  }]);

  return VirtualizedTableVertical;
}(_react.Component);

_defineProperty(VirtualizedTableVertical, "propTypes", {
  height: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  width: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  style: _propTypes.default.object,
  rowCount: _propTypes.default.number,
  colCount: _propTypes.default.number,
  renderRowCount: _propTypes.default.number,
  initRowIdx: _propTypes.default.number,
  itemHeight: _propTypes.default.number,
  itemWidth: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  isFixedRow: _propTypes.default.bool,
  fixedRowHeight: _propTypes.default.number,
  renderRow: _propTypes.default.func,
  renderItem: _propTypes.default.func,
  renderFixedRow: _propTypes.default.func,
  renderFixedRowItem: _propTypes.default.func,
  onChangeRowIdx: _propTypes.default.func,
  innerRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
});

_defineProperty(VirtualizedTableVertical, "defaultProps", {
  height: 300,
  width: 300,
  style: {},
  rowCount: 1000,
  colCount: 10,
  renderRowCount: 10,
  initRowIdx: 0,
  itemHeight: 35,
  itemWidth: 120,
  isFixedRow: false,
  fixedRowHeight: 40,
  renderRow: function renderRow(rowIdx, style, children) {
    return _react.default.createElement("div", {
      key: rowIdx,
      style: style
    }, children);
  },
  renderItem: function renderItem(rowIdx, colIdx, style) {
    return _react.default.createElement(_tableCell.default, {
      key: "".concat(rowIdx, ",").concat(colIdx),
      style: style
    }, "".concat(rowIdx, ", ").concat(colIdx));
  },
  renderFixedRow: function renderFixedRow(style, children, ref) {
    return _react.default.createElement("div", {
      ref: ref,
      style: style
    }, children);
  },
  renderFixedRowItem: function renderFixedRowItem(colIdx, style) {
    return _react.default.createElement(_tableCell.default, {
      key: "-1,".concat(colIdx),
      backgroundColor: _constants.HEADER_CELL_BACKGROUND_COLOR,
      style: style
    }, "HEAD".concat(colIdx));
  },
  onChangeRowIdx: function onChangeRowIdx(rowIdx) {},
  innerRef: function innerRef(el) {}
});

var _default = VirtualizedTableVertical;
exports.default = _default;