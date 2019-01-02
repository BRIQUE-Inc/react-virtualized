import React, { Component } from 'react';
import {
  HEADER_CELL_BACKGROUND_COLOR,
  TableCell,
  VirtualizedTableVertical,
} from '../../src';

const COL_NUM = 5;
const _makeCols = () => [...Array(COL_NUM)].map((_, j) => ({ colId: j }));
const _makeRows = rowIdx =>
  [...Array(20)].map((_, i) =>
    [...Array(COL_NUM)]
      .map((_, j) => j)
      .reduce((row, colId) => ({ ...row, [colId]: `${rowIdx + i},${colId}` }), {
        _id: rowIdx + i,
      }),
  );

class VirtualizedTableVerticalDefault extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowIdx: 0,
      cols: _makeCols(),
      rows: _makeRows(0),
    };
    this._renderItem = this._renderItem.bind(this);
    this._renderFixedRowItem = this._renderFixedRowItem.bind(this);
    this._onChangeRowIdx = this._onChangeRowIdx.bind(this);
    this._update = this._update.bind(this);
  }

  render() {
    const { _renderItem, _renderFixedRowItem, _onChangeRowIdx } = this;
    return (
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        <VirtualizedTableVertical
          height={600}
          width={500}
          rowCount={10000}
          colCount={COL_NUM}
          renderRowCount={20}
          itemHeight={35}
          itemWidth={`${100 / COL_NUM}%`}
          isFixedRow={true}
          fixedRowHeight={40}
          renderItem={_renderItem}
          renderFixedRowItem={_renderFixedRowItem}
          onChangeRowIdx={_onChangeRowIdx}
        />
        <textarea
          disabled
          style={{ width: 0, flexGrow: 1 }}
          value={`
import React, { Component } from 'react';
import {
  HEADER_CELL_BACKGROUND_COLOR,
  TableCell,
  VirtualizedTableVertical,
} from '@brique/react-virtualized';

const COL_NUM = 5;
const _makeCols = () => [...Array(COL_NUM)].map((_, j) => ({ colId: j }));
const _makeRows = rowIdx =>
  [...Array(16)].map((_, i) =>
    [...Array(COL_NUM)]
      .map((_, j) => j)
      .reduce((row, colId) => ({ ...row, [colId]: \`\${rowIdx + i},\${colId}\` }), {
        _id: rowIdx + i,
      }),
  );

class VirtualizedTableVerticalDefault extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowIdx: 0,
      cols: _makeCols(),
      rows: _makeRows(0),
    };
    this._renderItem = this._renderItem.bind(this);
    this._renderFixedRowItem = this._renderFixedRowItem.bind(this);
    this._onChangeRowIdx = this._onChangeRowIdx.bind(this);
    this._update = this._update.bind(this);
  }

  render() {
    const { _renderItem, _renderFixedRowItem, _onChangeRowIdx } = this;
    return (
      <VirtualizedTableVertical
        height={600}
        width={500}
        rowCount={10000}
        colCount={COL_NUM}
        renderRowCount={20}
        itemHeight={35}
        itemWidth={\`\${100 / COL_NUM}%\`}
        isFixedRow={true}
        fixedRowHeight={40}
        renderItem={_renderItem}
        renderFixedRowItem={_renderFixedRowItem}
        onChangeRowIdx={_onChangeRowIdx}
      />
    );
  }

  _renderItem(rowIdx, colIdx, style) {
    const { rowIdx: startRowIdx, cols, rows } = this.state;

    const col = cols[colIdx];
    const rowKey = rowIdx - startRowIdx;
    const row = rows[rowKey];
    const content = row && col && row[col.colId];

    return (
      <TableCell
        key={\`\${rowIdx},\${colIdx}\`}
        style={style}
      >
        {content}
      </TableCell>
    );
  }

  _renderFixedRowItem(colIdx, style) {
    const { cols } = this.state;
    const col = cols[colIdx];

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

  _onChangeRowIdx(rowIdx) {
    this.setState({ rowIdx }, this._update);
  }

  _update() {
    const { rowIdx } = this.state;
    this.setState({ rows: _makeRows(rowIdx) });
  }
}

export default VirtualizedTableVerticalDefault;
        `}
        />
      </div>
    );
  }

  _renderItem(rowIdx, colIdx, style) {
    const { rowIdx: startRowIdx, cols, rows } = this.state;

    const col = cols[colIdx];
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
    const { cols } = this.state;
    const col = cols[colIdx];

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

  _onChangeRowIdx(rowIdx) {
    this.setState({ rowIdx }, this._update);
  }

  _update() {
    const { rowIdx } = this.state;
    this.setState({ rows: _makeRows(rowIdx) });
  }
}

export default VirtualizedTableVerticalDefault;
