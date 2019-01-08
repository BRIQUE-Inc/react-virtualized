import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HEADER_CELL_BACKGROUND_COLOR } from '../../../assets/js/constants';
import Scroller from '../../1-atoms/scroller/scroller';
import TableCell from '../../1-atoms/table-cell/table-cell';
import TableContainer from '../../1-atoms/table-container/table-container';

/* ======= Component ======= */

/* === Main === */

class VirtualizedTableColResize extends Component {
  static propTypes = {
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: PropTypes.object,
    rows: PropTypes.array,
    cols: PropTypes.array,
    renderRowCount: PropTypes.number,
    initRowIdx: PropTypes.number,
    itemHeight: PropTypes.number,
    isFixedRow: PropTypes.bool,
    isFixedCol: PropTypes.bool,
    fixedRowHeight: PropTypes.number,
    fixedColWidth: PropTypes.number,
    renderRow: PropTypes.func,
    renderItem: PropTypes.func,
    renderFixedRow: PropTypes.func,
    renderFixedRowItem: PropTypes.func,
    renderFixedCol: PropTypes.func,
    renderFixedColItem: PropTypes.func,
    renderFixedCorner: PropTypes.func,
    onChangeRowIdx: PropTypes.func,
    onMouseUpTable: PropTypes.func,
    onMouseLeaveTable: PropTypes.func,
    onMouseMoveTable: PropTypes.func,
    getColWidth: PropTypes.func,
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  };

  static defaultProps = {
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
    renderRow: (row, rowIdx, style, children) => (
      <div key={`${rowIdx}`} style={style}>
        {children}
      </div>
    ),
    renderItem: (row, col, rowIdx, colIdx, style) => (
      <TableCell
        key={`${rowIdx},${colIdx}`}
        style={style}
      >{`${rowIdx}, ${colIdx}`}</TableCell>
    ),
    renderFixedRow: (cols, style, children, ref) => (
      <div ref={ref} style={style}>
        {children}
      </div>
    ),
    renderFixedRowItem: (col, colIdx, style) => (
      <TableCell
        key={`-1,${colIdx}`}
        backgroundColor={HEADER_CELL_BACKGROUND_COLOR}
        style={style}
      >{`HEAD${colIdx}`}</TableCell>
    ),
    renderFixedCol: (rows, style, children, ref) => (
      <div ref={ref} style={style}>
        {children}
      </div>
    ),
    renderFixedColItem: (row, rowIdx, style) => (
      <TableCell key={`${rowIdx},-1`} style={style}>{`COL${rowIdx}`}</TableCell>
    ),
    renderFixedCorner: (style, ref) => (
      <TableCell
        innerRef={ref}
        backgroundColor={HEADER_CELL_BACKGROUND_COLOR}
        style={style}
      />
    ),
    onChangeRowIdx: rowIdx => {},
    onMouseUpTable: null,
    onMouseLeaveTable: null,
    onMouseMoveTable: null,
    getColWidth: col => col.width,
    innerRef: el => {},
  };

  // --- lifecycle functions --- //

  constructor(props) {
    super(props);

    this.state = {
      rowIdx: props.initRowIdx,
    };

    // refs
    this._fixedRow = React.createRef();
    this._fixedCol = React.createRef();
    this._fixedCorner = React.createRef();

    // event handlers
    this._onScroll = this._onScroll.bind(this);

    // other functions
    this._afterChangeRowIdx = this._afterChangeRowIdx.bind(this);
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
        itemHeight,
        isFixedRow,
        isFixedCol,
        fixedRowHeight,
        fixedColWidth,
        renderRow,
        renderItem,
        renderFixedRow,
        renderFixedRowItem,
        renderFixedCol,
        renderFixedColItem,
        renderFixedCorner,
        onMouseUpTable,
        onMouseLeaveTable,
        onMouseMoveTable,
        getColWidth,
        innerRef,
      },

      state: { rowIdx },

      // refs
      _fixedRow,
      _fixedCol,
      _fixedCorner,

