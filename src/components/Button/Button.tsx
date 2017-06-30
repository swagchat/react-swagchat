import * as React from 'react';
import { IOnClickProps } from '../../';

export interface IButtonProps extends IOnClickProps {
  icon?: React.ReactNode;
  text?: string;
  className?: string;
  style?: Object;
}

export const Button = (props: IButtonProps) => (
  <div
    className={props.className ? props.className : 'button'}
    style={props.style ? props.style : {}}
    onClick={props.onClick
  }>
    {(() => {
      if (props.icon) {
        return props.icon;
      } else if (props.text) {
        return <div className="button_text">{props.text}</div>;
      } else {
        return null;
      }
    })()}
  </div>
);
