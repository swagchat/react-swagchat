import { createLogger } from 'redux-logger';
import sagaMiddlewareFactory from 'redux-saga';
import { SagaMiddleware } from 'redux-saga';
import { routerMiddleware, routerReducer, RouterState } from 'react-router-redux';
import { History } from 'history';
import createHistory from 'history/createHashHistory';
import { Store, createStore, combineReducers, applyMiddleware, Middleware } from 'redux';

import { UserState } from './user';
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
    user,
    router: routerReducer,
  }),
  applyMiddleware(...middleware)
);

sagaMiddleware.run(rootSaga);

export type State = {
  user: UserState,
  router: RouterState,
};

export interface InvalidParam {
  name: string;
  reason: string;
}

export interface ErrorResponse {
  code: number;
  title: string;
  message: string;
  invalidParams?: InvalidParam[];
}