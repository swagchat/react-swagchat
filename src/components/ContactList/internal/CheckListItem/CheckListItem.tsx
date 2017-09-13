import * as React from 'react';
import { IOnClickProps } from '../../../';
import * as styles from './check-list-item.css';
const classNames = require('classnames');

export interface ICheckListItemProps extends IOnClickProps {
  text: string;
  icon?: React.ReactNode;
  isChecked?: boolean;
  checkedIcon?: React.ReactNode;
  unCheckedIcon?: React.ReactNode;
  width?: string;
  height?: string;
  fontSize?: string;
  fontColor?: string;
  className?: string;
  style?: Object;
}

export interface ICheckState {
  isChecked: boolean;
}

export class CheckListItem extends React.Component<ICheckListItemProps, ICheckState> {
  public static defaultProps: Partial<ICheckListItemProps> = {
    isChecked: false,
    className: '',
    style: {},
    onClick: () => {},
  };

  constructor(props: ICheckListItemProps) {
    super(props);

    if (props.isChecked) {
      this.state = {isChecked: props.isChecked};
    } else {
      this.state = {isChecked: false};
    }
  }

  onClick() {
    this.setState({isChecked: !this.state.isChecked});
    this.props.onClick ? this.props.onClick() : null;
  }

  render(): JSX.Element  {
    const { text, icon, width, height, fontSize, fontColor } = this.props;

    let rootStyle: {
      width?: string;
      height?: string;
    } = {};
    width ? rootStyle.width = width : null;
    height ? rootStyle.height = height : null;

    let descriptionStyle: {
      color?: string,
      fontSize?: string,
    } = {};
    fontSize ? descriptionStyle.fontSize = fontSize : null;
    fontColor ? descriptionStyle.color = fontColor : null;

    return (
      <div className={styles.root} onClick={this.onClick.bind(this)} style={rootStyle}>
        {icon ? <div className={styles.flex1}>{icon}</div> : null}
        <div className={styles.flex2}>
          <div className={styles.subject} style={descriptionStyle}>{text}</div>
        </div>
        <div className={styles.flex3}>
          {this.state.isChecked ? (
            this.props.checkedIcon ? this.props.checkedIcon : <i className={classNames('material-icons', styles.checked)}>radio_button_checked</i>
          ) : (
            this.props.unCheckedIcon ? this.props.unCheckedIcon : <i className={classNames('material-icons', styles.unchecked)}>radio_button_unchecked</i>
          )}
        </div>
      </div>
    );
  }
}
