import * as React from 'react';

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
        className="sub-title-bar-root"
        style={!this.props.isDisplayBorder ? {border: 'none'} : {}}
      >
        {this.props.title}
      </div>
    );
  }
}
