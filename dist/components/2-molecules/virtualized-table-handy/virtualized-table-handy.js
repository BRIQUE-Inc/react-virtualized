function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scroller from '../../1-atoms/scroller/scroller';
import TableContainer from '../../1-atoms/table-container/table-container';
/* ===== Main component ===== */

class VirtualizedTableHandy extends Component {
  // === lifecycle functions === //
  constructor(props) {
    super(props);
    this.state = {
      rowIdx: props.initRowIdx,
      colIdx: props.initColIdx
    }; // refs

    this._fixedRow = React.createRef();
    this._fixedCol = React.createRef();
    this._fixedCorner = React.createRef(); // event handlers

    this._onScroll = this._onScroll.bind(this); // other functions

    this._afterChangeRowIdx = this._afterChangeRowIdx.bind(this);
    this._afterChangeColIdx = this._afterChangeColIdx.bind(this);
    this._afterChangeRowColIdx = this._afterChangeRowColIdx.bind(this);
  }

  render() {
    const {
      props: {
        height,
        width,
        style,
        rows,
        cols,
        renderRowCount,
        renderColCount,
        itemHeight,
        itemWidth,
        isFixedRow,
        isFixedCol,
        fixedRowHeight,
        fixedColWidth,
        fixedCornerStyle,
        renderRow,
        renderItem,
        renderFixedRow,
        renderFixedRowItem,
        renderFixedCol,
        renderFixedColItem,
        innerRef
      },
      state: {
        rowIdx,
        colIdx
      },
      // refs
      _fixedRow,
      _fixedCol,
      _fixedCorner,
      // event handlers
      _onScroll
    } = this;
    const rowCount = rows.length;
    const colCount = cols.length; // make fixed row

    let fixedRow_ = [];

    if (isFixedRow) {
      for (let j = 0; j < renderColCount; j++) {
        const _cIdx = j + colIdx;

        const left = _cIdx * itemWidth;
        const fixedRowItemStyle = {
          position: 'absolute',
          width: `${itemWidth}px`,
          height: `${fixedRowHeight}px`,
          top: 0,
          left: `${left}px`,
          zIndex: 6
        };
        const _col = cols[_cIdx];
        fixedRow_.push(renderFixedRowItem(_col, _cIdx, fixedRowItemStyle));
      }
    }

    const fixedRowStyle = {
      position: 'absolute',
      width: `${itemWidth * colCount}px`,
      height: `${fixedRowHeight}px`,
      left: isFixedCol ? `${fixedColWidth}px` : null,
      zIndex: 6
    };
    fixedRow_ = renderFixedRow(cols, fixedRowStyle, fixedRow_, _fixedRow); // make fixed column

    let fixedCol_ = [];

    if (isFixedCol) {
      for (let i = 0; i < renderRowCount; i++) {
        const _rIdx = i + rowIdx;

        const top = isFixedRow ? _rIdx * itemHeight + fixedRowHeight : _rIdx * itemHeight;
        const fixedColItemStyle = {
          position: 'absolute',
          width: `${fixedColWidth}px`,
          height: `${itemHeight}px`,
          left: 0,
          top,
          zIndex: 4
        };
        const _row = rows[_rIdx];
        fixedCol_.push(renderFixedColItem(_row, _rIdx, fixedColItemStyle));
      }
    }

    const fixedColStyle = {
      position: 'absolute',
      width: `${fixedColWidth}px`,
      zIndex: 4
    };
    fixedCol_ = renderFixedCol(rows, fixedColStyle, fixedCol_, _fixedCol); // make fixed corner

    let fixedCorner_;

    if (isFixedRow && isFixedCol) {
      const style = { ...fixedCornerStyle,
        position: 'absolute',
        width: `${fixedColWidth}px`,
        height: `${fixedRowHeight}px`,
        top: 0,
        left: 0,
        zIndex: 8
      };
      fixedCorner_ = React.createElement("div", {
        ref: _fixedCorner,
        style: style
      });
    } // make rows


    const rows_ = [];

    for (let i = 0; i < renderRowCount; i++) {
      // make row
      const row = [];

      const _rIdx = i + rowIdx;

      const _row = rows[_rIdx];
      const top = isFixedRow ? _rIdx * itemHeight + fixedRowHeight : _rIdx * itemHeight; // make items

      for (let j = 0; j < renderColCount; j++) {
        const _cIdx = j + colIdx;

        const _col = cols[_cIdx];
        const left = _cIdx * itemWidth;
        const style = {
          position: 'absolute',
          width: `${itemWidth}px`,
          height: `${itemHeight}px`,
          left: `${left}px`,
          zIndex: 2
        };
        row.push(renderItem(_row, _col, _rIdx, _cIdx, style));
      }

      const rowStyle = {
        position: 'absolute',
        width: `${itemWidth * colCount}px`,
        height: `${itemHeight}px`,
        top: `${top}px`,
        left: isFixedCol ? `${fixedColWidth}px` : null,
        zIndex: 2
      };
      rows_.push(renderRow(_row, _rIdx, rowStyle, row));
    }

    const scrollerWidth = isFixedCol ? `${itemWidth * colCount + fixedColWidth}px` : `${itemWidth * colCount}px`;
    const scrollerHeight = isFixedRow ? `${itemHeight * rowCount + fixedRowHeight}px` : `${itemHeight * rowCount}px`;
    return React.createElement(TableContainer, {
      ref: innerRef,
      style: style,
      width: width,
      height: height,
      onScroll: _onScroll
    }, React.createElement(Scroller, {
      width: scrollerWidth,
      height: scrollerHeight
    }, isFixedRow && isFixedCol && fixedCorner_, isFixedRow && fixedRow_, isFixedCol && fixedCol_, rows_));
  } // === event handlers === //


