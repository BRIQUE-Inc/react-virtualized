"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n\n  user-select: none;\n\n  box-sizing: border-box;\n  border-bottom-style: solid;\n  border-width: 1px;\n  border-color: #e8e8e8;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/* ======= Constanst ======= */

/* ======= Component ======= */

/* === styled === */
var Container = _styledComponents.default.div.attrs(function (props) {
  return {
    style: {
      width: props.width,
      height: props.height,
      backgroundColor: props.backgroundColor,
      cursor: props.cursor,
      borderWidth: props.borderWidth,
      borderColor: props.borderColor,
      padding: props.padding,
      justifyContent: props.justifyContent
    }
  };
})(_templateObject());
/* === Main === */


var TableCell = function TableCell(_ref) {
  var innerRef = _ref.innerRef,
      width = _ref.width,
      height = _ref.height,
      backgroundColor = _ref.backgroundColor,
      cursor = _ref.cursor,
      borderWidth = _ref.borderWidth,
      borderColor = _ref.borderColor,
      padding = _ref.padding,
      justifyContent = _ref.justifyContent,
      style = _ref.style,
      children = _ref.children,
      onClick = _ref.onClick,
      onContextMenu = _ref.onContextMenu,
      props = _objectWithoutProperties(_ref, ["innerRef", "width", "height", "backgroundColor", "cursor", "borderWidth", "borderColor", "padding", "justifyContent", "style", "children", "onClick", "onContextMenu"]);

  return _react.default.createElement(Container, _extends({
    ref: innerRef,
    width: width,
    height: height,
    backgroundColor: backgroundColor,
    cursor: cursor,
    borderWidth: borderWidth,
    borderColor: borderColor,
    padding: padding,
    justifyContent: justifyContent,
    style: style,
    onClick: onClick,
    onContextMenu: onContextMenu
  }, props), children);
};

TableCell.defaultProps = {
  innerRef: function innerRef(el) {},
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
  onClick: function onClick(event) {},
  onContextMenu: function onContextMenu(event) {}
};
TableCell.propTypes = {
  innerRef: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func]),
  width: _propTypes.default.string,
  height: _propTypes.default.string,
  backgroundColor: _propTypes.default.string,
  cursor: _propTypes.default.string,
  borderWidth: _propTypes.default.string,
  borderColor: _propTypes.default.string,
  padding: _propTypes.default.string,
  justifyContent: _propTypes.default.string,
  style: _propTypes.default.object,
  children: _propTypes.default.any,
  onClick: _propTypes.default.func,
  onContextMenu: _propTypes.default.func
};
var _default = TableCell;
exports.default = _default;