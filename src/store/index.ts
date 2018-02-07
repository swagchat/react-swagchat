import { createLogger } from 'redux-logger';
import sagaMiddlewareFactory from 'redux-saga';
import { SagaMiddleware } from 'redux-saga';
import { routerMiddleware, routerReducer, RouterState } from 'react-router-redux';
import { History } from 'history';
import createHistory from 'history/createBrowserHistory';
import { Store, createStore, combineReducers, applyMiddleware, Middleware } from 'redux';

import { ClientState } from './client';
import { UserState } from './user';
import { client } from '../reducer/client';
import { user } from '../reducer/user';
import { rootSaga } from '../saga';

const middleware: Middleware[] = [];
export const routerHistory: History = createHistory();

export const sagaMiddleware: SagaMiddleware<{}> = sagaMiddlewareFactory();
if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({
    level: 'info',
    duration: true,
  });
  middleware.push(logger);
}
middleware.push(sagaMiddleware);
middleware.push(routerMiddleware(routerHistory));

export const store: Store<{}> = createStore(
  combineReducers({
    client,
    user,
    router: routerReducer,
  }),
  applyMiddleware(...middleware)
);

sagaMiddleware.run(rootSaga);

export type State = {
  client: ClientState,
  user: UserState,
  router: RouterState,
};
