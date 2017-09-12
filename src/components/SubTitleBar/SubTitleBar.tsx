import * as React from 'react';
import * as styles from './sub-title-bar.css';

export interface IRoomSeparatorProps {
  title: string;
  isDisplayBorder?: boolean;
}

export class SubTitleBar extends React.Component<IRoomSeparatorProps, {}> {
  public static defaultProps: Partial<IRoomSeparatorProps> = {
    isDisplayBorder: true,
  };

  render(): JSX.Element {
    return (
      <div
        className={styles.root}
        style={!this.props.isDisplayBorder ? {border: 'none'} : {}}
      >
        {this.props.title}
      </div>
    );
  }
}
