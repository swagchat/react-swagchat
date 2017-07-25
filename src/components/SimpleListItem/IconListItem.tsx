import * as React from 'react';
import { IOnClickProps } from '../../';

export interface IIconListItemProps extends IOnClickProps {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export class IconListItem extends React.Component<IIconListItemProps, void> {
  render(): JSX.Element  {
    return (
      <div className="icon-list-item-root" onClick={this.props.onClick ? this.props.onClick.bind(this) : null}>
        <div className="icon-list-item-flex1">
          {this.props.leftIcon ? this.props.leftIcon : ''}
        </div>
        <div className="icon-list-item-flex2">
          <span>{this.props.title}</span>
        </div>
        <div className="icon-list-item-flex3">
          {this.props.rightIcon ? this.props.rightIcon : ''}
        </div>
      </div>
    );
  }
}
