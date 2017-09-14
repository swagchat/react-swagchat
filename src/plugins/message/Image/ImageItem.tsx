import * as React from 'react';
import { dateFormateHHMM, IPluginMessageItemProps } from 'swagchat-sdk';
import { Avatar } from '../../../components';
import * as styles from './image-item.css';

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
            <img src={payload.sourceUrl} className={styles.messageRight} />
            <div className={styles.timeRight}>{dateFormateHHMM(message.created!)}</div>
            <div className={styles.clear} />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <Avatar className={styles.avatar} src={user.pictureUrl} />
            <p className={styles.name}>{user.name}</p>
            <img src={payload.sourceUrl} className={styles.messageLeft} />
            <div className={styles.timeLeft}>{dateFormateHHMM(message.created!)}</div>
            <div className={styles.clear} />
          </div>
        </div>
      );
    }
  }
}
