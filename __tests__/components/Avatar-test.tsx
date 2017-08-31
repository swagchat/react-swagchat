declare var jest, describe, it, expect, require;

import * as React from 'react';
const renderer = require('react-test-renderer');
import { Avatar } from '../../src/components';

it('Avatar renders correctly', () => {
  const j = renderer.create(<Avatar src="http://swagchat.io/logo.png" />).toJSON();
  expect(j).toMatchSnapshot();
});

it('Avatar renders correctly', () => {
  const j = renderer.create(<Avatar src="http://swagchat.io/logo.png" className="test-class" />).toJSON();
  expect(j).toMatchSnapshot();
});

