import * as React from 'react';
import { IUser } from 'swagchat-sdk';
import { IOnClickProps } from 'swagchat-sdk';
import { Avatar, Button, RadioButtonChecked, RadioButtonUnChecked } from '../../components';

export interface ICheckListItemProps extends IOnClickProps {
  name: string;
  pictureUrl: string;
  width?: number;
  height?: number;
  isChecked: boolean;
}

export class CheckListItem extends React.Component<ICheckListItemProps, {}> {
  onClick(user: IUser) {
    if (this.props.onClick) {
      this.props.onClick(user);
    }
  }

  render(): JSX.Element  {
    return (
      <div className="check-list-item-wrap" onClick={this.props.onClick}>
        <div className="check-list-item-flex1" style={{height: this.props.width + 'px', lineHeight: this.props.width + 'px'}}>
          <Avatar src={this.props.pictureUrl} width={this.props.width} height={this.props.height} />
        </div>
        <div className="check-list-item-flex2" style={{height: this.props.width + 'px', lineHeight: this.props.width + 'px'}}>
          <div className="check-list-item-subject">{this.props.name}</div>
        </div>
        <div className="check-list-item-flex3" style={{height: this.props.width + 'px', lineHeight: this.props.width + 'px'}}>
          {(() => {
            if (this.props.isChecked) {
              return <Button icon={<RadioButtonChecked />} />;
            } else {
              return <Button icon={<RadioButtonUnChecked style={{fill: 'rgba(153, 153, 153, 0.2)'}} />} />;
            }
          })()}
        </div>
      </div>
    );
  }
}
