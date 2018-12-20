import React, { Component } from 'react';
import { VirtualizedTableHandy } from '../../src';

/* ======= Constants ======= */

/* === Sample code === */

const CODE = `
import React, { Component } from 'react';
import { VirtualizedTableHandy } from '@brique/react-virtualized';

/* ======= Constants ======= */

/* === Table size === */

const COL_COUNT = 500;
const ROW_COUNT = 16;

/* ======= Components ======= */

/* === Main === */

class VirtualizedTableHandyCheckbox extends Component {
  // --- lifecycle functions --- //

  constructor(props) {
    super(props);

    this.state = {
      // table
      cols: [...Array(COL_COUNT)].map((_, j) => ({
        key: \`\${j}\`,
        value: \`COL_\${j}\`,
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

      // checkbox
      checked: {},
    };

    // event handlers
    this._onChangeCheckedRow = this._onChangeCheckedRow.bind(this);
    this._onChangeCheckedAll = this._onChangeCheckedAll.bind(this);

    // render functions
    this._renderItem = this._renderItem.bind(this);
    this._renderFixedRowItem = this._renderFixedRowItem.bind(this);
    this._renderFixedColItem = this._renderFixedColItem.bind(this);
    this._renderFixedCorner = this._renderFixedCorner.bind(this);
  }

  render() {
    const {
      state: { rows, cols },

      // render functions
      _renderItem,
      _renderFixedRowItem,
      _renderFixedColItem,
      _renderFixedCorner,
    } = this;

    return (
      <VirtualizedTableHandy
        height={600}
        width={400}
        style={{ boxSizing: 'border-box', border: '1px solid red' }}
        rows={rows}
        cols={cols}
        renderRowCount={16}
        renderColCount={3}
        itemHeight={40}
        itemWidth={140}
        isFixedRow={true}
        isFixedCol={true}
        fixedRowHeight={80}
        fixedColWidth={40}
        renderItem={_renderItem}
        renderFixedRowItem={_renderFixedRowItem}
        renderFixedColItem={_renderFixedColItem}
        renderFixedCorner={_renderFixedCorner}
      />
    );
  }

  // --- event handlers --- //

  _onChangeCheckedRow(rowKey, checked) {
    this.setState(prevState => ({
      ...prevState,
      checked: {
        ...prevState.checked,
        [rowKey]: checked,
      },
    }));
  }

  _onChangeCheckedAll(checked) {
    this.setState(prevState => ({
      ...prevState,
      checked: checked
        ? prevState.rows.reduce((acc, row) => {
          acc[row.rowKey] = true;
          return acc;
        }, {})
        : {},
    }));
  }

  // --- render functions --- //

  _renderItem(row, col, rowIdx, colIdx, style) {
    return (
      <div
        key={\`\${rowIdx},\${colIdx}\`}
        style={{
          ...style,
          backgroundColor: '#ffffff',
          border: '1px solid black',
          boxSizing: 'border-box',
        }}
      >
        {row && col && row[col.key]}
      </div>
    );
  }

  _renderFixedRowItem(col, colIdx, style) {
    return (
      <div
        key={\`-1,\${colIdx}\`}
        style={{
          ...style,
          backgroundColor: '#ffffff',
          border: '1px solid black',
          boxSizing: 'border-box',
        }}
      >
        {col && col.value}
      </div>
    );
  }

  _renderFixedColItem(row, rowIdx, style) {
    const {
      state: { checked },

      // event handlers
      _onChangeCheckedRow,
    } = this;
    const isChecked = !!checked[row.rowKey];

    return (
      <div
        key={\`\${rowIdx},-1\`}
        style={{
          ...style,
          backgroundColor: '#ffffff',
          border: '1px solid black',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <input
          type="checkbox"
          checked={isChecked}
          onChange={e => _onChangeCheckedRow(row.rowKey, e.target.checked)}
        />
      </div>
    );
  }

  _renderFixedCorner(style, ref) {
    const {
      state: { rows, checked },

      // event handlers
      _onChangeCheckedAll,
    } = this;
    const isChecked =
      rows.length === Object.values(checked).filter(v => v).length;

    return (
      <div
        ref={ref}
        style={{
          ...style,
          backgroundColor: '#ffffff',
          border: '1px solid black',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <input
          type="checkbox"
          checked={isChecked}
          onChange={e => _onChangeCheckedAll(e.target.checked)}
        />
      </div>
    );
  }
}

export default VirtualizedTableHandyCheckbox;
`;

