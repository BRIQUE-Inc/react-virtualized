import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../../1-atoms/button/button';

/* ======= Functions ======= */

/* === utils === */

const _stopPropagation = e => {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
};

/* ======= Components ======= */

/* === styled === */

const Container = styled.div.attrs(
  ({ open, top, left, width, minWidth, maxHeight }) => ({
    style: {
      display: open ? null : 'none',
      top,
      left,
      width,
      minWidth,
      maxHeight,
    },
  }),
)`
  display: flex;
  flex-direction: column;

  position: absolute;
  z-index: 100;

  background-color: #ffffff;

  border: 1px solid #e5e5e5;

  box-shadow: 1px 1px 10px #d3d3d3;
`;

const SearchArea = styled.div`
  height: 50px;

  display: flex;
  align-items: center;

  padding: 10px;

  border-bottom: 1px solid #ededed;
  box-sizing: border-box;
`;

const FilterListArea = styled.div`
  max-height: 200px;

  display: flex;
  flex-direction: column;

  padding: 10px;

  overflow-y: auto;
  overflow-x: hidden;
`;

const ButtonArea = styled.div`
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  padding: 10px;

  border-top: 1px solid #ededed;
  box-sizing: border-box;
`;

const FilterInput = styled.input`
  box-sizing: border-box;
  border-color: #dedede;
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;

  font-size: 12px;

  height: 30px;
  width: 0;

  flex-grow: 1;

  margin-right: 10px;
  padding-left: 12px;
  padding-right: 12px;
`;

const FilterListItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 24px;
  min-height: 24px;

  padding: 5px 4px;

  color: #858585;
`;

const RadioButtons = styled.div`
  width: 0;
  flex-grow: 1;
