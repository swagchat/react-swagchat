import * as React from 'react';
import { Button, IRootStyleProps } from '../../components';
import * as styles from './modal.css';
const classNames = require('classnames');

export interface IModalProps extends IRootStyleProps {
  title?: string;
  buttonPosition?: 'top' | 'bottom';
  component?: React.ReactNode;
  positiveButtonName?: string;
  negativeButtonName?: string;
  onOkModalClick: () => void;
}

export interface IModalState {
  isDisplayModal: boolean;
}

export class Modal extends React.Component<IModalProps, IModalState> {
  public static defaultProps: Partial<IModalProps> = {
    buttonPosition: 'bottom',
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

    const { buttonPosition, title, component, positiveButtonName, negativeButtonName, className, style } = this.props;

    return (
      <div
        className={className ? classNames(className, 'sc-modal-root') : 'sc-modal-root'}
        onClick={this.onModalClick.bind(this)}
        style={style}
      >
        <div className={styles.wrap} onClick={this.onWrapTap.bind(this)}>
          {(() => {
            if (title && buttonPosition === 'top') {
              return (
                <div className={styles.viewHeader}>
                  <Button className={styles.viewHeaderButtonTop} color="linkWhite" icon={<i className="material-icons">close</i>} onClick={this.onModalClick.bind(this)} />
                  <div className={styles.viewTitle}>{title}</div>
                  <Button className={styles.viewHeaderButtonTop} color="linkWhite" icon={<i className="material-icons">done</i>} onClick={this.props.onOkModalClick} />
                </div>
              );
            } else if (title && buttonPosition === 'bottom') {
              return (
                <div className={styles.viewHeader}>
                  <div className={styles.viewTitle}>{title}</div>
                </div>
              );
            } else {
              return null;
            }
          })()}
          {component ? (
            <div className={styles.component}>
              {component}
            </div>
          ) : null}
          {
            buttonPosition === 'bottom' ? (
              <div className={styles.viewFooter}>
                <Button className={styles.modalButton} position="center" text={negativeButtonName} onClick={this.onModalClick.bind(this)} />
                <Button className={styles.modalButton} position="center" text={positiveButtonName} onClick={this.props.onOkModalClick} />
              </div>
            ) : null
          }
        </div>
      </div>
    );
  }
}
