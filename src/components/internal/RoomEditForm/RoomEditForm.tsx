import * as React from 'react';
import {
  roomUpdateNameActionDispatch,
  roomUpdatePictureActionDispatch,
} from 'swagchat-sdk';
import { PhotoEdit, IRootStyleProps} from '../../../components';
import * as styles from './room-edit-form.css';
const classNames = require('classnames');

export interface IRoomEditProps extends IRootStyleProps {
  roomName: string;
  roomPictureUrl: string;
}

export class RoomEditForm extends React.Component<IRoomEditProps, {}> {
  private inputTextDom: HTMLInputElement | null;

  public static defaultProps: Partial<IRoomEditProps> = {
    className: '',
    style: {},
  };

  componentDidMount() {
    this.inputTextDom!.value = this.props.roomName;
  }

  onInputTextChange = (e: any) => {
    roomUpdateNameActionDispatch(e.target.value);
  }

  render(): JSX.Element {
    const { roomPictureUrl, className, style } = this.props;
    return (
      <div className={classNames(className, styles.root)} style={style}>
        <PhotoEdit
          className={styles.photoEdit}
          src={roomPictureUrl}
          onUpdatePhoto={roomUpdatePictureActionDispatch}
        />
        <input
          className={styles.inputText}
          ref={(child) => this.inputTextDom = child}
          type="text"
          placeholder="グループ名を入力"
          onChange={this.onInputTextChange.bind(this)}
        />
      </div>
    );
  }
}
