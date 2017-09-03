import * as React from 'react';
const classNames = require('classnames');

export interface IBackButtonProps {
  count: number;
  className?: string;
  style?: Object;
}

export class Badge extends React.Component<IBackButtonProps, {}> {
  public static defaultProps: Partial<IBackButtonProps> = {
    className: '',
    style: {},
  };

  render(): JSX.Element  {
    const { className, style } = this.props;
    return (
      <span
        className={classNames('sc-badge', className)}
        style={style}
      >
        {this.props.count}
      </span>
    );
  }
}
