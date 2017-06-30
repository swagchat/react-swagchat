import * as React from 'react';
import {
  Modal,
  IModalAction,
} from '../../';
import { IStyleState } from '../../stores/';

interface IRoomSettingModalItemStyle {
  roomSettingModalItemStyle: {
    modal: {
      [key: string]: {
        isDisplay: boolean,
      }
    }
  };
}

export interface IRoomSettingModalItemProps {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onItemTap?: Function;
  modalKey: string;
  modalDescription: string;
  modalActions: IModalAction[];
  styleState: IStyleState;
  updateStyle: (style: Object) => void;
}

export class RoomSettingModalItem extends React.Component<IRoomSettingModalItemProps, void> {
  private initialInteractionStyle: IRoomSettingModalItemStyle = {
    roomSettingModalItemStyle: {
      modal: {
        [this.props.modalKey]: {
          isDisplay: false,
        }
      }
    }
  };

  componentDidMount() {
    this.props.updateStyle(this.initialInteractionStyle);
  }

  onItemTap() {
    this.props.updateStyle({
      roomSettingModalItemStyle: {
        modal: {
          [this.props.modalKey]: {
            isDisplay: true,
          }
        }
      }
    });
  }

  onCloseTap() {
    this.props.updateStyle({
      roomSettingModalItemStyle: {
        modal: {
          [this.props.modalKey]: {
            isDisplay: false,
          }
        }
      }
    });
  }

  render(): JSX.Element  {
    const style: Object = this.props.styleState;
    const roomSettingModalItemStyle = (style as IRoomSettingModalItemStyle).roomSettingModalItemStyle;
    if (!roomSettingModalItemStyle) {
      return <div />;
    }
    return (
      <div>
        <div className="room-setting-modal-item-root" onClick={this.onItemTap.bind(this)}>
          <div className="room-setting-modal-item-flex1">
            {this.props.leftIcon ? this.props.leftIcon : ''}
          </div>
          <div className="room-setting-modal-item-flex2">
            <span>{this.props.title}</span>
          </div>
          <div className="room-setting-modal-item-flex3">
            {this.props.rightIcon ? this.props.rightIcon : ''}
          </div>
        </div>
        {roomSettingModalItemStyle.modal && roomSettingModalItemStyle.modal[this.props.modalKey] && roomSettingModalItemStyle.modal[this.props.modalKey].isDisplay ? (
          <Modal
            description={this.props.modalDescription}
            actions={this.props.modalActions}
            onCloseTap={this.onCloseTap.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}
