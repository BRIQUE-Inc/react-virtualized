"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _button = _interopRequireDefault(require("../../1-atoms/button/button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  width: 0;\n  flex-grow: 1;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n  height: 24px;\n  min-height: 24px;\n\n  padding: 5px 4px;\n\n  color: #858585;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  box-sizing: border-box;\n  border-color: #dedede;\n  border-radius: 3px;\n  border-width: 1px;\n  border-style: solid;\n\n  font-size: 12px;\n\n  height: 30px;\n  width: 0;\n\n  flex-grow: 1;\n\n  margin-right: 10px;\n  padding-left: 12px;\n  padding-right: 12px;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  height: 50px;\n\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n\n  padding: 10px;\n\n  border-top: 1px solid #ededed;\n  box-sizing: border-box;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  max-height: 200px;\n\n  display: flex;\n  flex-direction: column;\n\n  padding: 10px;\n\n  overflow-y: auto;\n  overflow-x: hidden;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  height: 50px;\n\n  display: flex;\n  align-items: center;\n\n  padding: 10px;\n\n  border-bottom: 1px solid #ededed;\n  box-sizing: border-box;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n\n  position: absolute;\n  z-index: 100;\n\n  background-color: #ffffff;\n\n  border: 1px solid #e5e5e5;\n\n  box-shadow: 1px 1px 10px #d3d3d3;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/* ======= Functions ======= */

/* === utils === */
var _stopPropagation = function _stopPropagation(e) {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
};
/* ======= Components ======= */

/* === styled === */


var Container = _styledComponents.default.div.attrs(function (_ref) {
  var open = _ref.open,
      top = _ref.top,
      left = _ref.left,
      width = _ref.width,
      minWidth = _ref.minWidth,
      maxHeight = _ref.maxHeight;
  return {
    style: {
      display: open ? null : 'none',
      top: top,
      left: left,
      width: width,
      minWidth: minWidth,
      maxHeight: maxHeight
    }
  };
})(_templateObject());

var SearchArea = _styledComponents.default.div(_templateObject2());

var FilterListArea = _styledComponents.default.div(_templateObject3());

var ButtonArea = _styledComponents.default.div(_templateObject4());

var FilterInput = _styledComponents.default.input(_templateObject5());

var FilterListItemContainer = _styledComponents.default.div(_templateObject6());

var RadioButtons = _styledComponents.default.div(_templateObject7());
/* === Main === */


