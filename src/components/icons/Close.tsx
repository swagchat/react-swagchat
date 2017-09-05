import * as React from 'react';
import { IIconProps } from '../';
const classNames = require('classnames');

export const Close = (props: IIconProps) => (
  <svg
    viewBox="0 0 24 24"
    className={props.className ? classNames(props.className, 'icon') : 'icon'}
    style={props.style ? props.style : {}}
  >
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
  </svg>
);