`;

/* === Main === */

class Filter extends Component {
  static propTypes = {
    open: PropTypes.bool,
    closeEvents: PropTypes.arrayOf(PropTypes.string),
    onClose: PropTypes.func,

    x: PropTypes.number,
    y: PropTypes.number,

    width: PropTypes.string,
    maxHeight: PropTypes.string,

    filters: PropTypes.array,
    renderItem: PropTypes.func,
    onClickAdd: PropTypes.func,
    onClickRemove: PropTypes.func,
    onClickReset: PropTypes.func,

    filterType: PropTypes.oneOf(['and', 'or']),
    showFilterType: PropTypes.bool,
    onChangeFilterType: PropTypes.func,
  };

  static defaultProps = {
    open: false,
    closeEvents: ['click', 'contextmenu'],
    onClose: event => {},

    x: 0,
    y: 0,

    width: '240px',
    maxHeight: '300px',

    filters: [],
    renderItem: (filter, idx) => `${filter}`,
    onClickAdd: filterValue => {},
    onClickRemove: filter => {},
    onClickReset: filters => {},

    filterType: 'and',
    showFilterType: false,
    onChangeFilterType: type => {},
  };

  // --- lifecycle functions --- //

  constructor(props) {
    super(props);

    this.state = {
      filterValue: '',
    };

    // elements
    this._el = document.createElement('div');

    // refs
    this._container = React.createRef();

    // event handlers
    this._onClose = this._onClose.bind(this);
    this._onChangeFilterValue = this._onChangeFilterValue.bind(this);
    this._onClickAddButton = this._onClickAddButton.bind(this);
    this._onClickRemoveButton = this._onClickRemoveButton.bind(this);
    this._onClickResetButton = this._onClickResetButton.bind(this);
    this._onChangeFilterType = this._onChangeFilterType.bind(this);

    // render functions
    this._renderFilterListItem = this._renderFilterListItem.bind(this);
  }

  render() {
    const {
      props: {
        open,

        x,
        y,

        width,
        maxHeight,

        filters,

        filterType,
        showFilterType,
      },

      state: { filterValue },

      // elements
      _el,

      // refs
      _container,

      // event handlers
      _onChangeFilterValue,
      _onClickAddButton,
      _onClickResetButton,
      _onChangeFilterType,

      // render functions
      _renderFilterListItem,
    } = this;

    const comp = (
      <Container
        ref={_container}
        open={open}
        top={`${y}px`}
        left={`${x}px`}
        width={width}
        minWidth={width}
        maxHeight={maxHeight}
      >
        <SearchArea>
          <FilterInput
            placeholder="Input filter"
            value={filterValue}
            onChange={_onChangeFilterValue}
          />
          <Button onClick={_onClickAddButton} width="64px">
            Add
          </Button>
        </SearchArea>
        <FilterListArea onScroll={_stopPropagation}>
          {filters.map(_renderFilterListItem)}
        </FilterListArea>
        <ButtonArea>
          {showFilterType && (
            <RadioButtons>
              <label>
                <span>AND</span>
                <input
                  type="radio"
                  value="and"
                  name="filter-type"
                  checked={filterType === 'and'}
                  onChange={_onChangeFilterType}
                />
              </label>
              <label>
                <span>OR</span>
                <input
                  type="radio"
                  value="or"
                  name="filter-type"
                  checked={filterType === 'or'}
                  onChange={_onChangeFilterType}
                />
              </label>
            </RadioButtons>
          )}
          <Button onClick={_onClickResetButton} width="64px" theme="text">
            Reset
          </Button>
        </ButtonArea>
      </Container>
    );

    return ReactDOM.createPortal(comp, _el);
  }

  componentDidMount() {
    const {
      props: { open, closeEvents },

      // elements
      _el,

      // event handlers
      _onClose,
    } = this;

    open &&
      closeEvents.forEach(eventName =>
        document.body.addEventListener(eventName, _onClose),
      );

    document.body.contains(_el) || document.body.appendChild(_el);
  }

  componentDidUpdate() {
    const {
      props: { open, closeEvents },

      // event handlers
      _onClose,
    } = this;

    open
      ? closeEvents.forEach(eventName =>
        document.body.addEventListener(eventName, _onClose),
      )
      : closeEvents.forEach(eventName =>
        document.body.removeEventListener(eventName, _onClose),
      );
  }

  componentWillUnmount() {
    const {
      props: { closeEvents },

      // elements
      _el,

      // event handlers
      _onClose,
    } = this;

    closeEvents.forEach(eventName =>
      document.body.removeEventListener(eventName, _onClose),
    );

    document.body.contains(_el) && document.body.removeChild(_el);
  }

  // --- event handlers --- //

  _onClose(event) {
    const {
      props: { onClose },

      // refs
      _container,
    } = this;

    _container.current.contains(event.target) || onClose(event);
  }

  _onChangeFilterValue({ target: { value } }) {
    this.setState({ filterValue: value });
  }

  _onClickAddButton(event) {
    const {
      props: { onClickAdd },

      state: { filterValue },
    } = this;

    onClickAdd(filterValue);
    this.setState({ filterValue: '' });
  }

  _onClickRemoveButton(filter) {
    const {
      props: { onClickRemove },
    } = this;

    onClickRemove(filter);
  }

  _onClickResetButton(event) {
    const {
      props: { filters, onClickReset },
    } = this;

    onClickReset(filters);
  }

  _onChangeFilterType({ target: { value } }) {
    const {
      props: { onChangeFilterType },
    } = this;

    onChangeFilterType(value);
  }

  // --- render functions --- //

  _renderFilterListItem(filter, idx) {
    const {
      props: { renderItem },

      // event handlers
      _onClickRemoveButton,
    } = this;

    const item = renderItem(filter, idx);

    return (
      <FilterListItemContainer key={idx}>
        {item}
        <Button
          onClick={() => _onClickRemoveButton(filter)}
          width="40px"
          theme="text"
        >
          Del
        </Button>
      </FilterListItemContainer>
    );
  }
}

export default Filter;
