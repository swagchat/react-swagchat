declare var jest, describe, it, expect, require;

import * as React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import { Button } from '../../src/components';

const testComponent1 = shallow(
  <Button
    text="Button"
  />
);
it('Button renders correctly. Very simple setting.', () => {
  const j = toJson(testComponent1);
  expect(j).toMatchSnapshot();
});

const testComponent2 = shallow(
  <Button
    text="Button"
    icon={<div />}
    shape="round"
    color="secondary"
    position="left"
    iconPosition="right"
    className="test-class"
    style={{width: '100px'}}
    onClick={() => console.log('click')}
  />
);
it('Button renders correctly. All property setting.', () => {
  const j = toJson(testComponent2);
  expect(j).toMatchSnapshot();
});
