import * as React from 'react';
import { IRootStyleProps, IOnClickProps } from '../../../';
import * as styles from './check-list-item.css';
const classNames = require('classnames');

export interface ICheckListItemProps extends IRootStyleProps, IOnClickProps {
  text: string;
  icon?: React.ReactNode;
  isChecked?: boolean;
  checkedIcon?: React.ReactNode;
  unCheckedIcon?: React.ReactNode;
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
    const { text, icon, className, style} = this.props;

    return (
      <div className={classNames(styles.root, className)} onClick={this.onClick.bind(this)} style={style}>
        {icon ? <div className={styles.flex1}>{icon}</div> : null}
        <div className={styles.flex2}>
          <div className={styles.subject}>{text}</div>
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
