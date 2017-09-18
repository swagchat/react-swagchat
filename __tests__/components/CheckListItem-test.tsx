declare var jest, describe, it, expect, require;

import * as React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import { CheckListItem } from '../../src/components/ContactList/internal/CheckListItem/CheckListItem';

const testComponent1 = shallow(
  <CheckListItem
    text="Button"
  />
);
it('CheckListItem renders correctly', () => {
  const j = toJson(testComponent1);
  expect(j).toMatchSnapshot();
});

const testComponent2 = shallow(
  <CheckListItem
    text="Button"
    icon={<div />}
    isChecked={true}
    checkedIcon={<div />}
    unCheckedIcon={<div />}
    className="test-class"
    style={{width: '100px'}}
    onClick={() => console.log('click')}
  />
);
it('CheckListItem renders correctly', () => {
  const j = toJson(testComponent2);
  expect(j).toMatchSnapshot();
});
