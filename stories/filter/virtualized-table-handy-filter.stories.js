import React, { Component } from 'react';
import {
  HEADER_CELL_BACKGROUND_COLOR,
  TableCell,
  Filter,
  VirtualizedTableHandy,
} from '../../src';

/* ======= Constants ======= */

/* === Code === */

const CODE = `
import React, { Component, Fragment } from 'react';
import {
  HEADER_CELL_BACKGROUND_COLOR,
  TableCell,
  Filter,
  VirtualizedTableHandy,
} from '@brique/react-virtualized';

/* ======= Constants ======= */

/* === Table size === */

const COL_COUNT = 500;
const ROW_COUNT = 500;

/* ======= Components ======= */

/* === Main === */

class VirtualizedTableHandyFilter extends Component {
  // --- lifecycle functions --- //

  constructor(props) {
    super(props);

    const rows = [...Array(ROW_COUNT)].map((_, i) =>
      [...Array(COL_COUNT)]
        .map((_, j) => ({
          key: \`\${j}\`,
          value: \`ITEM(\${i}, \${j})\`,
        }))
        .reduce(
          (acc, cur) => {
            acc[cur.key] = cur.value;
            return acc;
          },
          { rowKey: \`\${i}\` },
        ),
    );
    const cols = [...Array(COL_COUNT)].map((_, j) => ({
      key: \`\${j}\`,
      value: \`COL_\${j}\`,
    }));

    this.state = {
      // tables
      cols,
      rows,

      // filters
      filterColKey: null,
      filterX: 0,
      filterY: 0,
      filterTypes: cols.reduce((acc, col) => {
        acc[col.key] = 'and';
        return acc;
      }, {}),
      filters: [],
      filteredRows: rows,
    };

    // refs
    this._table = React.createRef();

    // event handlers
    this._onOpenFilter = this._onOpenFilter.bind(this);
    this._onCloseFilter = this._onCloseFilter.bind(this);
    this._onAddFilter = this._onAddFilter.bind(this);
    this._onRemoveFilter = this._onRemoveFilter.bind(this);
    this._onResetFilter = this._onResetFilter.bind(this);
    this._onChangeFilterType = this._onChangeFilterType.bind(this);

    // render functions
    this._renderItem = this._renderItem.bind(this);
    this._renderFixedRowItem = this._renderFixedRowItem.bind(this);

    // other functions
    this._filterRows = this._filterRows.bind(this);
  }

  render() {
    const {
      state: {
        cols,
        filterColKey,
        filterX,
        filterY,
        filters,
        filterTypes,
        filteredRows,
      },

      // refs
      _table,

      // event handlers
      _onCloseFilter,
      _onAddFilter,
      _onRemoveFilter,
      _onResetFilter,
      _onChangeFilterType,

      // render functions
      _renderItem,
      _renderFixedRowItem,
      _renderFilterItem,
    } = this;

    const currentFilters = filters.filter(o => o.colKey === filterColKey);

    const renderRowCount = 16 < filteredRows.length ? 16 : filteredRows.length;

    return (
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        <VirtualizedTableHandy
          innerRef={_table}
          height={600}
          width={400}
          style={{ boxSizing: 'border-box', border: '1px solid red' }}
          rows={filteredRows}
          cols={cols}
          renderRowCount={renderRowCount}
          renderColCount={3}
          itemHeight={40}
          itemWidth={140}
          isFixedRow={true}
          isFixedCol={true}
          fixedRowHeight={80}
          fixedColWidth={100}
          renderItem={_renderItem}
          renderFixedRowItem={_renderFixedRowItem}
        />
        <Filter
          open={filterColKey != null}
          x={filterX}
          y={filterY}
          filters={currentFilters}
          filterType={filterTypes[filterColKey]}
          showTypeAlways={true}
          renderItem={_renderFilterItem}
          onClose={_onCloseFilter}
          onClickAdd={_onAddFilter}
          onClickRemove={_onRemoveFilter}
          onClickReset={_onResetFilter}
          onChangeType={_onChangeFilterType}
        />
        <textarea style={{ width: 0, flexGrow: 1 }} disabled value={CODE} />
      </div>
    );
  }

  // --- event handlers --- //

  _onOpenFilter(e, colKey) {
    const { clientX, clientY } = e;

    this.setState({
      filterColKey: colKey,
      filterX: clientX,
      filterY: clientY,
    });
  }

  _onCloseFilter() {
    this.setState({
      filterColKey: null,
      filterX: 0,
      filterY: 0,
    });
  }

  _onAddFilter(filterValue, andOr) {
    console.log(andOr);

    const {
      state: { filters, filterColKey },

      // other functions
      _filterRows,
    } = this;

    const value = \`\${filterValue}\`.trim();

    if (!value) return;

    const isDuplicated = filters.find(
      f => f.colKey === filterColKey && f.value === value,
    );

    isDuplicated ||
      this.setState(prevState => {
        const filter = { colKey: filterColKey, value };

        return {
          ...prevState,
          filters: [...filters, filter],
        };
      }, _filterRows);
  }

  _onRemoveFilter(filter, andOr) {
    console.log(andOr);

    const {
      // other functions
      _filterRows,
    } = this;

    this.setState(prevState => {
      const { filters } = prevState;

      const removedFilters = filters.filter(
        f => f.colKey !== filter.colKey || f.value !== filter.value,
      );

      return {
        ...prevState,
        filters: removedFilters,
      };
    }, _filterRows);
  }

  _onResetFilter(filters, andOr) {
    console.log(filters, andOr);

    const {
      // other functions
      _filterRows,
    } = this;

    this.setState(prevState => {
      const { filters, filterColKey } = prevState;

      const resetFilters = filters.filter(f => f.colKey !== filterColKey);

      return {
        ...prevState,
        filters: resetFilters,
      };
    }, _filterRows);
  }

  _onChangeFilterType(filterType) {
    this.setState(prevState => {
      const { filterColKey } = prevState;

      return {
        ...prevState,
        filterTypes: {
          ...prevState.filterTypes,
          [filterColKey]: filterType,
        },
      };
    });
  }

  // --- render functions --- //

  // tables
  _renderItem(row, col, rowIdx, colIdx, style) {
    const content = row && col && row[col.key];

    return (
      <TableCell key={\`\${rowIdx},\${colIdx}\`} style={style}>
        {content}
      </TableCell>
    );
  }

  _renderFixedRowItem(col, colIdx, style) {
    const {
      // event handlers
      _onOpenFilter,
    } = this;

    const content = col && col.value;

    return (
      <TableCell
        key={\`-1,\${colIdx}\`}
        style={style}
        backgroundColor={HEADER_CELL_BACKGROUND_COLOR}
        justifyContent="space-between"
        padding="0 4px"
      >
        {content}
        <span
          style={{ color: 'skyblue', cursor: 'pointer' }}
          onClick={e => _onOpenFilter(e, col.key)}
        >
          filter
        </span>
      </TableCell>
    );
  }

  // filters
  _renderFilterItem(filter) {
    return filter.value;
  }

  // --- other functions --- //

  _filterRows() {
    const {
      // refs
      _table,
    } = this;

    this.setState(
      prevState => {
        const { rows, filters } = prevState;

        const filteredRows = !filters.length
          ? rows
          : rows.filter(r =>
            filters.reduce((acc, cur) => {
              const value = r[cur.colKey];

              return (
                acc && value.toLowerCase().includes(cur.value.toLowerCase())
              );
            }, true),
          );

        return {
          ...prevState,
          filteredRows,
        };
      },
      () => (_table.current.scrollTop = 0),
    );
  }
}

export default VirtualizedTableHandyFilter;
`;

