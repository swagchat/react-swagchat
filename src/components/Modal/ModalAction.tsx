import * as React from 'react';
import { updateModalActionDispatch, store, State } from 'swagchat-sdk';
import { Button, IRootStyleProps } from '../';
import * as styles from './modal.css';

export interface IModalAction {
  name: string;
  onClick: () => void;
}

export interface IModalActionProps extends IRootStyleProps {
  modalKey: string;
  title?: string;
  component: React.ReactNode;
  actions: IModalAction[];
}

export interface IModalState {
  isDisplayModal: boolean;
}

export class ModalAction extends React.Component<IModalActionProps, IModalState> {
  public static defaultProps: Partial<IModalActionProps> = {
    className: '',
    style: {},
  };

  onModalClick() {
    updateModalActionDispatch(this.props.modalKey);
  }

  onWrapTap(e: any) {
    e.stopPropagation();
  }

  render(): JSX.Element {
    const state = store.getState() as State;
    const modal = state.style.modal as any;
    if (!modal[this.props.modalKey!]) {
      return <div />;
    }

    const { title, component, actions, className, style} = this.props;
    const classNames = require('classnames');

    return (
      <div
        className={className ? classNames(className, 'sc-modal-root') : 'sc-modal-root'}
        onClick={this.onModalClick.bind(this)}
        style={style}
      >
        <div className={styles.wrap} onClick={this.onWrapTap}>
          {title ? (
            <div className={styles.viewHeader}>
              <div className={styles.viewTitle}>{title}</div>
              <Button color="linkWhite" icon={<i className="material-icons">close</i>} onClick={this.onModalClick.bind(this)} />
            </div>
          ) : null}
          <p className={styles.component}>{component}</p>
          <ul className={styles.modalAction}>
            {actions ? actions.map((action, i) =>
              <Button
                key={'sc-modal-dialog-action-item-' + i}
                className={styles.modalActionButton}
                position="center"
                text={action.name}
                onClick={action.onClick}
              />
            ) : null}
          </ul>
        </div>
      </div>
    );
  }
}
