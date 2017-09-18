declare var jest, describe, it, expect, require;

import * as React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import { MessageDateSeparator } from '../../src/components/Message/internal/MessageDateSeparator';

const testComponent1 = shallow(
  <MessageDateSeparator
    date="1/1"
  />
);
it('MessageDateSeparator renders correctly', () => {
  const j = toJson(testComponent1);
  expect(j).toMatchSnapshot();
});

const testComponent2 = shallow(
  <MessageDateSeparator
    date="1/1"
    className="test-class"
    style={{width: '100px'}}
  />
);
it('MessageDateSeparator renders correctly', () => {
  const j = toJson(testComponent2);
  expect(j).toMatchSnapshot();
});
