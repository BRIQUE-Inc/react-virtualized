import styled from 'styled-components';

const Scroller = styled.div.attrs(({ width, height }) => ({
  style: {
    width,
    height,
  },
}))`
  position: relative;
`;

export default Scroller;
