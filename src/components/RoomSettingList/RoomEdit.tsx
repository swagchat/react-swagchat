import * as React from 'react';
import {
  PhotoEdit,
} from '../../';

export interface IRoomEditProps {
  roomName: string;
  roomPictureUrl: string;
}

export class RoomEdit extends React.Component<IRoomEditProps, void> {
  private inputTextDom: HTMLInputElement;
  private textValue: string = '';

  componentDidMount() {
    this.inputTextDom.value = this.props.roomName;
  }

  onInputTextChange = (e: any) => {
    console.log(e.target.value);
    this.textValue = e.target.value;
  }

  render(): JSX.Element  {
    return (
      <div className="room-edit-root">
        <PhotoEdit src={this.props.roomPictureUrl} width={120} height={120} />
        <input
          className="room-edit-input-text"
          ref={(child) => this.inputTextDom = child}
          type="text"
          onChange={this.onInputTextChange.bind(this)}
        />
      </div>
    );
  }
}
