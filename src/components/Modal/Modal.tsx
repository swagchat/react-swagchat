import * as React from 'react';
import { Button } from '../../components';
import * as styles from './modal.css';
const classNames = require('classnames');

export interface IModalProps {
  type?: 'buttonTop' | 'buttonBottom';
  title?: string;
  component: React.ReactNode;
  positiveButtonName?: string;
  negativeButtonName?: string;
  className?: string;
  style?: Object;
  onOkModalClick: () => void;
}

export interface IModalState {
  isDisplayModal: boolean;
}

export class Modal extends React.Component<IModalProps, IModalState> {
  public static defaultProps: Partial<IModalProps> = {
    type: 'buttonBottom',
    positiveButtonName: 'OK',
    negativeButtonName: 'CANCEL',
    className: '',
    style: {},
    onOkModalClick: () => {},
  };

  constructor(props: IModalProps) {
    super(props);

    this.state = {isDisplayModal: false};
  }

  onModalClick() {
    this.setState({isDisplayModal: !this.state.isDisplayModal});
  }

  onWrapTap(e: Event) {
    e.stopPropagation();
  }

  render(): JSX.Element {
    if (!this.state.isDisplayModal) {
      return <div />;
    }

    const { type, title, component, positiveButtonName, negativeButtonName, className, style } = this.props;

    return (
      <div
        className={className ? classNames(className, 'sc-modal-root') : 'sc-modal-root'}
        onClick={this.onModalClick.bind(this)}
        style={style}
      >
        <div className={styles.wrap} onClick={this.onWrapTap.bind(this)}>
          {(() => {
            if (title && type === 'buttonTop') {
              return (
                <div className={styles.viewHeader}>
                  <Button className={styles.viewHeaderButtonTop} color="linkWhite" icon={<i className="material-icons">close</i>} onClick={this.onModalClick.bind(this)} />
                  <div className={styles.viewTitle}>{title}</div>
                  <Button className={styles.viewHeaderButtonTop} color="linkWhite" icon={<i className="material-icons">done</i>} onClick={this.props.onOkModalClick} />
                </div>
              );
            } else if (title && type === 'buttonBottom') {
              return (
                <div className={styles.viewHeader}>
                  <div className={styles.viewTitle}>{title}</div>
                </div>
              );
            } else {
              return null;
            }
          })()}
          <div className={styles.component}>
            {component}
          </div>
          {
            type === 'buttonBottom' ? (
              <div className={styles.viewFooter}>
                <Button className={styles.dialogActionButton} shape="squareRound" text={negativeButtonName} width="80%" onClick={this.onModalClick.bind(this)} />
                <Button className={styles.dialogActionButton} shape="squareRound" text={positiveButtonName} width="80%" onClick={this.props.onOkModalClick} />
              </div>
            ) : null
          }
        </div>
      </div>
    );
  }
}
