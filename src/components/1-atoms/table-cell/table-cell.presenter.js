import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* ======= Constanst ======= */

/* ======= Component ======= */

/* === styled === */

const Container = styled.div.attrs(props => ({
  style: {
    width: props.width,
    height: props.height,
    backgroundColor: props.backgroundColor,
    cursor: props.cursor,
    borderWidth: props.borderWidth,
    borderColor: props.borderColor,
    padding: props.padding,
    justifyContent: props.justifyContent,
  },
}))`
  display: flex;
  align-items: center;

  user-select: none;

  box-sizing: border-box;
  border-bottom-style: solid;
  border-width: 1px;
  border-color: #e8e8e8;
`;

/* === Main === */

const TableCell = ({
  innerRef,
  width,
  height,
  backgroundColor,
  cursor,
  borderWidth,
  borderColor,
  padding,
  justifyContent,
  style,
  children,
  onClick,
  onContextMenu,
  ...props
}) => (
  <Container
    ref={innerRef}
    width={width}
    height={height}
    backgroundColor={backgroundColor}
    cursor={cursor}
    borderWidth={borderWidth}
    borderColor={borderColor}
    padding={padding}
    justifyContent={justifyContent}
    style={style}
    onClick={onClick}
    onContextMenu={onContextMenu}
    {...props}
  >
    {children}
  </Container>
);

TableCell.defaultProps = {
  innerRef: el => {},
  width: '140px',
  height: '34px',
  backgroundColor: '#ffffff',
  cursor: null,
  borderWidth: null,
  borderColor: null,
  padding: null,
  justifyContent: null,
  style: {},
  children: null,
  onClick: event => {},
  onContextMenu: event => {},
};

TableCell.propTypes = {
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  width: PropTypes.string,
  height: PropTypes.string,
  backgroundColor: PropTypes.string,
  cursor: PropTypes.string,
  borderWidth: PropTypes.string,
  borderColor: PropTypes.string,
  padding: PropTypes.string,
  justifyContent: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any,
  onClick: PropTypes.func,
  onContextMenu: PropTypes.func,
};

export default TableCell;
