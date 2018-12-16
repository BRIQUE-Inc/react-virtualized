import styled from 'styled-components';

const TableContainer = styled.div.attrs(({ width, height }) => ({
  style: {
    width,
    height,
  },
}))`
  overflow: auto;
`;

export default TableContainer;
