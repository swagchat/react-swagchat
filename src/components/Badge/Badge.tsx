import * as React from 'react';

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
    const classNames = require('classnames');
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
