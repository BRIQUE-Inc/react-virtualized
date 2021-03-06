import React, { Component } from 'react';
import {
  HEADER_CELL_BACKGROUND_COLOR,
  TableCell,
  VirtualizedTable,
} from '../../src';

const _makeCols = idx => [...Array(3)].map((_, j) => ({ colId: idx + j }));
const _makeRows = (rowIdx, colIdx) =>
  [...Array(20)].map((_, i) =>
    [...Array(3)]
      .map((_, j) => colIdx + j)
      .reduce((row, colId) => ({ ...row, [colId]: `${rowIdx + i},${colId}` }), {
        _id: rowIdx + i,
      }),
  );

class VirtualizedTableDefault extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colIdx: 0,
      rowIdx: 0,
      cols: _makeCols(0),
      rows: _makeRows(0, 0),
    };
    this._table = React.createRef();
    this._renderItem = this._renderItem.bind(this);
    this._renderFixedRowItem = this._renderFixedRowItem.bind(this);
    this._renderFixedColItem = this._renderFixedColItem.bind(this);
    this._onChangeRowIdx = this._onChangeRowIdx.bind(this);
    this._onChangeColIdx = this._onChangeColIdx.bind(this);
    this._update = this._update.bind(this);
  }

  render() {
    const {
      _table,
      _renderItem,
      _renderFixedRowItem,
      _renderFixedColItem,
      _onChangeRowIdx,
      _onChangeColIdx,
    } = this;
    return (
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        <VirtualizedTable
          height={600}
          width={400}
          style={{ boxSizing: 'border-box', border: '1px solid red' }}
          rowCount={10000}
          colCount={400}
          renderRowCount={20}
          renderColCount={3}
          itemHeight={35}
          itemWidth={140}
          isFixedRow={true}
          isFixedCol={true}
          fixedRowHeight={40}
          fixedColWidth={40}
          renderItem={_renderItem}
          renderFixedRowItem={_renderFixedRowItem}
          renderFixedColItem={_renderFixedColItem}
          onChangeRowIdx={_onChangeRowIdx}
          onChangeColIdx={_onChangeColIdx}
          innerRef={_table}
        />
        <textarea
          disabled
          style={{ width: 0, flexGrow: 1 }}
          value={`
import React, { Component } from 'react';
import {
  HEADER_CELL_BACKGROUND_COLOR,
  TableCell,
  VirtualizedTable,
} from '@brique/react-virtualized';

const _makeCols = idx => [...Array(3)].map((_, j) => ({ colId: idx + j }));
const _makeRows = (rowIdx, colIdx) =>
  [...Array(20)].map((_, i) =>
    [...Array(3)]
      .map((_, j) => colIdx + j)
      .reduce((row, colId) => ({ ...row, [colId]: \`\${rowIdx + i},\${colId}\` }), {
        _id: rowIdx + i,
      }),
  );

class VirtualizedTableDefault extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colIdx: 0,
      rowIdx: 0,
      cols: _makeCols(0),
      rows: _makeRows(0, 0),
    };
    this._table = React.createRef();
    this._renderItem = this._renderItem.bind(this);
    this._renderFixedRowItem = this._renderFixedRowItem.bind(this);
    this._renderFixedColItem = this._renderFixedColItem.bind(this);
    this._onChangeRowIdx = this._onChangeRowIdx.bind(this);
    this._onChangeColIdx = this._onChangeColIdx.bind(this);
    this._update = this._update.bind(this);
  }

  render() {
    const {
      _table,
      _renderItem,
      _renderFixedRowItem,
      _renderFixedColItem,
      _onChangeRowIdx,
      _onChangeColIdx,
    } = this;
    return (
      <VirtualizedTable
        height={600}
        width={400}
        style={{ boxSizing: 'border-box', border: '1px solid red' }}
        rowCount={10000}
        colCount={400}
        renderRowCount={20}
        renderColCount={3}
        itemHeight={35}
        itemWidth={140}
        isFixedRow={true}
        isFixedCol={true}
        fixedRowHeight={40}
        fixedColWidth={40}
        renderItem={_renderItem}
        renderFixedRowItem={_renderFixedRowItem}
        renderFixedColItem={_renderFixedColItem}
        onChangeRowIdx={_onChangeRowIdx}
        onChangeColIdx={_onChangeColIdx}
        innerRef={_table}
      />
    );
  }

  componentDidMount() {
    console.log(this._table.current);
  }

  _renderItem(rowIdx, colIdx, style) {
    const { colIdx: startColIdx, rowIdx: startRowIdx, cols, rows } = this.state;

    const colKey = colIdx - startColIdx;
    const col = cols[colKey];
    const rowKey = rowIdx - startRowIdx;
    const row = rows[rowKey];
    const content = row && col && row[col.colId];

    return (
      <TableCell key={\`\${rowIdx},\${colIdx}\`} style={style}>
        {content}
      </TableCell>
    );
  }

  _renderFixedRowItem(colIdx, style) {
    const { colIdx: startColIdx, cols } = this.state;

    const key = colIdx - startColIdx;
    const col = cols[key];

    return (
      <TableCell
        key={\`-1,\${colIdx}\`}
        backgroundColor={HEADER_CELL_BACKGROUND_COLOR}
        style={style}
      >
        {col && \`COL_\${col.colId}\`}
      </TableCell>
    );
  }

  _renderFixedColItem(rowIdx, style) {
    return (
      <TableCell key={\`\${rowIdx},-1\`} style={style}>
        {rowIdx}
      </TableCell>
    );
  }

  _onChangeRowIdx(rowIdx) {
    this.setState({ rowIdx }, this._update);
  }

  _onChangeColIdx(colIdx) {
    this.setState({ colIdx }, this._update);
  }

  _update() {
    const { rowIdx, colIdx } = this.state;
    this.setState({ rows: _makeRows(rowIdx, colIdx), cols: _makeCols(colIdx) });
  }
}

export default VirtualizedTableDefault;
        `}
        />
      </div>
    );
  }

  componentDidMount() {
    console.log(this._table.current);
  }

  _renderItem(rowIdx, colIdx, style) {
    const { colIdx: startColIdx, rowIdx: startRowIdx, cols, rows } = this.state;

    const colKey = colIdx - startColIdx;
    const col = cols[colKey];
    const rowKey = rowIdx - startRowIdx;
    const row = rows[rowKey];
    const content = row && col && row[col.colId];

    return (
      <TableCell key={`${rowIdx},${colIdx}`} style={style}>
        {content}
      </TableCell>
    );
  }

  _renderFixedRowItem(colIdx, style) {
    const { colIdx: startColIdx, cols } = this.state;

    const key = colIdx - startColIdx;
    const col = cols[key];

    return (
      <TableCell
        key={`-1,${colIdx}`}
        backgroundColor={HEADER_CELL_BACKGROUND_COLOR}
        style={style}
      >
        {col && `COL_${col.colId}`}
      </TableCell>
    );
  }

  _renderFixedColItem(rowIdx, style) {
    return (
      <TableCell key={`${rowIdx},-1`} style={style}>
        {rowIdx}
      </TableCell>
    );
  }

  _onChangeRowIdx(rowIdx) {
    this.setState({ rowIdx }, this._update);
  }

  _onChangeColIdx(colIdx) {
    this.setState({ colIdx }, this._update);
  }

  _update() {
    const { rowIdx, colIdx } = this.state;
    this.setState({ rows: _makeRows(rowIdx, colIdx), cols: _makeCols(colIdx) });
  }
}

export default VirtualizedTableDefault;
