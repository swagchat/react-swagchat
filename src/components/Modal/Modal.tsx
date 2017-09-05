import * as React from 'react';
import { Button } from '../../components';

export interface IModalProps {
  type?: 'button-top' | 'button-bottom';
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
    type: 'button-bottom',
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
    const classNames = require('classnames');

    return (
      <div
        className={className ? classNames(className, 'sc-modal-root') : 'sc-modal-root'}
        onClick={this.onModalClick.bind(this)}
        style={style}
      >
        <div className="sc-modal-wrap" onClick={this.onWrapTap.bind(this)}>
          {(() => {
            if (title && type === 'button-top') {
              return (
                <div className="sc-modal-view-header">
                  <Button icon={<i className="material-icons">close</i>} fontColor="white" onClick={this.onModalClick.bind(this)} className="sc-modal-view-header-button" />
                  <div className="sc-modal-view-title">{title}</div>
                  <Button icon={<i className="material-icons">done</i>} fontColor="white" onClick={this.props.onOkModalClick} className="sc-modal-view-header-button" />
                </div>
              );
            } else if (title && type === 'button-bottom') {
              return (
                <div className="sc-modal-view-header">
                  <div className="sc-modal-view-header-button" />
                  <div className="sc-modal-view-title">{title}</div>
                  <Button icon={<i className="material-icons">close</i>} fontColor="white" onClick={this.onModalClick.bind(this)} className="sc-modal-view-header-button" />
                </div>
              );
            } else {
              return null;
            }
          })()}
          <div className="sc-modal-component">
            {component}
          </div>
          {
            type === 'button-bottom' ? (
              <div className="sc-modal-view-footer">
                <Button type="square-round" text={negativeButtonName} width="80%" onClick={this.onModalClick.bind(this)} />
                <Button type="square-round" text={positiveButtonName} width="80%" onClick={this.props.onOkModalClick} />
              </div>
            ) : null
          }
        </div>
      </div>
    );
  }
}
