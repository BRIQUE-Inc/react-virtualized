import styled from 'styled-components';
import PropTypes from 'prop-types';

/* ======= Constants ======= */

/* === Themes === */

const BUTTON_DEFAULT_THEME = {
  bgDefault: 'rgb(60, 75, 97)',
  bgHover: '#303b51',
  bgFocus: '#303b51',

  colorDefault: '#f8f8f8',
  colorHover: null,
  colorFocus: null,
};

const BUTTON_TEXT_THEME = {
  bgDefault: 'transparent',
  bgHover: null,
  bgFocus: null,

  colorDefault: null,
  colorHover: '#4e669a',
  colorFocus: '#4e669a',
};

const THEMES = {
  default: BUTTON_DEFAULT_THEME,
  text: BUTTON_TEXT_THEME,
};

/* ======= Components ======= */

/* === Main === */

const Button = styled.button.attrs(({ width, height }) => ({
  type: 'button',
  style: { width: width ? width : null, height: height ? height : null },
}))`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 180px;
  height: 30px;

  border: 0;
  border-radius: 4px;

  cursor: pointer;

  color: ${props => THEMES[props.theme].colorDefault};

  background-color: ${props => THEMES[props.theme].bgDefault};

  transition: 0.3s;

  &:hover {
    color: ${props => THEMES[props.theme].colorHover};

    background-color: ${props => THEMES[props.theme].bgHover};
  }

  &:focus {
    color: ${props => THEMES[props.theme].colorFocus};

    background-color: ${props => THEMES[props.theme].bgFocus};
  }
`;

Button.defaultProps = {
  width: null,
  height: null,
  theme: 'default',
};

Button.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'text']),
};

export default Button;
