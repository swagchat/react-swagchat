import * as React from 'react';

export interface IModalAction {
  name: string;
  onItemTap: any;
}

export interface IModalProps {
  description: string;
  actions: IModalAction[];
  onCloseTap: () => void;
}

export class Modal extends React.Component<IModalProps, void> {
  render(): JSX.Element {
    const { description, actions, onCloseTap} = this.props;
    return (
      <div className="modal-root" onClick={onCloseTap}>
        <div className="modal-content-wrap">
          <p className="modal-content-description">{description}</p>
          <ul className="modal-content-action">
            {(() => {
              let actionItems = new Array;
              for (let i = 0; i < actions.length; i++) {
                actionItems.push(<li key={'modal-action-item-' + i} onClick={actions[i].onItemTap}>{actions[i].name}</li>);
              }
              return actionItems;
            })()}
          </ul>
        </div>
      </div>
    );
  }
}
