import React, { Component } from 'react';
import PropTypes from 'prop-types';

class VirtualizedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idx: props.initIdx
    };
    this._onScroll = this._onScroll.bind(this);
    this._afterChangeIdx = this._afterChangeIdx.bind(this);
  }

  render() {
    const {
      _onScroll,
      props: {
        width,
        height,
        style,
        itemCount,
        renderItemCount,
        itemHeight,
        renderItem,
        innerRef
      },
      state: {
        idx
      }
    } = this;
    const listItems = [];

    for (let i = 0; i < renderItemCount; i++) {
      const _idx = i + idx;

      const top = _idx * itemHeight;
      const style = {
        position: 'absolute',
        width: '100%',
        height: `${itemHeight}px`,
        top: `${top}px`,
        zIndex: 2
      };
      listItems.push(renderItem(_idx, style));
    }

    return React.createElement("div", {
      style: { ...style,
        overflowX: 'hidden',
        overflowY: 'auto',
        width,
        height
      },
      onScroll: _onScroll,
      ref: innerRef
    }, React.createElement("div", {
      style: {
        position: 'relative',
        width: '100%',
        height: `${itemHeight * itemCount}px`
      }
    }, listItems));
  }

  _onScroll({
    target: {
      scrollTop
    }
  }) {
    const {
      _afterChangeIdx,
      props: {
        itemHeight,
        itemCount,
        renderItemCount
      },
      state: {
        idx
      }
    } = this;
    const currentIdx = Math.floor(scrollTop / itemHeight);

    if (idx !== currentIdx) {
      const maxIdx = itemCount - renderItemCount;
      const updateIdx = currentIdx < maxIdx ? currentIdx : maxIdx;
      this.setState({
        idx: updateIdx
      }, _afterChangeIdx);
    }
  }

  _afterChangeIdx() {
    const {
      props: {
        onChangeIdx
      },
      state: {
        idx
      }
    } = this;
    onChangeIdx(idx);
  }

}

VirtualizedList.defaultProps = {
  width: 300,
  height: 300,
  style: {},
  itemCount: 1000,
  renderItemCount: 20,
  initIdx: 0,
  itemHeight: 40,
  renderItem: (idx, style) => React.createElement("div", {
    key: idx,
    style: { ...style,
      backgroundColor: '#ffffff',
      border: '1px solid black',
      boxSizing: 'border-box'
    }
  }, idx),
  onChangeIdx: idx => {},
  innerRef: el => {}
};
VirtualizedList.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  itemCount: PropTypes.number,
  renderItemCount: PropTypes.number,
  initIdx: PropTypes.number,
  itemHeight: PropTypes.number,
  renderItem: PropTypes.func,
  onChangeIdx: PropTypes.func,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};
export default VirtualizedList;