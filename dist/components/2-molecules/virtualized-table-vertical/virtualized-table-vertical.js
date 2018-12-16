import React, { Component } from 'react';
import PropTypes from 'prop-types';

class VirtualizedTableVertical extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowIdx: props.initRowIdx
    };
    this._fixedRow = React.createRef();
    this._onScroll = this._onScroll.bind(this);
    this._afterChangeRowIdx = this._afterChangeRowIdx.bind(this);
  }

  render() {
    const {
      _fixedRow,
      _onScroll,
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
        renderItem,
        renderFixedRowItem,
        innerRef
      },
      state: {
        rowIdx
      }
    } = this;
    let fixedRow = [];

    if (isFixedRow) {
      for (let j = 0; j < colCount; j++) {
        const style = {
          width: typeof itemWidth === 'string' ? itemWidth : `${itemWidth}px`,
          height: '100%'
        };
        fixedRow.push(renderFixedRowItem(j, style));
      }
    }

    fixedRow = React.createElement("div", {
      ref: _fixedRow,
      style: {
        position: 'absolute',
        width: '100%',
        height: `${fixedRowHeight}px`,
        display: 'flex',
        zIndex: 10
      }
    }, fixedRow);
    const rows = [];

    for (let i = 0; i < renderRowCount; i++) {
      const row = [];

      const _rIdx = i + rowIdx;

      const top = isFixedRow ? _rIdx * itemHeight + fixedRowHeight : _rIdx * itemHeight;

      for (let j = 0; j < colCount; j++) {
        const style = {
          width: typeof itemWidth === 'string' ? itemWidth : `${itemWidth}px`,
          height: '100%'
        };
        row.push(renderItem(_rIdx, j, style));
      }

      rows.push(React.createElement("div", {
        key: _rIdx,
        style: {
          position: 'absolute',
          top: `${top}px`,
          zIndex: 2,
          width: '100%',
          height: `${itemHeight}px`,
          display: 'flex'
        }
      }, row));
    }

    return React.createElement("div", {
      style: { ...style,
        overflow: 'auto',
        width,
        height
      },
      onScroll: _onScroll,
      ref: innerRef
    }, React.createElement("div", {
      style: {
        position: 'relative',
        width: '100%',
        height: `${itemHeight * rowCount}px`
      }
    }, isFixedRow && fixedRow, rows));
  }

  _onScroll({
    target: {
      scrollTop
    }
  }) {
    const {
      _fixedRow,
      _afterChangeRowIdx,
      props: {
        itemHeight,
        isFixedRow,
        rowCount,
        renderRowCount
      },
      state: {
        rowIdx
      }
    } = this;

    if (isFixedRow) {
      _fixedRow.current.style.top = `${scrollTop}px`;
    }

    const currentRowIdx = Math.floor(scrollTop / itemHeight);

    if (rowIdx !== currentRowIdx) {
      const maxRowIdx = rowCount - renderRowCount;
      const updateRowIdx = currentRowIdx < maxRowIdx ? currentRowIdx : maxRowIdx;
      this.setState({
        rowIdx: updateRowIdx
      }, _afterChangeRowIdx);
    }
  }

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

}

VirtualizedTableVertical.defaultProps = {
  height: 300,
  width: 300,
  style: {},
  rowCount: 1000,
  colCount: 10,
  renderRowCount: 10,
  initRowIdx: 0,
  itemHeight: 40,
  itemWidth: 120,
  isFixedRow: false,
  fixedRowHeight: 50,
  renderItem: (rowIdx, colIdx, style) => React.createElement("div", {
    key: `${rowIdx},${colIdx}`,
    style: { ...style,
      backgroundColor: '#ffffff',
      border: '1px solid black',
      boxSizing: 'border-box'
    }
  }, `${rowIdx}, ${colIdx}`),
  renderFixedRowItem: (colIdx, style) => React.createElement("div", {
    key: `-1,${colIdx}`,
    style: { ...style,
      backgroundColor: '#ffffff',
      border: '1px solid black',
      boxSizing: 'border-box'
    }
  }, `HEAD${colIdx}`),
  onChangeRowIdx: rowIdx => {},
  innerRef: el => {}
};
VirtualizedTableVertical.propTypes = {
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
  renderItem: PropTypes.func,
  renderFixedRowItem: PropTypes.func,
  onChangeRowIdx: PropTypes.func,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};
export default VirtualizedTableVertical;