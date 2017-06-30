import * as React from 'react';
const classNames = require('classnames');

export interface IBackButtonProps {
  count: number;
  className?: string;
}

export class Badge extends React.Component<IBackButtonProps, void> {
  render(): JSX.Element  {
    return (
      <span
        className={classNames('badge', this.props.className)}
      >
        {this.props.count}
      </span>
    );
  }
}
