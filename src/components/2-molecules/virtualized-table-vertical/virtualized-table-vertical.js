import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HEADER_CELL_BACKGROUND_COLOR } from '../../../assets/js/constants';
import Scroller from '../../1-atoms/scroller/scroller';
import TableCell from '../../1-atoms/table-cell/table-cell';
import TableContainer from '../../1-atoms/table-container/table-container';

/* ======= Component ======= */

/* === Main === */

class VirtualizedTableVertical extends Component {
  static propTypes = {
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: PropTypes.object,
    rowCount: PropTypes.number,
    colCount: PropTypes.number,
    renderRowCount: PropTypes.number,
    initRowIdx: PropTypes.number,
    itemHeight: PropTypes.number,
    itemWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    isFixedRow: PropTypes.bool,
    fixedRowHeight: PropTypes.number,
    renderRow: PropTypes.func,
    renderItem: PropTypes.func,
    renderFixedRow: PropTypes.func,
    renderFixedRowItem: PropTypes.func,
    onChangeRowIdx: PropTypes.func,
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  };

  static defaultProps = {
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
    renderRow: (rowIdx, style, children) => (
      <div key={rowIdx} style={style}>
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
    onChangeRowIdx: rowIdx => {},
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

    // event handlers
    this._onScroll = this._onScroll.bind(this);
    this._afterChangeRowIdx = this._afterChangeRowIdx.bind(this);
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
        itemHeight,
        itemWidth,
        isFixedRow,
        fixedRowHeight,
        renderRow,
        renderItem,
        renderFixedRow,
        renderFixedRowItem,
        innerRef,
      },

      state: { rowIdx },

      // refs
      _fixedRow,

      // event handlers
      _onScroll,
    } = this;

    // make fixed row
    let fixedRow = [];
    if (isFixedRow) {
      for (let j = 0; j < colCount; j++) {
        const style = {
          width: typeof itemWidth === 'string' ? itemWidth : `${itemWidth}px`,
          height: '100%',
        };
        fixedRow.push(renderFixedRowItem(j, style));
      }
    }
    const fixedRowStyle = {
      position: 'absolute',
      width: '100%',
      height: `${fixedRowHeight}px`,
      display: 'flex',
      zIndex: 10,
    };
    fixedRow = renderFixedRow(fixedRowStyle, fixedRow, _fixedRow);

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
      for (let j = 0; j < colCount; j++) {
        const style = {
          width: typeof itemWidth === 'string' ? itemWidth : `${itemWidth}px`,
          height: '100%',
        };
        row.push(renderItem(_rIdx, j, style));
      }

      const rowStyle = {
        position: 'absolute',
        top: `${top}px`,
        zIndex: 2,
        width: '100%',
        height: `${itemHeight}px`,
        display: 'flex',
      };
      rows.push(renderRow(_rIdx, rowStyle, row));
    }

    return (
      <TableContainer
        width={width}
        height={height}
        style={style}
        onScroll={_onScroll}
        ref={innerRef}
      >
        <Scroller width="100%" height={`${itemHeight * rowCount}px`}>
          {isFixedRow && fixedRow}
          {rows}
        </Scroller>
      </TableContainer>
    );
  }

  // --- event handlers --- //

  _onScroll({ target: { scrollTop } }) {
    const {
      props: { itemHeight, isFixedRow, rowCount, renderRowCount },

      state: { rowIdx },

      // refs
      _fixedRow,

      // other functions
      _afterChangeRowIdx,
    } = this;

    if (isFixedRow) {
      _fixedRow.current.style.top = `${scrollTop}px`;
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

export default VirtualizedTableVertical;
