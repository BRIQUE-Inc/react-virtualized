import React from 'react';
import { storiesOf } from '@storybook/react';
import VirtualizedTableDefault from './basic/virtualized-table-default';

storiesOf('Basic', module).add('virtualized table default', () => (
  <VirtualizedTableDefault />
));