/* === Table size === */

const COL_COUNT = 500;
const ROW_COUNT = 500;

/* ======= Components ======= */

/* === Main === */

class VirtualizedTableHandyFilter extends Component {
  // --- lifecycle functions --- //

  constructor(props) {
    super(props);

    const rows = [...Array(ROW_COUNT)].map((_, i) =>
      [...Array(COL_COUNT)]
        .map((_, j) => ({
          key: `${j}`,
          value: `ITEM(${i}, ${j})`,
        }))
        .reduce(
          (acc, cur) => {
            acc[cur.key] = cur.value;
            return acc;
          },
          { rowKey: `${i}` },
        ),
    );
    const cols = [...Array(COL_COUNT)].map((_, j) => ({
      key: `${j}`,
      value: `COL_${j}`,
    }));

    this.state = {
      // tables
      cols,
      rows,

      // filters
      filterColKey: null,
      filterX: 0,
      filterY: 0,
      filterTypes: cols.reduce((acc, col) => {
        acc[col.key] = 'and';
        return acc;
      }, {}),
      filters: [],
      filteredRows: rows,
    };

    // refs
    this._table = React.createRef();

    // event handlers
    this._onOpenFilter = this._onOpenFilter.bind(this);
    this._onCloseFilter = this._onCloseFilter.bind(this);
    this._onAddFilter = this._onAddFilter.bind(this);
    this._onRemoveFilter = this._onRemoveFilter.bind(this);
    this._onResetFilter = this._onResetFilter.bind(this);
    this._onChangeFilterType = this._onChangeFilterType.bind(this);

    // render functions
    this._renderItem = this._renderItem.bind(this);
    this._renderFixedRowItem = this._renderFixedRowItem.bind(this);

    // other functions
    this._filterRows = this._filterRows.bind(this);
  }