  _onScroll({
    target: {
      scrollTop,
      scrollLeft
    }
  }) {
    const {
      props: {
        itemHeight,
        itemWidth,
        isFixedRow,
        isFixedCol,
        rows,
        cols,
        renderRowCount,
        renderColCount
      },
      state: {
        rowIdx,
        colIdx
      },
      // refs
      _fixedRow,
      _fixedCol,
      _fixedCorner,
      // other functions
      _afterChangeRowIdx,
      _afterChangeColIdx,
      _afterChangeRowColIdx
    } = this;
    const rowCount = rows.length;
    const colCount = cols.length;

    if (isFixedRow) {
      _fixedRow.current.style.top = `${scrollTop}px`;
    }

    if (isFixedCol) {
      _fixedCol.current.style.left = `${scrollLeft}px`;
    }

    if (isFixedRow && isFixedCol) {
      _fixedCorner.current.style.top = `${scrollTop}px`;
      _fixedCorner.current.style.left = `${scrollLeft}px`;
    }

    const currentRowIdx = Math.floor(scrollTop / itemHeight);
    const currentColIdx = Math.floor(scrollLeft / itemWidth);

    if (rowIdx !== currentRowIdx && colIdx !== currentColIdx) {
      const maxRowIdx = rowCount - renderRowCount;
      const maxColIdx = colCount - renderColCount;
      const updateRowIdx = currentRowIdx < maxRowIdx ? currentRowIdx : maxRowIdx;
      const updateColIdx = currentColIdx < maxColIdx ? currentColIdx : maxColIdx;
      this.setState({
        rowIdx: updateRowIdx,
        colIdx: updateColIdx
      }, _afterChangeRowColIdx);
    } else if (rowIdx !== currentRowIdx && colIdx === currentColIdx) {
      const maxRowIdx = rowCount - renderRowCount;
      const updateRowIdx = currentRowIdx < maxRowIdx ? currentRowIdx : maxRowIdx;
      this.setState({
        rowIdx: updateRowIdx
      }, _afterChangeRowIdx);
    } else if (rowIdx === currentRowIdx && colIdx !== currentColIdx) {
      const maxColIdx = colCount - renderColCount;
      const updateColIdx = currentColIdx < maxColIdx ? currentColIdx : maxColIdx;
      this.setState({
        colIdx: updateColIdx
      }, _afterChangeColIdx);
    }
  } // === other functions === //


  _afterChangeRowIdx() {
    const {
      props: {
        onChangeRowIdx
      },
      state: {
        rowIdx
      }
    } = this;
    onChangeRowIdx(rowIdx);
  }

  _afterChangeColIdx() {
    const {
      props: {
        onChangeColIdx
      },
      state: {
        colIdx
      }
    } = this;
    onChangeColIdx(colIdx);
  }

  _afterChangeRowColIdx() {
    const {
      props: {
        onChangeRowIdx,
        onChangeColIdx
      },
      state: {
        rowIdx,
        colIdx
      }
    } = this;
    onChangeRowIdx(rowIdx);
    onChangeColIdx(colIdx);
  }

}

_defineProperty(VirtualizedTableHandy, "propTypes", {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  rows: PropTypes.array,
  cols: PropTypes.array,
  renderRowCount: PropTypes.number,
  renderColCount: PropTypes.number,
  initRowIdx: PropTypes.number,
  initColIdx: PropTypes.number,
  itemHeight: PropTypes.number,
  itemWidth: PropTypes.number,
  isFixedRow: PropTypes.bool,
  isFixedCol: PropTypes.bool,
  fixedRowHeight: PropTypes.number,
  fixedColWidth: PropTypes.number,
  fixedCornerStyle: PropTypes.object,
  renderRow: PropTypes.func,
  renderItem: PropTypes.func,
  renderFixedRow: PropTypes.func,
  renderFixedRowItem: PropTypes.func,
  renderFixedCol: PropTypes.func,
  renderFixedColItem: PropTypes.func,
  onChangeRowIdx: PropTypes.func,
  onChangeColIdx: PropTypes.func,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
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
  fixedCornerStyle: {
    backgroundColor: '#ffffff',
    border: '1px solid black',
    boxSizing: 'border-box'
  },
  renderRow: (row, rowIdx, style, children) => React.createElement("div", {
    key: `${rowIdx}`,
    style: style
  }, children),
  renderItem: (row, col, rowIdx, colIdx, style) => React.createElement("div", {
    key: `${rowIdx},${colIdx}`,
    style: { ...style,
      backgroundColor: '#ffffff',
      border: '1px solid black',
      boxSizing: 'border-box'
    }
  }, `${rowIdx}, ${colIdx}`),
  renderFixedRow: (cols, style, children, ref) => React.createElement("div", {
    ref: ref,
    style: style
  }, children),
  renderFixedRowItem: (col, colIdx, style) => React.createElement("div", {
    key: `-1,${colIdx}`,
    style: { ...style,
      backgroundColor: '#ffffff',
      border: '1px solid black',
      boxSizing: 'border-box'
    }
  }, `HEAD${colIdx}`),
  renderFixedCol: (rows, style, children, ref) => React.createElement("div", {
    ref: ref,
    style: style
  }, children),
  renderFixedColItem: (row, rowIdx, style) => React.createElement("div", {
    key: `${rowIdx},-1`,
    style: { ...style,
      backgroundColor: '#ffffff',
      border: '1px solid black',
      boxSizing: 'border-box'
    }
  }, `COL${rowIdx}`),
  onChangeRowIdx: rowIdx => {},
  onChangeColIdx: colIdx => {},
  innerRef: el => {}
});

export default VirtualizedTableHandy;