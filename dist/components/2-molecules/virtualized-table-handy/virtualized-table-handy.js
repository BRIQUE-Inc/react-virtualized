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
var VirtualizedTableHandy =
/*#__PURE__*/
function (_Component) {
  _inherits(VirtualizedTableHandy, _Component);

  // --- lifecycle functions --- //
  function VirtualizedTableHandy(props) {
    var _this;

    _classCallCheck(this, VirtualizedTableHandy);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VirtualizedTableHandy).call(this, props));
    _this.state = {
      rowIdx: props.initRowIdx,
      colIdx: props.initColIdx
    }; // refs

    _this._fixedRow = _react.default.createRef();
    _this._fixedCol = _react.default.createRef();
    _this._fixedCorner = _react.default.createRef(); // event handlers

    _this._onScroll = _this._onScroll.bind(_assertThisInitialized(_assertThisInitialized(_this))); // other functions

    _this._afterChangeRowIdx = _this._afterChangeRowIdx.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._afterChangeColIdx = _this._afterChangeColIdx.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._afterChangeRowColIdx = _this._afterChangeRowColIdx.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(VirtualizedTableHandy, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          height = _this$props.height,
          width = _this$props.width,
          style = _this$props.style,
          rows = _this$props.rows,
          cols = _this$props.cols,
          renderRowCount = _this$props.renderRowCount,
          renderColCount = _this$props.renderColCount,
          itemHeight = _this$props.itemHeight,
          itemWidth = _this$props.itemWidth,
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
          innerRef = _this$props.innerRef,
          _this$state = this.state,
          rowIdx = _this$state.rowIdx,
          colIdx = _this$state.colIdx,
          _fixedRow = this._fixedRow,
          _fixedCol = this._fixedCol,
          _fixedCorner = this._fixedCorner,
          _onScroll = this._onScroll;
      var rowCount = rows.length;
      var colCount = cols.length; // make fixed row

      var fixedRow_ = [];

      if (isFixedRow) {
        for (var j = 0; j < renderColCount; j++) {
          var _cIdx = j + colIdx;

          var left = _cIdx * itemWidth;
          var fixedRowItemStyle = {
            position: 'absolute',
            width: "".concat(itemWidth, "px"),
            height: "".concat(fixedRowHeight, "px"),
            top: 0,
            left: "".concat(left, "px"),
            zIndex: 6
          };
          var _col = cols[_cIdx];
          fixedRow_.push(renderFixedRowItem(_col, _cIdx, fixedRowItemStyle));
        }
      }

      var fixedRowStyle = {
        position: 'absolute',
        width: "".concat(itemWidth * colCount, "px"),
        height: "".concat(fixedRowHeight, "px"),
        left: isFixedCol ? "".concat(fixedColWidth, "px") : null,
        zIndex: 6
      };
      fixedRow_ = renderFixedRow(cols, fixedRowStyle, fixedRow_, _fixedRow); // make fixed column

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
      }

      var fixedColStyle = {
        position: 'absolute',
        width: "".concat(fixedColWidth, "px"),
        zIndex: 4
      };
      fixedCol_ = renderFixedCol(rows, fixedColStyle, fixedCol_, _fixedCol); // make fixed corner

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


        for (var _j = 0; _j < renderColCount; _j++) {
          var _cIdx2 = _j + colIdx;

          var _col2 = cols[_cIdx2];

          var _left = _cIdx2 * itemWidth;

          var _style2 = {
            position: 'absolute',
            width: "".concat(itemWidth, "px"),
            height: "".concat(itemHeight, "px"),
            left: "".concat(_left, "px"),
            zIndex: 2
          };
          row.push(renderItem(_row2, _col2, _rIdx2, _cIdx2, _style2));
        }

        var rowStyle = {
          position: 'absolute',
          width: "".concat(itemWidth * colCount, "px"),
          height: "".concat(itemHeight, "px"),
          top: "".concat(_top, "px"),
          left: isFixedCol ? "".concat(fixedColWidth, "px") : null,
          zIndex: 2
        };
        rows_.push(renderRow(_row2, _rIdx2, rowStyle, row));
      }

      var scrollerWidth = isFixedCol ? "".concat(itemWidth * colCount + fixedColWidth, "px") : "".concat(itemWidth * colCount, "px");
      var scrollerHeight = isFixedRow ? "".concat(itemHeight * rowCount + fixedRowHeight, "px") : "".concat(itemHeight * rowCount, "px");
      return _react.default.createElement(_tableContainer.default, {
        ref: innerRef,
        style: style,
        width: width,
        height: height,
        onScroll: _onScroll
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
          itemWidth = _this$props2.itemWidth,
          isFixedRow = _this$props2.isFixedRow,
          isFixedCol = _this$props2.isFixedCol,
          rows = _this$props2.rows,
          cols = _this$props2.cols,
          renderRowCount = _this$props2.renderRowCount,
          renderColCount = _this$props2.renderColCount,
          _this$state2 = this.state,
          rowIdx = _this$state2.rowIdx,
          colIdx = _this$state2.colIdx,
          _fixedRow = this._fixedRow,
          _fixedCol = this._fixedCol,
          _fixedCorner = this._fixedCorner,
          _afterChangeRowIdx = this._afterChangeRowIdx,
          _afterChangeColIdx = this._afterChangeColIdx,
          _afterChangeRowColIdx = this._afterChangeRowColIdx;
      var rowCount = rows.length;
      var colCount = cols.length;

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
      var currentColIdx = Math.floor(scrollLeft / itemWidth);

      if (rowIdx !== currentRowIdx && colIdx !== currentColIdx) {
        var maxRowIdx = rowCount - renderRowCount;
        var maxColIdx = colCount - renderColCount;
        var updateRowIdx = currentRowIdx < maxRowIdx ? currentRowIdx : maxRowIdx;
        var updateColIdx = currentColIdx < maxColIdx ? currentColIdx : maxColIdx;
        this.setState({
          rowIdx: updateRowIdx,
          colIdx: updateColIdx
        }, _afterChangeRowColIdx);
      } else if (rowIdx !== currentRowIdx && colIdx === currentColIdx) {
        var _maxRowIdx = rowCount - renderRowCount;

        var _updateRowIdx = currentRowIdx < _maxRowIdx ? currentRowIdx : _maxRowIdx;

        this.setState({
          rowIdx: _updateRowIdx
        }, _afterChangeRowIdx);
      } else if (rowIdx === currentRowIdx && colIdx !== currentColIdx) {
        var _maxColIdx = colCount - renderColCount;

        var _updateColIdx = currentColIdx < _maxColIdx ? currentColIdx : _maxColIdx;

        this.setState({
          colIdx: _updateColIdx
        }, _afterChangeColIdx);
      }
    } // --- other functions --- //

  }, {
    key: "_afterChangeRowIdx",
    value: function _afterChangeRowIdx() {
      var onChangeRowIdx = this.props.onChangeRowIdx,
          rowIdx = this.state.rowIdx;
      onChangeRowIdx(rowIdx);
    }
  }, {
    key: "_afterChangeColIdx",
    value: function _afterChangeColIdx() {
      var onChangeColIdx = this.props.onChangeColIdx,
          colIdx = this.state.colIdx;
      onChangeColIdx(colIdx);
    }
  }, {
    key: "_afterChangeRowColIdx",
    value: function _afterChangeRowColIdx() {
      var _this$props3 = this.props,
          onChangeRowIdx = _this$props3.onChangeRowIdx,
          onChangeColIdx = _this$props3.onChangeColIdx,
          _this$state3 = this.state,
          rowIdx = _this$state3.rowIdx,
          colIdx = _this$state3.colIdx;
      onChangeRowIdx(rowIdx);
      onChangeColIdx(colIdx);
    }
  }]);

  return VirtualizedTableHandy;
}(_react.Component);

_defineProperty(VirtualizedTableHandy, "propTypes", {
  height: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  width: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  style: _propTypes.default.object,
  rows: _propTypes.default.array,
  cols: _propTypes.default.array,
  renderRowCount: _propTypes.default.number,
  renderColCount: _propTypes.default.number,
  initRowIdx: _propTypes.default.number,
  initColIdx: _propTypes.default.number,
  itemHeight: _propTypes.default.number,
  itemWidth: _propTypes.default.number,
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
  onChangeColIdx: _propTypes.default.func,
  innerRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
});

_defineProperty(VirtualizedTableHandy, "defaultProps", {
  height: 300,
  width: 300,
  style: {},
  rows: [],
  cols: [],
  renderRowCount: 10,
  renderColCount: 3,
  initRowIdx: 0,
  initColIdx: 0,
  itemHeight: 40,
  itemWidth: 120,
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
  onChangeColIdx: function onChangeColIdx(colIdx) {},
  innerRef: function innerRef(el) {}
});

var _default = VirtualizedTableHandy;
exports.default = _default;