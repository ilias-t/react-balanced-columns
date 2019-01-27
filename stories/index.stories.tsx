import * as React from 'react';

import { storiesOf } from '@storybook/react';

import BalanacedColumns from '../src/components/BalancedColumns';
import Hello from '../src/components/Hello';

storiesOf('Hello', module).add('👋', () => (
  <Hello compiler="webpack" framework="typescript" />
));

storiesOf('BalancedColumns', module).add('Scenario 1', () => (
  <BalanacedColumns maxColumns={5} minRowBreakpoint={5}>
    {/* {[...Array(26)].map(num => (
      <span>😎 {num}</span>
    ))} */}
    {/* TODO: why doesn't it show up? */}
    {['hey', 'hi', 'ok!']}
  </BalanacedColumns>
));
