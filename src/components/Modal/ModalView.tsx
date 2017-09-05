import * as React from 'react';
import { Button } from '../../components';

export interface IModalProps {
  type?: 'button-top' | 'button-bottom';
  title: string;
  component: React.ReactNode;
  className?: string;
  style?: Object;
  onModalClick: () => void;
}

export interface IModalState {
  isDisplayModal: boolean;
}

export class ModalView extends React.Component<IModalProps, IModalState> {
  public static defaultProps: Partial<IModalProps> = {
    type: 'button-top',
    className: '',
    style: {},
    onModalClick: () => {},
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

    const { type, title, component, className, style } = this.props;
    const classNames = require('classnames');

    return (
      <div
        className={className ? classNames(className, 'modal-dialog-root') : 'modal-dialog-root'}
        onClick={this.onModalClick.bind(this)}
        style={style}
      >
        <div className="sc-modal-view-wrap" onClick={this.onWrapTap.bind(this)}>
          {(() => {
            if (type === 'button-top') {
              return (
                <div className="sc-modal-view-header">
                  <Button icon={<i className="material-icons">close</i>} fontColor="white" onClick={this.onModalClick.bind(this)} className="sc-modal-view-header-button" />
                  <div className="sc-modal-view-title">{title}</div>
                  <Button icon={<i className="material-icons">done</i>} fontColor="white" onClick={this.props.onModalClick} className="sc-modal-view-header-button" />
                </div>
              );
            } else if (type === 'button-bottom') {
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
          <div className="sc-modal-view-body">
            {component}
          </div>
          {
            type === 'button-bottom' ? (
              <div className="sc-modal-view-footer">
                <Button type="square-round" text="cancel" fontColor="#333333" hoverFontColor="#0084ff" borderColor="#0084ff" backgroundColor="white" onClick={this.onModalClick.bind(this)} />
                <Button type="square-round" text="ok" fontColor="#333333" hoverFontColor="#0084ff" borderColor="#0084ff" backgroundColor="white" onClick={this.props.onModalClick} />
              </div>
            ) : null
          }
        </div>
      </div>
    );
  }
}
