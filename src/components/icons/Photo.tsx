import * as React from 'react';
import { IIconProps } from '../../';

export const Photo = (props: IIconProps) => (
  <svg
    viewBox="0 0 24 24"
    className={props.className ? props.className : 'icon'}
    style={props.style ? props.style : {}}
  >
    <circle cx="12" cy="12" r="3.2"/>
    <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
  </svg>
);
