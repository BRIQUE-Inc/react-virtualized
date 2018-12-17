import React from 'react';
import { storiesOf } from '@storybook/react';
import VirtualizedListDefault from './basic/virtualized-list-default';
import VirtualizedTableDefault from './basic/virtualized-table-default';
import VirtualizedTableHandyDefault from './basic/virtualized-table-handy-default';
import VirtualziedTableVerticalDefault from './basic/virtualized-table-vertical-default';

storiesOf('Basic', module)
  .add('virtualized list default', () => <VirtualizedListDefault />)
  .add('virtualized table default', () => <VirtualizedTableDefault />)
  .add('virtualized table handy default', () => (
    <VirtualizedTableHandyDefault />
  ))
  .add('virtualized table vertical default', () => (
    <VirtualziedTableVerticalDefault />
  ));
