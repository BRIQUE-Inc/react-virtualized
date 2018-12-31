import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Scroller from '../../1-atoms/scroller/scroller';
import TableCell from '../../1-atoms/table-cell/table-cell';

/* ======= Component ======= */

/* === styled === */

const Container = styled.div.attrs(({ width, height }) => ({
  style: { width, height },
}))`
  overflow-x: hidden;
  overflow-y: auto;
`;

/* === Main === */

class VirtualizedList extends Component {
  // --- lifecycle functions --- //

  constructor(props) {
    super(props);

    this.state = {
      idx: props.initIdx,
    };

    // event handlers
    this._onScroll = this._onScroll.bind(this);

    // other functions
    this._afterChangeIdx = this._afterChangeIdx.bind(this);
  }

  render() {
    const {
      props: {
        width,
        height,
        style,
        itemCount,
        renderItemCount,
        itemHeight,
        renderItem,
        innerRef,
      },

      state: { idx },

      // evnet handlers
      _onScroll,
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
        zIndex: 2,
      };
      listItems.push(renderItem(_idx, style));
    }

    return (
      <Container
        width={width}
        height={height}
        style={style}
        onScroll={_onScroll}
        ref={innerRef}
      >
        <Scroller width="100%" height={`${itemHeight * itemCount}px`}>
          {listItems}
        </Scroller>
      </Container>
    );
  }

  // --- event handlers --- //

  _onScroll({ target: { scrollTop } }) {
    const {
      props: { itemHeight, itemCount, renderItemCount },

      state: { idx },

      // other functions
      _afterChangeIdx,
    } = this;

    const currentIdx = Math.floor(scrollTop / itemHeight);

    if (idx !== currentIdx) {
      const maxIdx = itemCount - renderItemCount;
      const updateIdx = currentIdx < maxIdx ? currentIdx : maxIdx;
      this.setState({ idx: updateIdx }, _afterChangeIdx);
    }
  }

  // --- other functions --- //

  _afterChangeIdx() {
    const {
      props: { onChangeIdx },

      state: { idx },
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
  renderItem: (idx, style) => (
    <TableCell key={idx} style={style}>
      {idx}
    </TableCell>
  ),
  onChangeIdx: idx => {},
  innerRef: el => {},
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
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default VirtualizedList;
