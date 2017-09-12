import * as React from 'react';
import {
  roomUpdateNameActionDispatch,
  roomUpdatePictureActionDispatch,
} from 'swagchat-sdk';
import { PhotoEdit } from '../../components';
import * as styles from './room-edit.css';

export interface IRoomEditProps {
  roomName: string;
  roomPictureUrl: string;
}

export class RoomEdit extends React.Component<IRoomEditProps, {}> {
  private inputTextDom: HTMLInputElement | null;

  componentDidMount() {
    this.inputTextDom!.value = this.props.roomName;
  }

  onInputTextChange = (e: any) => {
    roomUpdateNameActionDispatch(e.target.value);
  }

  render(): JSX.Element {
    return (
      <div className={styles.root}>
        <PhotoEdit
          src={this.props.roomPictureUrl}
          width="120px"
          height="120px"
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
