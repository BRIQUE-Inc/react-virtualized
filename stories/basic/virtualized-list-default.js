import React, { Component } from 'react';
import { TableCell, VirtualizedList } from '../../src';

const _makeItems = idx => [...Array(40)].map((_, i) => ({ id: idx + i }));

class VirtualizedListDefault extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idx: 0,
      listItems: _makeItems(0),
    };
    this._renderItem = this._renderItem.bind(this);
    this._onChangeIdx = this._onChangeIdx.bind(this);
    this._update = this._update.bind(this);
  }

  render() {
    const { _renderItem, _onChangeIdx } = this;
    return (
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        <VirtualizedList
          height={600}
          width={400}
          itemCount={10000}
          renderItemCount={30}
          itemHeight={40}
          renderItem={_renderItem}
          onChangeIdx={_onChangeIdx}
        />
        <textarea
          disabled
          style={{ width: 0, flexGrow: 1 }}
          value={`
import React, { Component } from 'react';
import { TableCell, VirtualizedList } from '@brique/react-virtualized';

const _makeItems = idx => [...Array(40)].map((_, i) => ({ id: idx + i }));

class VirtualizedListDefault extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idx: 0,
      listItems: _makeItems(0),
    };
    this._renderItem = this._renderItem.bind(this);
    this._onChangeIdx = this._onChangeIdx.bind(this);
    this._update = this._update.bind(this);
  }

  render() {
    const { _renderItem, _onChangeIdx } = this;
    return (
      <VirtualizedList
        height={600}
        width={400}
        itemCount={10000}
        renderItemCount={30}
        itemHeight={40}
        renderItem={_renderItem}
        onChangeIdx={_onChangeIdx}
      />
    );
  }

  _renderItem(idx, style) {
    const { idx: startIdx, listItems } = this.state;
    const itemKey = idx - startIdx;
    const item = listItems[itemKey];
    const content = item && item.id;
    return (
      <TableCell
        key={idx}
        style={style}
      >
        {content}
      </div>
    );
  }

  _onChangeIdx(idx) {
    this.setState({ idx }, this._update);
  }

  _update() {
    const { idx } = this.state;
    this.setState({ listItems: _makeItems(idx) });
  }
}

export default VirtualizedListDefault;
        `}
        />
      </div>
    );
  }

  _renderItem(idx, style) {
    const { idx: startIdx, listItems } = this.state;
    const itemKey = idx - startIdx;
    const item = listItems[itemKey];
    const content = item && item.id;
    return (
      <TableCell key={idx} style={style}>
        {content}
      </TableCell>
    );
  }

  _onChangeIdx(idx) {
    this.setState({ idx }, this._update);
  }

  _update() {
    const { idx } = this.state;
    this.setState({ listItems: _makeItems(idx) });
  }
}

export default VirtualizedListDefault;
