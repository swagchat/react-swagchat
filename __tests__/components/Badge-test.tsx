declare var jest, describe, it, expect, require;

import * as React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import { Badge } from '../../src/components';

const testComponent1 = shallow(
  <Badge
    count={10}
  />
);
it('Badge renders correctly', () => {
  const j = toJson(testComponent1);
  expect(j).toMatchSnapshot();
});

const testComponent2 = shallow(
  <Badge
    count={10.5}
    color="secondary"
    className="test-class"
    style={{width: '100px'}}
  />
);
it('Badge renders correctly', () => {
  const j = toJson(testComponent2);
  expect(j).toMatchSnapshot();
});