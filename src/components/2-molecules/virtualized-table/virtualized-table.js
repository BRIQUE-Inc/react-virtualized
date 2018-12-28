import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HEADER_CELL_BACKGROUND_COLOR } from '../../../assets/js/constants';
import Scroller from '../../1-atoms/scroller/scroller';
import TableCell from '../../1-atoms/table-cell/table-cell';
import TableContainer from '../../1-atoms/table-container/table-container';

/* ======= Component ======= */

/* === Main === */

class VirtualizedTable extends Component {
  // --- lifecycle functions --- //

  constructor(props) {
    super(props);

    this.state = {
      rowIdx: props.initRowIdx,
      colIdx: props.initColIdx,
    };

    // refs
    this._fixedRow = React.createRef();
    this._fixedCol = React.createRef();
    this._fixedCorner = React.createRef();

    // event handlers
    this._onScroll = this._onScroll.bind(this);

    // other functions
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
        rowCount,
        colCount,
        renderRowCount,
        renderColCount,
        itemHeight,
        itemWidth,
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
        innerRef,
      },

      state: { rowIdx, colIdx },

      // refs
      _fixedRow,
      _fixedCol,
      _fixedCorner,

      // event handlers
      _onScroll,
    } = this;

    // make fixed row
    let fixedRow = [];
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
          zIndex: 6,
        };
        fixedRow.push(renderFixedRowItem(_cIdx, fixedRowItemStyle));
      }
    }
    const fixedRowStyle = {
      position: 'absolute',
      width: `${itemWidth * colCount}px`,
      height: `${fixedRowHeight}px`,
      left: isFixedCol ? `${fixedColWidth}px` : null,
      zIndex: 6,
    };
    fixedRow = renderFixedRow(fixedRowStyle, fixedRow, _fixedRow);

    // make fixed column
    let fixedCol = [];
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
        fixedCol.push(renderFixedColItem(_rIdx, fixedColItemStyle));
      }
    }
    const fixedColStyle = {
      position: 'absolute',
      width: `${fixedColWidth}px`,
      zIndex: 4,
    };
    fixedCol = renderFixedCol(fixedColStyle, fixedCol, _fixedCol);

    // make fixed corner
    let fixedCorner;
    if (isFixedRow && isFixedCol) {
      const style = {
        position: 'absolute',
        width: `${fixedColWidth}px`,
        height: `${fixedRowHeight}px`,
        top: 0,
        left: 0,
        zIndex: 8,
      };
      fixedCorner = renderFixedCorner(style, _fixedCorner);
    }

    // make rows
    const rows = [];
    for (let i = 0; i < renderRowCount; i++) {
      // make row
      const row = [];
      const _rIdx = i + rowIdx;
      const top = isFixedRow
        ? _rIdx * itemHeight + fixedRowHeight
        : _rIdx * itemHeight;

      // make items
      for (let j = 0; j < renderColCount; j++) {
        const _cIdx = j + colIdx;
        const left = _cIdx * itemWidth;
        const style = {
          position: 'absolute',
          width: `${itemWidth}px`,
          height: `${itemHeight}px`,
          left: `${left}px`,
          zIndex: 2,
        };
        row.push(renderItem(_rIdx, _cIdx, style));
      }

      const rowStyle = {
        position: 'absolute',
        width: `${itemWidth * colCount}px`,
        height: `${itemHeight}px`,
        top: `${top}px`,
        left: isFixedCol ? `${fixedColWidth}px` : null,
        zIndex: 2,
      };
      rows.push(renderRow(_rIdx, rowStyle, row));
    }

    const scrollerWidth = isFixedCol
      ? `${itemWidth * colCount + fixedColWidth}px`
      : `${itemWidth * colCount}px`;
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
      >
        <Scroller width={scrollerWidth} height={scrollerHeight}>
          {isFixedRow && isFixedCol && fixedCorner}
          {isFixedRow && fixedRow}
          {isFixedCol && fixedCol}
          {rows}
        </Scroller>
      </TableContainer>
    );
  }

  // --- event handlers --- //

  _onScroll({ target: { scrollTop, scrollLeft } }) {
    const {
      props: {
        itemHeight,
        itemWidth,
        isFixedRow,
        isFixedCol,
        rowCount,
        colCount,
        renderRowCount,
        renderColCount,
      },

      state: { rowIdx, colIdx },

      // refs
      _fixedRow,
      _fixedCol,
      _fixedCorner,

      // other functions
      _afterChangeRowIdx,
      _afterChangeColIdx,
      _afterChangeRowColIdx,
    } = this;

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
      const updateRowIdx =
        currentRowIdx < maxRowIdx ? currentRowIdx : maxRowIdx;
      const updateColIdx =
        currentColIdx < maxColIdx ? currentColIdx : maxColIdx;
      this.setState(
        { rowIdx: updateRowIdx, colIdx: updateColIdx },
        _afterChangeRowColIdx,
      );
    } else if (rowIdx !== currentRowIdx && colIdx === currentColIdx) {
      const maxRowIdx = rowCount - renderRowCount;
      const updateRowIdx =
        currentRowIdx < maxRowIdx ? currentRowIdx : maxRowIdx;
      this.setState({ rowIdx: updateRowIdx }, _afterChangeRowIdx);
    } else if (rowIdx === currentRowIdx && colIdx !== currentColIdx) {
      const maxColIdx = colCount - renderColCount;
      const updateColIdx =
        currentColIdx < maxColIdx ? currentColIdx : maxColIdx;
      this.setState({ colIdx: updateColIdx }, _afterChangeColIdx);
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

  _afterChangeColIdx() {
    const {
      props: { onChangeColIdx },
      state: { colIdx },
    } = this;
    onChangeColIdx(colIdx);
  }

  _afterChangeRowColIdx() {
    const {
      props: { onChangeRowIdx, onChangeColIdx },
      state: { rowIdx, colIdx },
    } = this;
    onChangeRowIdx(rowIdx);
    onChangeColIdx(colIdx);
  }
}