var Filter =
/*#__PURE__*/
function (_Component) {
  _inherits(Filter, _Component);

  // --- lifecycle functions --- //
  function Filter(props) {
    var _this;

    _classCallCheck(this, Filter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Filter).call(this, props));
    _this.state = {
      filterValue: '',
      andOr: 'and'
    }; // elements

    _this._el = document.createElement('div'); // event handlers

    _this._onClose = _this._onClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._onChangeFilterValue = _this._onChangeFilterValue.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._onClickAddButton = _this._onClickAddButton.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._onClickRemoveButton = _this._onClickRemoveButton.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._onClickResetButton = _this._onClickResetButton.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._onChangeAndOr = _this._onChangeAndOr.bind(_assertThisInitialized(_assertThisInitialized(_this))); // render functions

    _this._renderFilterListItem = _this._renderFilterListItem.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Filter, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          open = _this$props.open,
          x = _this$props.x,
          y = _this$props.y,
          width = _this$props.width,
          maxHeight = _this$props.maxHeight,
          filters = _this$props.filters,
          _this$state = this.state,
          filterValue = _this$state.filterValue,
          andOr = _this$state.andOr,
          _el = this._el,
          _onChangeFilterValue = this._onChangeFilterValue,
          _onClickAddButton = this._onClickAddButton,
          _onClickResetButton = this._onClickResetButton,
          _onChangeAndOr = this._onChangeAndOr,
          _renderFilterListItem = this._renderFilterListItem;
      return _reactDom.default.createPortal(_react.default.createElement(Container, {
        open: open,
        top: "".concat(y, "px"),
        left: "".concat(x, "px"),
        width: width,
        minWidth: width,
        maxHeight: maxHeight
      }, _react.default.createElement(SearchArea, null, _react.default.createElement(FilterInput, {
        placeholder: "Input filter",
        value: filterValue,
        onChange: _onChangeFilterValue
      }), _react.default.createElement(_button.default, {
        onClick: _onClickAddButton,
        width: "64px"
      }, "Add")), _react.default.createElement(FilterListArea, {
        onScroll: _stopPropagation
      }, filters.map(_renderFilterListItem)), _react.default.createElement(ButtonArea, null, filters.length > 1 && _react.default.createElement(RadioButtons, null, _react.default.createElement("label", null, _react.default.createElement("span", null, "AND"), _react.default.createElement("input", {
        type: "radio",
        value: "and",
        name: "and-or",
        checked: andOr === 'and',
        onChange: _onChangeAndOr
      })), _react.default.createElement("label", null, _react.default.createElement("span", null, "OR"), _react.default.createElement("input", {
        type: "radio",
        value: "or",
        name: "and-or",
        checked: andOr === 'or',
        onChange: _onChangeAndOr
      }))), _react.default.createElement(_button.default, {
        onClick: _onClickResetButton,
        width: "64px",
        theme: "text"
      }, "Reset"))), _el);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props2 = this.props,
          open = _this$props2.open,
          closeEvents = _this$props2.closeEvents,
          _el = this._el,
          _onClose = this._onClose;
      open && closeEvents.forEach(function (eventName) {
        return document.body.addEventListener(eventName, _onClose);
      });
      document.body.contains(_el) || document.body.appendChild(_el);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this$props3 = this.props,
          open = _this$props3.open,
          closeEvents = _this$props3.closeEvents,
          _onClose = this._onClose;
      open ? closeEvents.forEach(function (eventName) {
        return document.body.addEventListener(eventName, _onClose);
      }) : closeEvents.forEach(function (eventName) {
        return document.body.removeEventListener(eventName, _onClose);
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var closeEvents = this.props.closeEvents,
          _el = this._el,
          _onClose = this._onClose;
      closeEvents.forEach(function (eventName) {
        return document.body.removeEventListener(eventName, _onClose);
      });
      document.body.contains(_el) && document.body.removeChild(_el);
    } // --- event handlers --- //

  }, {
    key: "_onClose",
    value: function _onClose(event) {
      var onClose = this.props.onClose,
          _el = this._el;
      _el.contains(event.target) || onClose(event);
    }
  }, {
    key: "_onChangeFilterValue",
    value: function _onChangeFilterValue(_ref2) {
      var value = _ref2.target.value;
      this.setState({
        filterValue: value
      });
    }
  }, {
    key: "_onClickAddButton",
    value: function _onClickAddButton(event) {
      _stopPropagation(event);

      var onClickAdd = this.props.onClickAdd,
          _this$state2 = this.state,
          filterValue = _this$state2.filterValue,
          andOr = _this$state2.andOr;
      onClickAdd(filterValue, andOr);
      this.setState({
        filterValue: ''
      });
    }
  }, {
    key: "_onClickRemoveButton",
    value: function _onClickRemoveButton(event, filter) {
      _stopPropagation(event);

      var onClickRemove = this.props.onClickRemove,
          andOr = this.state.andOr;
      onClickRemove(filter, andOr);
    }
  }, {
    key: "_onClickResetButton",
    value: function _onClickResetButton(event) {
      _stopPropagation(event);

      var _this$props4 = this.props,
          filters = _this$props4.filters,
          onClickReset = _this$props4.onClickReset,
          andOr = this.state.andOr;
      onClickReset(filters, andOr);
    }
  }, {
    key: "_onChangeAndOr",
    value: function _onChangeAndOr(_ref3) {
      var value = _ref3.target.value;
      var onChangeType = this.props.onChangeType;
      onChangeType(value);
      this.setState({
        andOr: value
      });
    } // --- render functions --- //

  }, {
    key: "_renderFilterListItem",
    value: function _renderFilterListItem(filter, idx) {
      var renderItem = this.props.renderItem,
          _onClickRemoveButton = this._onClickRemoveButton;
      var item = renderItem(filter, idx);
      return _react.default.createElement(FilterListItemContainer, {
        key: idx
      }, item, _react.default.createElement(_button.default, {
        onClick: function onClick(e) {
          return _onClickRemoveButton(e, filter);
        },
        width: "40px",
        theme: "text"
      }, "Del"));
    }
  }]);

  return Filter;
}(_react.Component);

_defineProperty(Filter, "propTypes", {
  open: _propTypes.default.bool,
  closeEvents: _propTypes.default.arrayOf(_propTypes.default.string),
  x: _propTypes.default.number,
  y: _propTypes.default.number,
  width: _propTypes.default.string,
  maxHeight: _propTypes.default.string,
  filters: _propTypes.default.array,
  renderItem: _propTypes.default.func,
  onClose: _propTypes.default.func,
  onClickAdd: _propTypes.default.func,
  onClickRemove: _propTypes.default.func,
  onClickReset: _propTypes.default.func
});

_defineProperty(Filter, "defaultProps", {
  open: false,
  closeEvents: ['click', 'contextmenu'],
  x: 0,
  y: 0,
  width: '240px',
  maxHeight: '300px',
  filters: [],
  renderItem: function renderItem(filter, idx) {
    return "".concat(filter);
  },
  onClose: function onClose(event) {},
  onClickAdd: function onClickAdd(filterValue, andOr) {},
  onClickRemove: function onClickRemove(filter, andOr) {},
  onClickReset: function onClickReset(filters, andOr) {},
  onChangeType: function onChangeType(type) {}
});

var _default = Filter;
exports.default = _default;