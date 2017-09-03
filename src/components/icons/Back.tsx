import * as React from 'react';
import { IIconProps } from '../';

export const Back = (props: IIconProps) => (
  <svg
    viewBox="0 0 24 24"
    className={props.className ? props.className : 'icon'}
    style={props.style ? props.style : {}}
  >
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
);
