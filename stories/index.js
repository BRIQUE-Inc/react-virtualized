import React from 'react';
import { storiesOf } from '@storybook/react';
import VirtualizedListDefault from './basic/virtualized-list-default';
import VirtualizedTableDefault from './basic/virtualized-table-default';

storiesOf('Basic', module)
  .add('virtualized list default', () => <VirtualizedListDefault />)
  .add('virtualized table default', () => <VirtualizedTableDefault />);
