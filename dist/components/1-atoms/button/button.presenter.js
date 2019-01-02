"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  width: 180px;\n  height: 30px;\n\n  border: 0;\n  border-radius: 4px;\n\n  cursor: pointer;\n\n  color: ", ";\n\n  background-color: ", ";\n\n  transition: 0.3s;\n\n  &:hover {\n    color: ", ";\n\n    background-color: ", ";\n  }\n\n  &:focus {\n    color: ", ";\n\n    background-color: ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/* ======= Constants ======= */

/* === Themes === */
var BUTTON_DEFAULT_THEME = {
  bgDefault: 'rgb(60, 75, 97)',
  bgHover: '#303b51',
  bgFocus: '#303b51',
  colorDefault: '#f8f8f8',
  colorHover: null,
  colorFocus: null
};
var BUTTON_TEXT_THEME = {
  bgDefault: 'transparent',
  bgHover: null,
  bgFocus: null,
  colorDefault: null,
  colorHover: '#4e669a',
  colorFocus: '#4e669a'
};
var THEMES = {
  default: BUTTON_DEFAULT_THEME,
  text: BUTTON_TEXT_THEME
};
/* ======= Components ======= */

/* === Main === */

var Button = _styledComponents.default.button.attrs(function (_ref) {
  var width = _ref.width,
      height = _ref.height;
  return {
    type: 'button',
    style: {
      width: width ? width : null,
      height: height ? height : null
    }
  };
})(_templateObject(), function (props) {
  return THEMES[props.theme].colorDefault;
}, function (props) {
  return THEMES[props.theme].bgDefault;
}, function (props) {
  return THEMES[props.theme].colorHover;
}, function (props) {
  return THEMES[props.theme].bgHover;
}, function (props) {
  return THEMES[props.theme].colorFocus;
}, function (props) {
  return THEMES[props.theme].bgFocus;
});

Button.defaultProps = {
  width: null,
  height: null,
  theme: 'default'
};
Button.propTypes = {
  width: _propTypes.default.string,
  height: _propTypes.default.string,
  theme: _propTypes.default.oneOf(['default', 'text'])
};
var _default = Button;
exports.default = _default;