VirtualizedTable.defaultProps = {
  height: 300,
  width: 300,
  style: {},
  rowCount: 1000,
  colCount: 100,
  renderRowCount: 10,
  renderColCount: 3,
  initRowIdx: 0,
  initColIdx: 0,
  itemHeight: 35,
  itemWidth: 120,
  isFixedRow: false,
  isFixedCol: false,
  fixedRowHeight: 40,
  fixedColWidth: 40,
  renderRow: (rowIdx, style, children) => (
    <div key={`${rowIdx}`} style={style}>
      {children}
    </div>
  ),
  renderItem: (rowIdx, colIdx, style) => (
    <TableCell
      key={`${rowIdx},${colIdx}`}
      style={style}
    >{`${rowIdx}, ${colIdx}`}</TableCell>
  ),
  renderFixedRow: (style, children, ref) => (
    <div ref={ref} style={style}>
      {children}
    </div>
  ),
  renderFixedRowItem: (colIdx, style) => (
    <TableCell
      key={`-1,${colIdx}`}
      backgroundColor={HEADER_CELL_BACKGROUND_COLOR}
      style={style}
    >{`HEAD${colIdx}`}</TableCell>
  ),
  renderFixedCol: (style, children, ref) => (
    <div ref={ref} style={style}>
      {children}
    </div>
  ),
  renderFixedColItem: (rowIdx, style) => (
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
  onChangeColIdx: colIdx => {},
  innerRef: el => {},
};

VirtualizedTable.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  rowCount: PropTypes.number,
  colCount: PropTypes.number,
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
  renderRow: PropTypes.func,
  renderItem: PropTypes.func,
  renderFixedRow: PropTypes.func,
  renderFixedRowItem: PropTypes.func,
  renderFixedCol: PropTypes.func,
  renderFixedColItem: PropTypes.func,
  renderFixedCorner: PropTypes.func,
  onChangeRowIdx: PropTypes.func,
  onChangeColIdx: PropTypes.func,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default VirtualizedTable;
