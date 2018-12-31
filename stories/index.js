import React, { Fragment } from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { storiesOf } from '@storybook/react';

import TableCellDefaultStory from './atoms/table-cell/table-cell.default.stories';

import VirtualizedListDefault from './basic/virtualized-list-default';
import VirtualizedTableDefault from './basic/virtualized-table-default';
import VirtualizedTableHandyDefault from './basic/virtualized-table-handy-default';
import VirtualziedTableVerticalDefault from './basic/virtualized-table-vertical-default';

import VirtualizedTableHandyCheckbox from './checkbox/virtualized-table-handy-checkbox';

const GlobalStyle = createGlobalStyle`
  ${reset}

  html, body, #root {
    height: 100%;
  }
`;

storiesOf('Atoms/table-cell', module)
  .addDecorator(storyFn => (
    <Fragment>
      <GlobalStyle />
      {storyFn()}
    </Fragment>
  ))
  .add('default', () => <TableCellDefaultStory />);

storiesOf('Basic', module)
  .addDecorator(storyFn => (
    <Fragment>
      <GlobalStyle />
      {storyFn()}
    </Fragment>
  ))
  .add('virtualized list default', () => <VirtualizedListDefault />)
  .add('virtualized table default', () => <VirtualizedTableDefault />)
  .add('virtualized table handy default', () => (
    <VirtualizedTableHandyDefault />
  ))
  .add('virtualized table vertical default', () => (
    <VirtualziedTableVerticalDefault />
  ));

storiesOf('Checkbox', module)
  .addDecorator(storyFn => (
    <Fragment>
      <GlobalStyle />
      {storyFn()}
    </Fragment>
  ))
  .add('virtualized table handy checkbox', () => (
    <VirtualizedTableHandyCheckbox />
  ));
