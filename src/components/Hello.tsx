import * as React from 'react';

export interface HelloProps {
  compiler: string;
  framework: string;
}

const Hello: React.SFC<HelloProps> = ({ compiler, framework }) => (
  <h1>
    Hi {compiler} and {framework}
  </h1>
);

export default Hello;
