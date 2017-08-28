import * as React from 'react';
import { PhotoEdit } from '../../components';

export interface IRoomEditProps {
  roomName: string;
  roomPictureUrl: string;
  roomUpdateName: (updateName: string) => void;
  roomUpdatePicture: (updatePicture: Blob) => void;
}

export class RoomEdit extends React.Component<IRoomEditProps, {}> {
  private inputTextDom: HTMLInputElement | null;

  componentDidMount() {
    this.inputTextDom!.value = this.props.roomName;
  }

  onInputTextChange = (e: any) => {
    this.props.roomUpdateName(e.target.value);
  }

  render(): JSX.Element {
    return (
      <div className="room-edit-root">
        <PhotoEdit
          src={this.props.roomPictureUrl}
          width={120}
          height={120}
          onUpdatePhoto={this.props.roomUpdatePicture}
        />
        <input
          className="room-edit-input-text"
          ref={(child) => this.inputTextDom = child}
          type="text"
          placeholder="グループ名を入力"
          onChange={this.onInputTextChange.bind(this)}
        />
      </div>
    );
  }
}
