import * as React from 'react';

import { dateFormateHHMM } from '../../../utils';
import { IPluginMessageItemProps } from '../';
import { Avatar } from '../../../components';

export interface IImagePayload {
  mime: string;
  sourceUrl: string;
  thumbnailUrl: string;
}

export class ImageItem extends React.Component<IPluginMessageItemProps, {}> {
  render(): JSX.Element  {
    const { message, myUserId, user} = this.props;
    const payload = message.payload as IImagePayload;
    if (user.userId === myUserId) {
      return (
        <div>
          <div>
            <img src={payload.sourceUrl} className="image-item-message-right" />
            <div className="image-item-time-right">{dateFormateHHMM(message.created!)}</div>
            <div className="image-item-clear" />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <Avatar className="image-item-avatar" src={user.pictureUrl} />
            <p className="image-item-name">{user.name}</p>
            <img src={payload.sourceUrl} className="image-item-message-left" />
            <div className="image-item-time-left">{dateFormateHHMM(message.created!)}</div>
            <div className="image-item-clear" />
          </div>
        </div>
      );
    }
  }
}
