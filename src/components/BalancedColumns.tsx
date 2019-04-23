import React from 'react';

type children = React.ReactNode[];
export interface BalancedColumnsProps {
  children: children;
  // The maximum number of columns that will be rendered
  maxColumns: number;
  // The minimum number rows required to fill until next column is populated
  minRowBreakpoint: number;
  // Optional, units in pixels
  columnWidth?: number;
}

function BalancedColumns(props: BalancedColumnsProps) {
  function getColumnStyle(flexBasis?: number): React.CSSProperties {
    return {
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: flexBasis == null ? 'auto' : `${flexBasis}px`,
    };
  }

  function getTableStyle(): React.CSSProperties {
    return {
      display: 'flex',
      flexGrow: 1,
      flexWrap: 'nowrap',
    };
  }

  function renderColumn(columnNum: number) {
    const { children, maxColumns, minRowBreakpoint } = props;
    if (children.length < minRowBreakpoint) {
      // Children do not completely fill the first column
      return children;
    }
    const countPerRow = Math.max(
      Math.ceil(children.length / maxColumns),
      minRowBreakpoint,
    );

    if (columnNum === maxColumns - 1) {
      // It's the last row, fill the remainder
      const remainder = children.length - countPerRow * (maxColumns - 1);
      return children.slice(children.length - remainder);
    }

    // Completely fill the current column
    const start = columnNum * countPerRow;
    const end = (columnNum + 1) * countPerRow;
    return children.slice(start, end);
  }

  const { children, columnWidth, minRowBreakpoint, maxColumns } = props;
  const columnCount = Math.min(
    Math.ceil(children.length / minRowBreakpoint),
    maxColumns,
  );
  return (
    <div style={getTableStyle()}>
      {Array.from({ length: columnCount }, (_, idx) => (
        // In general, using indexes as keys is not ideal; however, in this case it's
        // hard to avoid. Also given a column's index is essentially a unique ID for it,
        // here this is the best we can do and it should be OK.
        <div key={idx} style={getColumnStyle(columnWidth)}>
          {renderColumn(idx)}
        </div>
      ))}
    </div>
  );
}

export default React.memo(BalancedColumns);
