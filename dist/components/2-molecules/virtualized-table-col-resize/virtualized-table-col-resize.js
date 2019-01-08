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
var VirtualizedTableColResize =
/*#__PURE__*/
function (_Component) {
  _inherits(VirtualizedTableColResize, _Component);

  // --- lifecycle functions --- //
  function VirtualizedTableColResize(props) {
    var _this;

    _classCallCheck(this, VirtualizedTableColResize);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VirtualizedTableColResize).call(this, props));
    _this.state = {
      rowIdx: props.initRowIdx
    }; // refs

    _this._fixedRow = _react.default.createRef();
    _this._fixedCol = _react.default.createRef();
    _this._fixedCorner = _react.default.createRef(); // event handlers

    _this._onScroll = _this._onScroll.bind(_assertThisInitialized(_assertThisInitialized(_this))); // other functions

    _this._afterChangeRowIdx = _this._afterChangeRowIdx.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(VirtualizedTableColResize, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          height = _this$props.height,
          width = _this$props.width,
          style = _this$props.style,
          rows = _this$props.rows,
          cols = _this$props.cols,
          renderRowCount = _this$props.renderRowCount,
          itemHeight = _this$props.itemHeight,
          isFixedRow = _this$props.isFixedRow,
          isFixedCol = _this$props.isFixedCol,
          fixedRowHeight = _this$props.fixedRowHeight,
          fixedColWidth = _this$props.fixedColWidth,
          renderRow = _this$props.renderRow,
          renderItem = _this$props.renderItem,
          renderFixedRow = _this$props.renderFixedRow,
          renderFixedRowItem = _this$props.renderFixedRowItem,
          renderFixedCol = _this$props.renderFixedCol,
          renderFixedColItem = _this$props.renderFixedColItem,
          renderFixedCorner = _this$props.renderFixedCorner,
          onMouseUpTable = _this$props.onMouseUpTable,
          onMouseLeaveTable = _this$props.onMouseLeaveTable,
          onMouseMoveTable = _this$props.onMouseMoveTable,
          getColWidth = _this$props.getColWidth,
          innerRef = _this$props.innerRef,
          rowIdx = this.state.rowIdx,
          _fixedRow = this._fixedRow,
          _fixedCol = this._fixedCol,
          _fixedCorner = this._fixedCorner,
          _onScroll = this._onScroll;
      var rowCount = rows.length;
      var colCount = cols.length;
      var colWidths = [];
      var colLefts = [];
      var allWidth = isFixedCol ? fixedColWidth : 0; // make fixed row

      var fixedRow_ = [];
      var left = 0;

      for (var j = 0; j < colCount; j++) {
        colLefts.push(left);
        var _col = cols[j];
        var itemWidth = getColWidth(_col);
        colWidths.push(itemWidth);
        var fixedRowItemStyle = isFixedRow && {
          position: 'absolute',
          width: "".concat(itemWidth, "px"),
          height: "".concat(fixedRowHeight, "px"),
          top: 0,
          left: "".concat(left, "px"),
          zIndex: 6
        };
        isFixedRow && fixedRow_.push(renderFixedRowItem(_col, j, fixedRowItemStyle));
        left += itemWidth;
      }

      allWidth += left;
      var fixedRowStyle = isFixedRow && {
        position: 'absolute',
        width: "".concat(left, "px"),
        height: "".concat(fixedRowHeight, "px"),
        left: isFixedCol ? "".concat(fixedColWidth, "px") : null,
        zIndex: 6
      };
      fixedRow_ = isFixedRow && renderFixedRow(cols, fixedRowStyle, fixedRow_, _fixedRow); // make fixed column

      var fixedCol_ = [];

      if (isFixedCol) {
        for (var i = 0; i < renderRowCount; i++) {
          var _rIdx = i + rowIdx;

          var top = isFixedRow ? _rIdx * itemHeight + fixedRowHeight : _rIdx * itemHeight;
          var fixedColItemStyle = {
            position: 'absolute',
            width: "".concat(fixedColWidth, "px"),
            height: "".concat(itemHeight, "px"),
            left: 0,
            top: top,
            zIndex: 4
          };
          var _row = rows[_rIdx];
          fixedCol_.push(renderFixedColItem(_row, _rIdx, fixedColItemStyle));
        }

        var fixedColStyle = {
          position: 'absolute',
          width: "".concat(fixedColWidth, "px"),
          zIndex: 4
        };
        fixedCol_ = renderFixedCol(rows, fixedColStyle, fixedCol_, _fixedCol);
      } // make fixed corner


      var fixedCorner_;

      if (isFixedRow && isFixedCol) {
        var _style = {
          position: 'absolute',
          width: "".concat(fixedColWidth, "px"),
          height: "".concat(fixedRowHeight, "px"),
          top: 0,
          left: 0,
          zIndex: 8
        };
        fixedCorner_ = renderFixedCorner(_style, _fixedCorner);
      } // make rows


      var rows_ = [];

      for (var _i = 0; _i < renderRowCount; _i++) {
        // make row
        var row = [];

        var _rIdx2 = _i + rowIdx;

        var _row2 = rows[_rIdx2];

        var _top = isFixedRow ? _rIdx2 * itemHeight + fixedRowHeight : _rIdx2 * itemHeight; // make items


        for (var _j = 0; _j < colCount; _j++) {
          var _col2 = cols[_j];
          var _itemWidth = colWidths[_j];
          var _left = colLefts[_j];
          var _style2 = {
            position: 'absolute',
            width: "".concat(_itemWidth, "px"),
            height: "".concat(itemHeight, "px"),
            left: "".concat(_left, "px"),
            zIndex: 2
          };
          row.push(renderItem(_row2, _col2, _rIdx2, _j, _style2));
        }

        var rowStyle = {
          position: 'absolute',
          width: "".concat(left, "px"),
          height: "".concat(itemHeight, "px"),
          top: "".concat(_top, "px"),
          left: isFixedCol ? "".concat(fixedColWidth, "px") : null,
          zIndex: 2
        };
        rows_.push(renderRow(_row2, _rIdx2, rowStyle, row));
      }

      var scrollerWidth = "".concat(allWidth, "px");
      var scrollerHeight = isFixedRow ? "".concat(itemHeight * rowCount + fixedRowHeight, "px") : "".concat(itemHeight * rowCount, "px");
      return _react.default.createElement(_tableContainer.default, {
        ref: innerRef,
        style: style,
        width: width,
        height: height,
        onScroll: _onScroll,
        onMouseUp: onMouseUpTable,
        onMouseLeave: onMouseLeaveTable,
        onMouseMove: onMouseMoveTable
      }, _react.default.createElement(_scroller.default, {
        width: scrollerWidth,
        height: scrollerHeight
      }, isFixedRow && isFixedCol && fixedCorner_, isFixedRow && fixedRow_, isFixedCol && fixedCol_, rows_));
    } // --- event handlers --- //

  }, {
    key: "_onScroll",
    value: function _onScroll(_ref) {
      var _ref$target = _ref.target,
          scrollTop = _ref$target.scrollTop,
          scrollLeft = _ref$target.scrollLeft;
      var _this$props2 = this.props,
          itemHeight = _this$props2.itemHeight,
          isFixedRow = _this$props2.isFixedRow,
          isFixedCol = _this$props2.isFixedCol,
          rows = _this$props2.rows,
          renderRowCount = _this$props2.renderRowCount,
          rowIdx = this.state.rowIdx,
          _fixedRow = this._fixedRow,
          _fixedCol = this._fixedCol,
          _fixedCorner = this._fixedCorner,
          _afterChangeRowIdx = this._afterChangeRowIdx;
      var rowCount = rows.length;

      if (isFixedRow) {
        _fixedRow.current.style.top = "".concat(scrollTop, "px");
      }

      if (isFixedCol) {
        _fixedCol.current.style.left = "".concat(scrollLeft, "px");
      }

      if (isFixedRow && isFixedCol) {
        _fixedCorner.current.style.top = "".concat(scrollTop, "px");
        _fixedCorner.current.style.left = "".concat(scrollLeft, "px");
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

  return VirtualizedTableColResize;
}(_react.Component);

_defineProperty(VirtualizedTableColResize, "propTypes", {
  height: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  width: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  style: _propTypes.default.object,
  rows: _propTypes.default.array,
  cols: _propTypes.default.array,
  renderRowCount: _propTypes.default.number,
  initRowIdx: _propTypes.default.number,
  itemHeight: _propTypes.default.number,
  isFixedRow: _propTypes.default.bool,
  isFixedCol: _propTypes.default.bool,
  fixedRowHeight: _propTypes.default.number,
  fixedColWidth: _propTypes.default.number,
  renderRow: _propTypes.default.func,
  renderItem: _propTypes.default.func,
  renderFixedRow: _propTypes.default.func,
  renderFixedRowItem: _propTypes.default.func,
  renderFixedCol: _propTypes.default.func,
  renderFixedColItem: _propTypes.default.func,
  renderFixedCorner: _propTypes.default.func,
  onChangeRowIdx: _propTypes.default.func,
  onMouseUpTable: _propTypes.default.func,
  onMouseLeaveTable: _propTypes.default.func,
  onMouseMoveTable: _propTypes.default.func,
  getColWidth: _propTypes.default.func,
  innerRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
});

_defineProperty(VirtualizedTableColResize, "defaultProps", {
  height: 300,
  width: 300,
  style: {},
  rows: [],
  cols: [],
  renderRowCount: 10,
  initRowIdx: 0,
  itemHeight: 40,
  isFixedRow: false,
  isFixedCol: false,
  fixedRowHeight: 50,
  fixedColWidth: 50,
  renderRow: function renderRow(row, rowIdx, style, children) {
    return _react.default.createElement("div", {
      key: "".concat(rowIdx),
      style: style
    }, children);
  },
  renderItem: function renderItem(row, col, rowIdx, colIdx, style) {
    return _react.default.createElement(_tableCell.default, {
      key: "".concat(rowIdx, ",").concat(colIdx),
      style: style
    }, "".concat(rowIdx, ", ").concat(colIdx));
  },
  renderFixedRow: function renderFixedRow(cols, style, children, ref) {
    return _react.default.createElement("div", {
      ref: ref,
      style: style
    }, children);
  },
  renderFixedRowItem: function renderFixedRowItem(col, colIdx, style) {
    return _react.default.createElement(_tableCell.default, {
      key: "-1,".concat(colIdx),
      backgroundColor: _constants.HEADER_CELL_BACKGROUND_COLOR,
      style: style
    }, "HEAD".concat(colIdx));
  },
  renderFixedCol: function renderFixedCol(rows, style, children, ref) {
    return _react.default.createElement("div", {
      ref: ref,
      style: style
    }, children);
  },
  renderFixedColItem: function renderFixedColItem(row, rowIdx, style) {
    return _react.default.createElement(_tableCell.default, {
      key: "".concat(rowIdx, ",-1"),
      style: style
    }, "COL".concat(rowIdx));
  },
  renderFixedCorner: function renderFixedCorner(style, ref) {
    return _react.default.createElement(_tableCell.default, {
      innerRef: ref,
      backgroundColor: _constants.HEADER_CELL_BACKGROUND_COLOR,
      style: style
    });
  },
  onChangeRowIdx: function onChangeRowIdx(rowIdx) {},
  onMouseUpTable: null,
  onMouseLeaveTable: null,
  onMouseMoveTable: null,
  getColWidth: function getColWidth(col) {
    return col.width;
  },
  innerRef: function innerRef(el) {}
});

var _default = VirtualizedTableColResize;
exports.default = _default;