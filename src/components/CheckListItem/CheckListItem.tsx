import * as React from 'react';
import { IUser } from 'swagchat-sdk';
import { IOnClickProps, Avatar, Button, CheckCircle } from '../../';

export interface ICheckListItemProps extends IOnClickProps {
  user: IUser;
}

export class CheckListItem extends React.Component<ICheckListItemProps, void> {
  onClick(user: IUser) {
    if (this.props.onClick) {
      this.props.onClick(user);
    }
  }

  render(): JSX.Element  {
    return (
      <div className="check-list-item-root" onClick={this.onClick.bind(this, this.props.user)}>
        <div className="check-list-item-flex1">
          <Avatar
            src={this.props.user.pictureUrl ? this.props.user.pictureUrl : ''}
            className="check-list-item-avatar"
          />
        </div>
        <div className="check-list-item-flex2">
          <div className="check-list-item-subject">{this.props.user.name}</div>
        </div>
        <div className="check-list-item-flex3">
          <Button icon={<CheckCircle />} />
        </div>
      </div>
    );
  }
}