      // event handlers
      _onScroll,
    } = this;

    const rowCount = rows.length;
    const colCount = cols.length;

    const colWidths = [];
    const colLefts = [];
    let allWidth = isFixedCol ? fixedColWidth : 0;

    // make fixed row
    let fixedRow_ = [];
    let left = 0;
    for (let j = 0; j < colCount; j++) {
      colLefts.push(left);
      const _col = cols[j];
      const itemWidth = getColWidth(_col);
      colWidths.push(itemWidth);
      const fixedRowItemStyle = isFixedRow && {
        position: 'absolute',
        width: `${itemWidth}px`,
        height: `${fixedRowHeight}px`,
        top: 0,
        left: `${left}px`,
        zIndex: 6,
      };
      isFixedRow &&
        fixedRow_.push(renderFixedRowItem(_col, j, fixedRowItemStyle));
      left += itemWidth;
    }
    allWidth += left;
    const fixedRowStyle = isFixedRow && {
      position: 'absolute',
      width: `${left}px`,
      height: `${fixedRowHeight}px`,
      left: isFixedCol ? `${fixedColWidth}px` : null,
      zIndex: 6,
    };
    fixedRow_ =
      isFixedRow && renderFixedRow(cols, fixedRowStyle, fixedRow_, _fixedRow);

    // make fixed column
    let fixedCol_ = [];
    if (isFixedCol) {
      for (let i = 0; i < renderRowCount; i++) {
        const _rIdx = i + rowIdx;
        const top = isFixedRow
          ? _rIdx * itemHeight + fixedRowHeight
          : _rIdx * itemHeight;
        const fixedColItemStyle = {
          position: 'absolute',
          width: `${fixedColWidth}px`,
          height: `${itemHeight}px`,
          left: 0,
          top,
          zIndex: 4,
        };
        const _row = rows[_rIdx];
        fixedCol_.push(renderFixedColItem(_row, _rIdx, fixedColItemStyle));
      }
      const fixedColStyle = {
        position: 'absolute',
        width: `${fixedColWidth}px`,
        zIndex: 4,
      };
      fixedCol_ = renderFixedCol(rows, fixedColStyle, fixedCol_, _fixedCol);
    }

    // make fixed corner
    let fixedCorner_;
    if (isFixedRow && isFixedCol) {
      const style = {
        position: 'absolute',
        width: `${fixedColWidth}px`,
        height: `${fixedRowHeight}px`,
        top: 0,
        left: 0,
        zIndex: 8,
      };
      fixedCorner_ = renderFixedCorner(style, _fixedCorner);
    }

    // make rows
    const rows_ = [];
    for (let i = 0; i < renderRowCount; i++) {
      // make row
      const row = [];
      const _rIdx = i + rowIdx;
      const _row = rows[_rIdx];
      const top = isFixedRow
        ? _rIdx * itemHeight + fixedRowHeight
        : _rIdx * itemHeight;

      // make items
      for (let j = 0; j < colCount; j++) {
        const _col = cols[j];
        const itemWidth = colWidths[j];
        const left = colLefts[j];
        const style = {
          position: 'absolute',
          width: `${itemWidth}px`,
          height: `${itemHeight}px`,
          left: `${left}px`,
          zIndex: 2,
        };
        row.push(renderItem(_row, _col, _rIdx, j, style));
      }

      const rowStyle = {
        position: 'absolute',
        width: `${left}px`,
        height: `${itemHeight}px`,
        top: `${top}px`,
        left: isFixedCol ? `${fixedColWidth}px` : null,
        zIndex: 2,
      };
      rows_.push(renderRow(_row, _rIdx, rowStyle, row));
    }

    const scrollerWidth = `${allWidth}px`;
    const scrollerHeight = isFixedRow
      ? `${itemHeight * rowCount + fixedRowHeight}px`
      : `${itemHeight * rowCount}px`;

    return (
      <TableContainer
        ref={innerRef}
        style={style}
        width={width}
        height={height}
        onScroll={_onScroll}
        onMouseUp={onMouseUpTable}
        onMouseLeave={onMouseLeaveTable}
        onMouseMove={onMouseMoveTable}
      >
        <Scroller width={scrollerWidth} height={scrollerHeight}>
          {isFixedRow && isFixedCol && fixedCorner_}
          {isFixedRow && fixedRow_}
          {isFixedCol && fixedCol_}
          {rows_}
        </Scroller>
      </TableContainer>
    );
  }

  // --- event handlers --- //

  _onScroll({ target: { scrollTop, scrollLeft } }) {
    const {
      props: { itemHeight, isFixedRow, isFixedCol, rows, renderRowCount },

      state: { rowIdx },

      // refs
      _fixedRow,
      _fixedCol,
      _fixedCorner,

      // other functions
      _afterChangeRowIdx,
    } = this;

    const rowCount = rows.length;

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

    if (rowIdx !== currentRowIdx) {
      const maxRowIdx = rowCount - renderRowCount;
      const updateRowIdx =
        currentRowIdx < maxRowIdx ? currentRowIdx : maxRowIdx;
      this.setState({ rowIdx: updateRowIdx }, _afterChangeRowIdx);
    }
  }

  // --- other functions --- //

  _afterChangeRowIdx() {
    const {
      props: { onChangeRowIdx },

      state: { rowIdx },
    } = this;

    onChangeRowIdx(rowIdx);
  }
}

export default VirtualizedTableColResize;
