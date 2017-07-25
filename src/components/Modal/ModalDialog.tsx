import * as React from 'react';
import { IStyleState } from '../../stores/';

export interface IModalAction {
  name: string;
  onItemTap: any;
}

interface IModalStyle {
  modalStyle: {
    [key: string]: {
      isDisplay: boolean,
    }
  };
}

export interface IModalProps {
  description: string;
  actions: IModalAction[];
  modalKey: string;
  styleState: IStyleState;
  updateStyle: (style: Object) => void;
}

export class ModalDialog extends React.Component<IModalProps, void> {
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
    const { description, actions, styleState, modalKey} = this.props;
    const style: Object = styleState;
    const modalStyle = (style as IModalStyle).modalStyle;

    if (!modalStyle) {
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
                    actionItems.push(<li key={'modal-dialog-action-item-' + i} onClick={actions[i].onItemTap}>{actions[i].name}</li>);
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
