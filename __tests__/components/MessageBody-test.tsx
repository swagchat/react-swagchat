declare var jest, describe, it, expect, require;

import * as React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import { MessageBody } from '../../src/components';
import { IMessage, IUserForRoom } from 'swagchat-sdk';
import { PluginMessageText, PluginMessageImage } from '../../src/addons/messages/';

const roomUsers: {[key: string]: IUserForRoom} = {
  ['00581ea9-3547-4c81-930c-a3ed042e4b21']: {
    userId: '00581ea9-3547-4c81-930c-a3ed042e4b21',
    name: 'Williams',
    pictureUrl: 'http://example.com/williams.png'
  },
  ['7da9e9c6-d174-4ab5-86f8-99e727c710ff']: {
    userId: '7da9e9c6-d174-4ab5-86f8-99e727c710ff',
    name: 'Lee',
    pictureUrl: 'http://example.com/lee.png'
  },
};

const messages: {[key: string]: IMessage} = {
  ['61952241-48c8-4cdd-9fe2-ab61b8bf9c55']: {
    messageId: '61952241-48c8-4cdd-9fe2-ab61b8bf9c55',
    roomId: '821d92d7-4a68-452a-b660-51379544cec4',
    userId: '00581ea9-3547-4c81-930c-a3ed042e4b21',
    type:  'text',
    payload: {
      text: 'How\'ve you been recently?'
    },
    created: '2017-06-30T11:39:31Z'
  },
  ['9d79f275-a80c-41ae-aa26-0631d94486b4']: {
    messageId: '9d79f275-a80c-41ae-aa26-0631d94486b4',
    roomId: '821d92d7-4a68-452a-b660-51379544cec4',
    userId: '7da9e9c6-d174-4ab5-86f8-99e727c710ff',
    type: 'text',
    payload: {
      text: 'I\'ve been good. And you?'
    },
    created: '2017-06-30T11:42:09Z'
  },
  ['d26c3d0e-7568-49be-ada7-e9e2ef023cda']: {
    messageId: 'd26c3d0e-7568-49be-ada7-e9e2ef023cda',
    roomId: '821d92d7-4a68-452a-b660-51379544cec4',
    userId: '00581ea9-3547-4c81-930c-a3ed042e4b21',
    type: 'text',
    payload: {
      text: 'I\'ve been working all day.'
    },
    created: '2017-06-30T11:46:15Z'
  },
  ['7ecc5c82-8861-4161-9d18-98dc4f160976']: {
    messageId: '7ecc5c82-8861-4161-9d18-98dc4f160976',
    roomId: '821d92d7-4a68-452a-b660-51379544cec4',
    userId: '7da9e9c6-d174-4ab5-86f8-99e727c710ff',
    type: 'text',
    payload: {
      text: 'Don\'t push yourself too hard. You should get some rest.'
    },
    created: '2017-06-30T11:46:44Z'
  },
  ['00dfce2d-2635-4adf-b999-3e0f0bddabb6']: {
    messageId: '00dfce2d-2635-4adf-b999-3e0f0bddabb6',
    roomId: '821d92d7-4a68-452a-b660-51379544cec4',
    userId: '7da9e9c6-d174-4ab5-86f8-99e727c710ff',
    type: 'text',
    payload: {
      text: 'By the way, recently I started keeping dogs.'
    },
    created: '2017-06-30T12:05:56Z'
  },
  ['21af4ffd-71c7-4c3d-bf06-511f6da00100']: {
    messageId: 'fd10d8f2-1924-4398-bac0-d941b4c6f512',
    roomId: '821d92d7-4a68-452a-b660-51379544cec4',
    userId: '00581ea9-3547-4c81-930c-a3ed042e4b21',
    type: 'text',
    payload: {
      text: 'That\'s nice.'
    },
    created: '2017-08-15T08:19:26Z'
  },
};

const testComponent1 = shallow(
  <MessageBody
    myUserId="myUserId"
    roomUsers={roomUsers}
    messages={messages}
    pluginMessages={[new PluginMessageText, new PluginMessageImage]}
  />
);
it('MessageBody renders correctly', () => {
  const j = toJson(testComponent1);
  expect(j).toMatchSnapshot();
});

const testComponent2 = shallow(
  <MessageBody
    myUserId="myUserId"
    roomUsers={roomUsers}
    messages={messages}
    pluginMessages={[new PluginMessageText, new PluginMessageImage]}
    customPluginMessages={[new PluginMessageText, new PluginMessageImage]}
    noMessageText="No messages"
    noMessageImage="http://example.com/noimage.png"
    className="test-class"
    style={{width: '100px'}}
  />
);
it('MessageBody renders correctly', () => {
  const j = toJson(testComponent2);
  expect(j).toMatchSnapshot();
});
