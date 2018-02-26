import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
const clientParams = {
  apiEndpoint: '',
  wsEndpoint: '',
  accessToken: '',
  userId: '',
  username: '',
};
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App clientParams={clientParams} />, div);
});
