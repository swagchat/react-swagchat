import * as React from 'react';
import { updateStyleActionDispatch, store } from 'swagchat-sdk';
import { Button, Close, Done } from '../../components';

export interface IModalProps {
  title: string;
  component: React.ReactNode;
  modalKey: string;
  onOkClick: () => void;
}

export class ModalView extends React.Component<IModalProps, {}> {
  private initialInteractionStyle: Object = {
    modalStyle: {
      [this.props.modalKey]: {
        isDisplay: false,
      }
    }
  };

  componentDidMount() {
    updateStyleActionDispatch(this.initialInteractionStyle);
  }

  onItemTap() {
    updateStyleActionDispatch({
      modalStyle: {
        [this.props.modalKey]: {
          isDisplay: true,
        }
      }
    });
  }

  onCloseTap() {
    updateStyleActionDispatch({
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
    const { title, component, modalKey} = this.props;
    const modalStyle = store.getState().style.modalStyle;
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
