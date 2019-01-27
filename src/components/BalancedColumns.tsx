import * as React from 'react';

export interface BalancedColumnsProps {
  children: React.ReactNode[];
  maxColumns: number;
  minRowBreakpoint: number;
  columnWidth?: number;
}

class BalancedColumns extends React.PureComponent<BalancedColumnsProps> {
  getColumnStyle = (flexBasis?: number): React.CSSProperties => ({
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: flexBasis == null ? `auto` : `${flexBasis}px`,
  });

  getTableStyle = (): React.CSSProperties => ({
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'nowrap',
  });

  renderColumn = (columnNumber: number) => {
    const { children, maxColumns, minRowBreakpoint } = this.props;
    if (children.length < minRowBreakpoint) {
      // Children do not completely fill the first column
      return children;
    }
    const countPerRow = Math.max(
      Math.ceil(children.length / maxColumns),
      minRowBreakpoint
    );

    if (columnNumber === maxColumns - 1) {
      // If it's the last row, fill the remainder
      const remainder = children.length - countPerRow * (maxColumns - 1);
      return children.slice(children.length - remainder);
    }

    // Fill the column
    const start = columnNumber * countPerRow;
    const end = (columnNumber + 1) * countPerRow;
    return children.slice(start, end);
  };

  render() {
    const { children, maxColumns, minRowBreakpoint, columnWidth } = this.props;
    // Figure out how many columns we need
    const columnCount = Math.min(
      Math.ceil(children.length / minRowBreakpoint),
      maxColumns
    );
    return (
      <div style={this.getTableStyle()}>
        {/* For each column, return a div populated with renderColumn */}
        {[...Array(columnCount)].map((_, index) => (
          <div style={this.getColumnStyle(columnWidth)} key={index}>
            {this.renderColumn(index)}
          </div>
        ))}
      </div>
    );
  }
}

export default BalancedColumns;