  render() {
    const {
      state: {
        cols,
        filterColKey,
        filterX,
        filterY,
        filters,
        filterTypes,
        filteredRows,
      },

      // refs
      _table,

      // event handlers
      _onCloseFilter,
      _onAddFilter,
      _onRemoveFilter,
      _onResetFilter,
      _onChangeFilterType,

      // render functions
      _renderItem,
      _renderFixedRowItem,
      _renderFilterItem,
    } = this;

    const currentFilters = filters.filter(o => o.colKey === filterColKey);

    const renderRowCount = 16 < filteredRows.length ? 16 : filteredRows.length;

    return (
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        <VirtualizedTableHandy
          innerRef={_table}
          height={600}
          width={400}
          style={{ boxSizing: 'border-box', border: '1px solid red' }}
          rows={filteredRows}
          cols={cols}
          renderRowCount={renderRowCount}
          renderColCount={3}
          itemHeight={40}
          itemWidth={140}
          isFixedRow={true}
          isFixedCol={true}
          fixedRowHeight={80}
          fixedColWidth={100}
          renderItem={_renderItem}
          renderFixedRowItem={_renderFixedRowItem}
        />
        <Filter
          open={filterColKey != null}
          x={filterX}
          y={filterY}
          filters={currentFilters}
          filterType={filterTypes[filterColKey]}
          showTypeAlways={true}
          renderItem={_renderFilterItem}
          onClose={_onCloseFilter}
          onClickAdd={_onAddFilter}
          onClickRemove={_onRemoveFilter}
          onClickReset={_onResetFilter}
          onChangeType={_onChangeFilterType}
        />
        <textarea style={{ width: 0, flexGrow: 1 }} disabled value={CODE} />
      </div>
    );
  }

  // --- event handlers --- //

  _onOpenFilter(e, colKey) {
    const { clientX, clientY } = e;

    this.setState({
      filterColKey: colKey,
      filterX: clientX,
      filterY: clientY,
    });
  }

  _onCloseFilter() {
    this.setState({
      filterColKey: null,
      filterX: 0,
      filterY: 0,
    });
  }

  _onAddFilter(filterValue, andOr) {
    console.log(andOr);

    const {
      state: { filters, filterColKey },

      // other functions
      _filterRows,
    } = this;

    const value = `${filterValue}`.trim();

    if (!value) return;

    const isDuplicated = filters.find(
      f => f.colKey === filterColKey && f.value === value,
    );

    isDuplicated ||
      this.setState(prevState => {
        const filter = { colKey: filterColKey, value };

        return {
          ...prevState,
          filters: [...filters, filter],
        };
      }, _filterRows);
  }

  _onRemoveFilter(filter, andOr) {
    console.log(andOr);

    const {
      // other functions
      _filterRows,
    } = this;

    this.setState(prevState => {
      const { filters } = prevState;

      const removedFilters = filters.filter(
        f => f.colKey !== filter.colKey || f.value !== filter.value,
      );

      return {
        ...prevState,
        filters: removedFilters,
      };
    }, _filterRows);
  }

  _onResetFilter(filters, andOr) {
    console.log(filters, andOr);

    const {
      // other functions
      _filterRows,
    } = this;

    this.setState(prevState => {
      const { filters, filterColKey } = prevState;

      const resetFilters = filters.filter(f => f.colKey !== filterColKey);

      return {
        ...prevState,
        filters: resetFilters,
      };
    }, _filterRows);
  }

  _onChangeFilterType(filterType) {
    this.setState(prevState => {
      const { filterColKey } = prevState;

      return {
        ...prevState,
        filterTypes: {
          ...prevState.filterTypes,
          [filterColKey]: filterType,
        },
      };
    });
  }

  // --- render functions --- //

  // tables
  _renderItem(row, col, rowIdx, colIdx, style) {
    const content = row && col && row[col.key];

    return (
      <TableCell key={`${rowIdx},${colIdx}`} style={style}>
        {content}
      </TableCell>
    );
  }

  _renderFixedRowItem(col, colIdx, style) {
    const {
      // event handlers
      _onOpenFilter,
    } = this;

    const content = col && col.value;

    return (
      <TableCell
        key={`-1,${colIdx}`}
        style={style}
        backgroundColor={HEADER_CELL_BACKGROUND_COLOR}
        justifyContent="space-between"
        padding="0 4px"
      >
        {content}
        <span
          style={{ color: 'skyblue', cursor: 'pointer' }}
          onClick={e => _onOpenFilter(e, col.key)}
        >
          filter
        </span>
      </TableCell>
    );
  }

  // filters
  _renderFilterItem(filter) {
    return filter.value;
  }

  // --- other functions --- //

  _filterRows() {
    const {
      // refs
      _table,
    } = this;

    this.setState(
      prevState => {
        const { rows, filters } = prevState;

        const filteredRows = !filters.length
          ? rows
          : rows.filter(r =>
            filters.reduce((acc, cur) => {
              const value = r[cur.colKey];

              return (
                acc && value.toLowerCase().includes(cur.value.toLowerCase())
              );
            }, true),
          );

        return {
          ...prevState,
          filteredRows,
        };
      },
      () => (_table.current.scrollTop = 0),
    );
  }
}

export default VirtualizedTableHandyFilter;
