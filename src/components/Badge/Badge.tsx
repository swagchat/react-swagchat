import * as React from 'react';
import { IRootStyleProps } from '../';
import * as styles from './badge.css';
const classNames = require('classnames');

export interface IBadgeProps extends IRootStyleProps {
  count: number;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'disable' | 'dark' | 'light';
}

export class Badge extends React.Component<IBadgeProps, {}> {
  public static defaultProps: Partial<IBadgeProps> = {
    className: '',
    style: {},
  };

  render(): JSX.Element  {
    const { color, className, style } = this.props;

    let colorClassName = '';
    if (['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'disable', 'dark', 'light'].indexOf(color!) >= 0 ) {
      colorClassName = styles[color!];
    } else {
      colorClassName = styles.primary;
    }

    return (
      <span
        className={classNames(styles.root, colorClassName, className)}
        style={style}
      >
        {this.props.count}
      </span>
    );
  }
}