/* === Table size === */

const COL_COUNT = 500;
const ROW_COUNT = 16;

/* ======= Components ======= */

/* === Main === */

class VirtualizedTableHandyCheckbox extends Component {
  // --- lifecycle functions --- //

  constructor(props) {
    super(props);

    this.state = {
      // table
      cols: [...Array(COL_COUNT)].map((_, j) => ({
        key: `${j}`,
        value: `COL_${j}`,
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

      // checkbox
      checked: {},
    };

    // event handlers
    this._onChangeCheckedRow = this._onChangeCheckedRow.bind(this);
    this._onChangeCheckedAll = this._onChangeCheckedAll.bind(this);

    // render functions
    this._renderItem = this._renderItem.bind(this);
    this._renderFixedRowItem = this._renderFixedRowItem.bind(this);
    this._renderFixedColItem = this._renderFixedColItem.bind(this);
    this._renderFixedCorner = this._renderFixedCorner.bind(this);
  }

  render() {
    const {
      state: { rows, cols },

      // render functions
      _renderItem,
      _renderFixedRowItem,
      _renderFixedColItem,
      _renderFixedCorner,
    } = this;

    return (
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        <VirtualizedTableHandy
          height={600}
          width={400}
          style={{ boxSizing: 'border-box', border: '1px solid red' }}
          rows={rows}
          cols={cols}
          renderRowCount={16}
          renderColCount={3}
          itemHeight={40}
          itemWidth={140}
          isFixedRow={true}
          isFixedCol={true}
          fixedRowHeight={80}
          fixedColWidth={40}
          renderItem={_renderItem}
          renderFixedRowItem={_renderFixedRowItem}
          renderFixedColItem={_renderFixedColItem}
          renderFixedCorner={_renderFixedCorner}
        />
        <textarea disabled style={{ width: 0, flexGrow: 1 }} value={CODE} />
      </div>
    );
  }

  // --- event handlers --- //

  _onChangeCheckedRow(rowKey, checked) {
    this.setState(prevState => ({
      ...prevState,
      checked: {
        ...prevState.checked,
        [rowKey]: checked,
      },
    }));
  }

  _onChangeCheckedAll(checked) {
    this.setState(prevState => ({
      ...prevState,
      checked: checked
        ? prevState.rows.reduce((acc, row) => {
          acc[row.rowKey] = true;
          return acc;
        }, {})
        : {},
    }));
  }

  // --- render functions --- //

  _renderItem(row, col, rowIdx, colIdx, style) {
    return (
      <div
        key={`${rowIdx},${colIdx}`}
        style={{
          ...style,
          backgroundColor: '#ffffff',
          border: '1px solid black',
          boxSizing: 'border-box',
        }}
      >
        {row && col && row[col.key]}
      </div>
    );
  }

  _renderFixedRowItem(col, colIdx, style) {
    return (
      <div
        key={`-1,${colIdx}`}
        style={{
          ...style,
          backgroundColor: '#ffffff',
          border: '1px solid black',
          boxSizing: 'border-box',
        }}
      >
        {col && col.value}
      </div>
    );
  }

  _renderFixedColItem(row, rowIdx, style) {
    const {
      state: { checked },

      // event handlers
      _onChangeCheckedRow,
    } = this;
    const isChecked = !!checked[row.rowKey];

    return (
      <div
        key={`${rowIdx},-1`}
        style={{
          ...style,
          backgroundColor: '#ffffff',
          border: '1px solid black',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <input
          type="checkbox"
          checked={isChecked}
          onChange={e => _onChangeCheckedRow(row.rowKey, e.target.checked)}
        />
      </div>
    );
  }

  _renderFixedCorner(style, ref) {
    const {
      state: { rows, checked },

      // event handlers
      _onChangeCheckedAll,
    } = this;
    const isChecked =
      rows.length === Object.values(checked).filter(v => v).length;

    return (
      <div
        ref={ref}
        style={{
          ...style,
          backgroundColor: '#ffffff',
          border: '1px solid black',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <input
          type="checkbox"
          checked={isChecked}
          onChange={e => _onChangeCheckedAll(e.target.checked)}
        />
      </div>
    );
  }
}

export default VirtualizedTableHandyCheckbox;
