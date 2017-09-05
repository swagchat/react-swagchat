import * as React from 'react';
import { IIconProps } from '../';
const classNames = require('classnames');

export const Done = (props: IIconProps) => (
  <svg
    viewBox="0 0 24 24"
    className={props.className ? classNames(props.className, 'icon') : 'icon'}
    style={props.style ? props.style : {}}
  >
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
  </svg>
);
