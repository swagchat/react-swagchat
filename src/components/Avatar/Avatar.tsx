import * as React from 'react';
import { IOnClickProps } from '../../';
const classNames = require('classnames');

export interface IAvatarProps extends IOnClickProps {
  src: string;
  className?: string;
  width?: number;
  height?: number;
  margin?: number;
}

export class Avatar extends React.Component<IAvatarProps, void> {
  render(): JSX.Element  {
    let style: {
      width?: string;
      height?: string;
      margin?: string;
    } = {};
    if (this.props.width) {
      style.width = this.props.width + 'px';
    }
    if (this.props.height) {
      style.height = this.props.height + 'px';
    }
    if (this.props.margin) {
      style.margin = this.props.margin + 'px';
    }

    return (
      <img
        src={this.props.src}
        className={classNames('avatar', this.props.className)}
        style={style}
        onClick={this.props.onClick}
      />
    );
  }
}
