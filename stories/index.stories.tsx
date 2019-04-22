import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';

import BalancedColumns from '../src/components/BalancedColumns';

const balancedColumnsStories = storiesOf('BalancedColumns', module);
balancedColumnsStories.addDecorator(withKnobs);
balancedColumnsStories.add('example', () => (
  <BalancedColumns
    maxColumns={number('maxColumns', 3)}
    minRowBreakpoint={number('minRowBreakpoint', 4)}
  >
    {Array.from({ length: number('itemCount', 12) }, (_, idx) => (
      <span
        // Ideally a unique ID
        key={idx}
        style={{
          height: '60px',
          width: '100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgb(135, 251, 248)',
          border: '1px solid black',
          borderRadius: '10px',
          margin: '5px',
          color: 'black',
          fontFamily: 'sans-serif',
          fontSize: '16px',
        }}
      >
        {idx + 1}
      </span>
    ))}
  </BalancedColumns>
));
