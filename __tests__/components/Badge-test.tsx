declare var jest, describe, it, expect, require;

import * as React from 'react';
const renderer = require('react-test-renderer');
import { Badge } from '../../src/components';

it('Badge renders correctly', () => {
  const j = renderer.create(<Badge count={10} />).toJSON();
  expect(j).toMatchSnapshot();
});

it('Badge renders correctly', () => {
  const j = renderer.create(<Badge count={10.5} className="test-class" />).toJSON();
  expect(j).toMatchSnapshot();
});