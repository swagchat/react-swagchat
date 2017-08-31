import * as React from 'react';
import { updateStyleActionDispatch, store } from 'swagchat-sdk';

export interface IModalAction {
  name: string;
  type: string;
  onItemTap: any;
}

export interface IModalProps {
  description: string;
  actions: IModalAction[];
  modalKey: string;
}

export class ModalDialog extends React.Component<IModalProps, {}> {
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
    const { description, actions, modalKey} = this.props;
    const modalStyle = store.getState().style.modalStyle;
    if (!store.getState().style.modalStyle) {
      return <div />;
    }
    return (
      <div>
        {modalStyle && modalStyle[modalKey] && modalStyle[modalKey].isDisplay ? (
          <div className="modal-dialog-root" onClick={this.onCloseTap.bind(this)}>
            <div className="modal-dialog-content-wrap" onClick={this.onWrapTap}>
              <p className="modal-dialog-content-description">{description}</p>
              <ul className="modal-dialog-content-action">
                {(() => {
                  let actionItems = new Array;
                  for (let i = 0; i < actions.length; i++) {
                    actionItems.push(<li className={actions[i].type} key={'modal-dialog-action-item-' + i} onClick={actions[i].onItemTap}>{actions[i].name}</li>);
                  }
                  return actionItems;
                })()}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
