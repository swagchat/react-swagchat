import * as React from 'react';
import { IIconProps } from '../';

export const Send = (props: IIconProps) => (
  <svg
    viewBox="0 0 24 24"
    className={props.className ? props.className : 'icon'}
    style={props.style ? props.style : {}}
  >
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);
