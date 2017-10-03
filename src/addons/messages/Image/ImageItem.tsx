import * as React from 'react';
import { dateFormateHHMM, IAddonMessageItemProps } from 'swagchat-sdk';
import { Avatar, Progress } from '../../../components';
import * as styles from './image-item.css';
const classNames = require('classnames');

export interface IImagePayload {
  mime: string;
  sourceUrl: string;
  thumbnailUrl: string;
}

export interface IImageItemState {
  isLoaded: boolean;
  width: number;
  height: number;
}

export class ImageItem extends React.Component<IAddonMessageItemProps, IImageItemState> {
  private _imageDom: HTMLImageElement | null;

  constructor(props: IAddonMessageItemProps) {
    super(props);

    this.state = {
      isLoaded: false,
      width: 0,
      height: 0,
    };
  }

  componentWillMount() {
    let image = new Image();
    const self = this;
    image.onload = function(){
      let convertWidth = document.documentElement.clientWidth * 0.4;
      if (convertWidth > 250) {
        convertWidth = 250;
      }
      const renderPercent = convertWidth / image.naturalWidth;
      const width = Math.floor(image.naturalWidth * renderPercent);
      const height = Math.floor(image.naturalHeight * renderPercent);
      self.setState({
        isLoaded: true,
        width: width,
        height: height,
      });
    };

    const payload = this.props.message.payload as IImagePayload;
    image.src = payload.thumbnailUrl ? payload.thumbnailUrl : payload.sourceUrl;
  }

  componentDidUpdate() {
    this.props.onRenderComplete ? this.props.onRenderComplete() : null;
  }

  render(): JSX.Element  {
    const { message, myUserId, user} = this.props;
    const payload = message.payload as IImagePayload;

    if (user.userId === myUserId) {
      return (
        <div>
          <div>
            {this.state.isLoaded ? (
              <img
                ref={(child) => this._imageDom = child}
                src={payload.thumbnailUrl ? payload.thumbnailUrl : payload.sourceUrl}
                className={classNames(styles.message, styles.right)}
                width={this.state.width}
                height={this.state.height}
              />
            ) : <Progress className={classNames(styles.message, styles.right, styles.progress)} />}
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
            {this.state.isLoaded ? (
              <img
                src={payload.thumbnailUrl ? payload.thumbnailUrl : payload.sourceUrl}
                ref={(child) => this._imageDom = child}
                className={classNames(styles.message, styles.left)}
                width={this.state.width}
                height={this.state.height}
              />
            ) : <Progress className={classNames(styles.message, styles.left, styles.progress, styles.progressLeft)} />}
            <div className={styles.timeLeft}>{dateFormateHHMM(message.created!)}</div>
            <div className={styles.clear} />
          </div>
        </div>
      );
    }
  }
}
