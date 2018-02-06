import * as React from 'react';
import { IRootStyleProps } from '../';
import * as styles from './progress.css';
const classNames = require('classnames');

export interface IProgressProps extends IRootStyleProps {
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'disable' | 'dark' | 'light';
}

export class Progress extends React.Component<IProgressProps, {}> {
  public static defaultProps: Partial<IProgressProps> = {
    className: '',
    style: {},
  };

  render(): JSX.Element  {
    const { className, style } = this.props;

    return (
      <svg className={classNames(styles.root, className)} style={style} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle cy="50" cx="68.6667" fill="#93dbe9" r="20">
          <animate attributeName="cx" calcMode="linear" values="30;70;30" keyTimes="0;0.5;1" dur="1" begin="-0.5s" repeatCount="indefinite"></animate>
        </circle>
        <circle cy="50" cx="31.3333" fill="#689cc5" r="20">
          <animate attributeName="cx" calcMode="linear" values="30;70;30" keyTimes="0;0.5;1" dur="1" begin="0s" repeatCount="indefinite"></animate>
        </circle>
        <circle cy="50" cx="68.6667" fill="#93dbe9" r="20">
          <animate attributeName="cx" calcMode="linear" values="30;70;30" keyTimes="0;0.5;1" dur="1" begin="-0.5s" repeatCount="indefinite"></animate>
          <animate attributeName="fill-opacity" values="0;0;1;1" calcMode="discrete" keyTimes="0;0.499;0.5;1" repeatCount="indefinite" dur="1s"></animate>
        </circle>
      </svg>
    );
  }
}
