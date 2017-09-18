declare var jest, describe, it, expect, require;

import * as React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import { ContactList } from '../../src/components';

const testComponent1 = shallow(
  <ContactList
    contacts={
      [
        {
          userId: 'perez',
          name: 'Perez',
          pictureUrl: 'http://www.material-ui.com/images/adellecharles-128.jpg',
        }, {
          userId: 'lewis',
          name: 'Lewis',
          pictureUrl: 'http://www.material-ui.com/images/adhamdannaway-128.jpg',
        }, {
          userId: 'harris',
          name: 'Harris',
          pictureUrl: 'http://www.material-ui.com/images/allisongrayce-128.jpg',
        }, {
          userId: 'lee',
          name: 'Lee',
          pictureUrl: 'http://www.material-ui.com/images/ok-128.jpg',
        }, {
          userId: 'gonzalez',
          name: 'Gonzalez',
          pictureUrl: 'http://www.material-ui.com/images/angelceballos-128.jpg',
        }
      ]
    }
  />
);
it('ContactList renders correctly', () => {
  const j = toJson(testComponent1);
  expect(j).toMatchSnapshot();
});

const testComponent2 = shallow(
  <ContactList
    contacts={
      [
        {
          userId: 'perez',
          name: 'Perez',
          pictureUrl: 'http://www.material-ui.com/images/adellecharles-128.jpg',
        }, {
          userId: 'lewis',
          name: 'Lewis',
          pictureUrl: 'http://www.material-ui.com/images/adhamdannaway-128.jpg',
        }, {
          userId: 'harris',
          name: 'Harris',
          pictureUrl: 'http://www.material-ui.com/images/allisongrayce-128.jpg',
        }, {
          userId: 'lee',
          name: 'Lee',
          pictureUrl: 'http://www.material-ui.com/images/ok-128.jpg',
        }, {
          userId: 'gonzalez',
          name: 'Gonzalez',
          pictureUrl: 'http://www.material-ui.com/images/angelceballos-128.jpg',
        }
      ]
    }
    selectedContacts={{
      ['perez']: {
        userId: 'perez',
        name: 'Perez',
        pictureUrl: 'http://www.material-ui.com/images/adellecharles-128.jpg',
      }
    }}
    noContactListText="No contacts"
    noContactListImage="http://example.com/noimage.png"
    checkedIcon={<div />}
    unCheckedIcon={<div />}
    className="test-class"
    style={{width: '100px'}}
    onClick={() => console.log('click')}
  />
);
it('ContactList renders correctly', () => {
  const j = toJson(testComponent2);
  expect(j).toMatchSnapshot();
});
