import * as React from 'react';
import { IIconProps } from '../../';

export const Expand = (props: IIconProps) => (
  <svg
    viewBox="0 0 24 24"
    className={props.className ? props.className : 'icon'}
    style={props.style ? props.style : {}}
  >
    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
  </svg>
);
