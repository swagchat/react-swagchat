import * as React from 'react';
import { IOnClickProps } from '../../';
import { Avatar } from '../../components';

export interface ISimpleListItemProps extends IOnClickProps {
  name: string;
  pictureUrl: string;
  width?: number;
  height?: number;
}

export class SimpleListItem extends React.Component<ISimpleListItemProps, {}> {
  public static defaultProps: Partial<ISimpleListItemProps> = {
    width: 60,
    height: 60,
  };

  render(): JSX.Element  {
    return (
      <div className="simple-list-item-wrap" onClick={this.props.onClick}>
        <div className="simple-list-item-wrap-flex1" style={{width: this.props.width + 'px'}}>
          <Avatar src={this.props.pictureUrl} width={this.props.width} height={this.props.height} />
        </div>
        <div className="simple-list-item-wrap-flex2" style={{height: this.props.height + 'px'}}>
          <span>{this.props.name}</span>
        </div>
      </div>
    );
  }
}
