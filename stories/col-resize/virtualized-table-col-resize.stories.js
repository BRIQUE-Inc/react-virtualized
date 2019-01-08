import React, { Component } from 'react';
import {
  HEADER_CELL_BACKGROUND_COLOR,
  TableCell,
  VirtualizedTableColResize,
} from '../../src';

const BAR_STYLE = {
  height: '100%',
  width: '2px',
  backgroundColor: 'black',
  cursor: 'pointer',
};

const Bar = () => <div style={BAR_STYLE} />;

const COL_COUNT = 10;
const ROW_COUNT = 1000;

class VirtualizedTableColResizeStory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cols: [...Array(COL_COUNT)].map((_, j) => ({
        key: `${j}`,
        value: `COL_${j}`,
        width: j * 10 + 100,
      })),
      rows: [...Array(ROW_COUNT)].map((_, i) =>
        [...Array(COL_COUNT)]
          .map((_, j) => ({
            key: `${j}`,
            value: `ITEM(${i}, ${j})`,
          }))
          .reduce(
            (acc, cur) => {
              acc[cur.key] = cur.value;
              return acc;
            },
            { rowKey: `${i}` },
          ),
      ),

      resizeColKey: null,
    };

    this._onMouseDownBar = this._onMouseDownBar.bind(this);
    this._onMouseMoveTable = this._onMouseMoveTable.bind(this);
    this._onMouseUpTable = this._onMouseUpTable.bind(this);
    this._onMouseLeaveTable = this._onMouseLeaveTable.bind(this);

    this._renderItem = this._renderItem.bind(this);
    this._renderFixedRowItem = this._renderFixedRowItem.bind(this);
    this._renderFixedColItem = this._renderFixedColItem.bind(this);
  }

  render() {
    const {
      state: { rows, cols },

      _onMouseUpTable,
      _onMouseLeaveTable,
      _onMouseMoveTable,

      _renderItem,
      _renderFixedRowItem,
      _renderFixedColItem,
    } = this;

    return (
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        <VirtualizedTableColResize
          height={600}
          width={400}
          style={{ boxSizing: 'border-box', border: '1px solid red' }}
          rows={rows}
          cols={cols}
          renderRowCount={20}
          itemHeight={35}
          isFixedRow={true}
          isFixedCol={true}
          fixedRowHeight={40}
          fixedColWidth={40}
          renderItem={_renderItem}
          renderFixedRowItem={_renderFixedRowItem}
          renderFixedColItem={_renderFixedColItem}
          onMouseUpTable={_onMouseUpTable}
          onMouseLeaveTable={_onMouseLeaveTable}
          onMouseMoveTable={_onMouseMoveTable}
        />
        <textarea
          disabled
          style={{ width: 0, flexGrow: 1 }}
          value={`
import React, { Component } from 'react';
import {
  HEADER_CELL_BACKGROUND_COLOR,
  TableCell,
  VirtualizedTableColResize,
} from '@brique/react-';

const BAR_STYLE = {
  height: '100%',
  width: '2px',
  backgroundColor: 'black',
  cursor: 'pointer',
};

const Bar = () => <div style={BAR_STYLE} />;

const COL_COUNT = 10;
const ROW_COUNT = 1000;

class VirtualizedTableColResizeStory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cols: [...Array(COL_COUNT)].map((_, j) => ({
        key: \`\${j}\`,
        value: \`COL_\${j}\`,
        width: j * 10 + 100,
      })),
      rows: [...Array(ROW_COUNT)].map((_, i) =>
        [...Array(COL_COUNT)]
          .map((_, j) => ({
            key: \`\${j}\`,
            value: \`ITEM(\${i}, \${j})\`,
          }))
          .reduce(
            (acc, cur) => {
              acc[cur.key] = cur.value;
              return acc;
            },
            { rowKey: \`\${i}\` },
          ),
      ),

      resizeColKey: null,
    };

    this._onMouseDownBar = this._onMouseDownBar.bind(this);
    this._onMouseMoveTable = this._onMouseMoveTable.bind(this);
    this._onMouseUpTable = this._onMouseUpTable.bind(this);
    this._onMouseLeaveTable = this._onMouseLeaveTable.bind(this);

    this._renderItem = this._renderItem.bind(this);
    this._renderFixedRowItem = this._renderFixedRowItem.bind(this);
    this._renderFixedColItem = this._renderFixedColItem.bind(this);
  }

  render() {
    const {
      state: { rows, cols },

      _onMouseUpTable,
      _onMouseLeaveTable,
      _onMouseMoveTable,

      _renderItem,
      _renderFixedRowItem,
      _renderFixedColItem,
    } = this;

    return (
      <VirtualizedTableColResize
        height={600}
        width={400}
        style={{ boxSizing: 'border-box', border: '1px solid red' }}
        rows={rows}
        cols={cols}
        renderRowCount={20}
        itemHeight={35}
        isFixedRow={true}
        isFixedCol={true}
        fixedRowHeight={40}
        fixedColWidth={40}
        renderItem={_renderItem}
        renderFixedRowItem={_renderFixedRowItem}
        renderFixedColItem={_renderFixedColItem}
        onMouseUpTable={_onMouseUpTable}
        onMouseLeaveTable={_onMouseLeaveTable}
        onMouseMoveTable={_onMouseMoveTable}
      />
    );
  }

  _onMouseDownBar(colKey) {
    this.setState({ resizeColKey: colKey });
  }

  _onMouseMoveTable({ movementX }) {
    this.setState(prevState => {
      if (!prevState.resizeColKey) return null;

      const idx = prevState.cols.findIndex(
        c => c.key === prevState.resizeColKey,
      );
      const col = prevState.cols[idx];

      return {
        ...prevState,
        cols: [
          ...prevState.cols.slice(0, idx),
          {
            ...col,
            width: col.width + movementX < 100 ? 100 : col.width + movementX,
          },
          ...prevState.cols.slice(idx + 1),
        ],
      };
    });
  }

  _onMouseUpTable() {
    this.setState({ resizeColKey: null });
  }

  _onMouseLeaveTable() {
    this.setState({ resizeColKey: null });
  }

  _renderItem(row, col, rowIdx, colIdx, style) {
    return (
      <TableCell key={\`\${rowIdx},\${colIdx}\`} style={style}>
        {row && col && row[col.key]}
      </TableCell>
    );
  }

  _renderFixedRowItem(col, colIdx, style) {
    const {
      // event handlers
      _onMouseDownBar,
    } = this;

    return (
      <TableCell
        key={\`-1,\${colIdx}\`}
        backgroundColor={HEADER_CELL_BACKGROUND_COLOR}
        justifyContent="space-between"
        style={style}
        onMouseDown={() => _onMouseDownBar(col.key)}
      >
        {col && col.value}
        <Bar />
      </TableCell>
    );
  }

  _renderFixedColItem(row, rowIdx, style) {
    return (
      <TableCell key={\`\${rowIdx},-1\`} style={style}>
        {rowIdx}
      </TableCell>
    );
  }
}

export default VirtualizedTableColResizeStory;
        `}
        />
      </div>
    );
  }

  _onMouseDownBar(colKey) {
    this.setState({ resizeColKey: colKey });
  }

  _onMouseMoveTable({ movementX }) {
    this.setState(prevState => {
      if (!prevState.resizeColKey) return null;

      const idx = prevState.cols.findIndex(
        c => c.key === prevState.resizeColKey,
      );
      const col = prevState.cols[idx];

      return {
        ...prevState,
        cols: [
          ...prevState.cols.slice(0, idx),
          {
            ...col,
            width: col.width + movementX < 100 ? 100 : col.width + movementX,
          },
          ...prevState.cols.slice(idx + 1),
        ],
      };
    });
  }

  _onMouseUpTable() {
    this.setState({ resizeColKey: null });
  }

  _onMouseLeaveTable() {
    this.setState({ resizeColKey: null });
  }

  _renderItem(row, col, rowIdx, colIdx, style) {
    return (
      <TableCell key={`${rowIdx},${colIdx}`} style={style}>
        {row && col && row[col.key]}
      </TableCell>
    );
  }

  _renderFixedRowItem(col, colIdx, style) {
    const {
      // event handlers
      _onMouseDownBar,
    } = this;

    return (
      <TableCell
        key={`-1,${colIdx}`}
        backgroundColor={HEADER_CELL_BACKGROUND_COLOR}
        justifyContent="space-between"
        style={style}
        onMouseDown={() => _onMouseDownBar(col.key)}
      >
        {col && col.value}
        <Bar />
      </TableCell>
    );
  }

  _renderFixedColItem(row, rowIdx, style) {
    return (
      <TableCell key={`${rowIdx},-1`} style={style}>
        {rowIdx}
      </TableCell>
    );
  }
}

export default VirtualizedTableColResizeStory;
