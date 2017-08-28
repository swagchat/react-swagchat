import * as React from 'react';
import { IStyleState } from '../../stores/';
import { Button, Close, Done } from '../../components';

interface IModalStyle {
  modalStyle: {
    [key: string]: {
      isDisplay: boolean,
    }
  };
}

export interface IModalProps {
  title: string;
  component: React.ReactNode;
  modalKey: string;
  styleState: IStyleState;
  updateStyle: (style: Object) => void;
  onOkClick: () => void;
}

export class ModalView extends React.Component<IModalProps, {}> {
  private initialInteractionStyle: IModalStyle = {
    modalStyle: {
      [this.props.modalKey]: {
        isDisplay: false,
      }
    }
  };

  componentDidMount() {
    this.props.updateStyle(this.initialInteractionStyle);
  }

  onItemTap() {
    this.props.updateStyle({
      modalStyle: {
        [this.props.modalKey]: {
          isDisplay: true,
        }
      }
    });
  }

  onCloseTap() {
    this.props.updateStyle({
      modalStyle: {
        [this.props.modalKey]: {
          isDisplay: false,
        }
      }
    });
  }

  onWrapTap(e: any) {
    e.stopPropagation();
  }

  render(): JSX.Element {
    const { title, component, styleState, modalKey} = this.props;
    const style: Object = styleState;
    const modalStyle = (style as IModalStyle).modalStyle;

    if (!modalStyle) {
      return <div />;
    }
    return (
      <div>
        {modalStyle && modalStyle[modalKey] && modalStyle[modalKey].isDisplay ? (
          <div className="modal-dialog-root" onClick={this.onCloseTap.bind(this)}>
            <div className="modal-view-content-wrap" onClick={this.onWrapTap}>
              <div className="modal-view-root">
                <div className="modal-view-header">
                  <Button icon={<Close className="modal-view-icon" />} onClick={this.onCloseTap.bind(this)} />
                  <div className="modal-view-title">{title}</div>
                  <Button icon={<Done className="modal-view-icon" />} onClick={this.props.onOkClick} />
                </div>
                {component}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
