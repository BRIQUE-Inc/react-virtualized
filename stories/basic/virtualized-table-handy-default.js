import React, { Component } from 'react';
import { VirtualizedTableHandy } from '../../src';

const COL_COUNT = 500;
const ROW_COUNT = 1000;

class VirtualizedTableHandyDefault extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    };

    this._renderItem = this._renderItem.bind(this);
    this._renderFixedRowItem = this._renderFixedRowItem.bind(this);
    this._renderFixedColItem = this._renderFixedColItem.bind(this);
  }

  render() {
    const {
      state: { rows, cols },

      _renderItem,
      _renderFixedRowItem,
      _renderFixedColItem,
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
        />
        <textarea
          disabled
          style={{ width: 0, flexGrow: 1 }}
          value={`
import React, { Component } from 'react';
import { VirtualizedTableHandy } from '@brique/react-virtualized';

class VirtualizedTableHandyDefault extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cols: [{column_objects}],
      rows: [{row_objects}],
    };

    this._renderItem = this._renderItem.bind(this);
    this._renderFixedRowItem = this._renderFixedRowItem.bind(this);
    this._renderFixedColItem = this._renderFixedColItem.bind(this);
  }

  render() {
    const {
      state: { rows, cols },

      _renderItem,
      _renderFixedRowItem,
      _renderFixedColItem,
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
      />
    );
  }

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
    return (
      <div
        key={\`\${rowIdx},-1\`}
        style={{
          ...style,
          backgroundColor: '#ffffff',
          border: '1px solid black',
          boxSizing: 'border-box',
        }}
      >
        {rowIdx}
      </div>
    );
  }
}

export default VirtualizedTableHandyDefault;
        `}
        />
      </div>
    );
  }

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
    return (
      <div
        key={`${rowIdx},-1`}
        style={{
          ...style,
          backgroundColor: '#ffffff',
          border: '1px solid black',
          boxSizing: 'border-box',
        }}
      >
        {rowIdx}
      </div>
    );
  }
}

export default VirtualizedTableHandyDefault;
