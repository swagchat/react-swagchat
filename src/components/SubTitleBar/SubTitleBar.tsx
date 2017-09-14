import * as React from 'react';
import * as styles from './sub-title-bar.css';
import { IRootStyleProps } from '../../components';
const classNames = require('classnames');

export interface IRoomSeparatorProps extends IRootStyleProps {
  title: string;
  isDisplayBorder?: boolean;
}

export class SubTitleBar extends React.Component<IRoomSeparatorProps, {}> {
  public static defaultProps: Partial<IRoomSeparatorProps> = {
    isDisplayBorder: false,
    className: '',
    style: {},
  };

  render(): JSX.Element {
    const { title, isDisplayBorder, className, style } = this.props;
    const rootStyle = Object.assign(
      {},
      isDisplayBorder ? {} : {border: 'none'},
      style,
    );
    return (
      <div className={classNames(className, styles.root)} style={rootStyle}>
        {title}
      </div>
    );
  }
}
