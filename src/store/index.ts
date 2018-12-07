import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import linodes, { initialState as linodesInitialState} from './linodes';
import authentication, { initialState as authenticationInitialState} from './authentication';

const initialState: ApplicationState = {
  linodes: linodesInitialState,
  authentication: authenticationInitialState,
};

export function initializeStore(state: ApplicationState = initialState) {
  return createStore(
    combineReducers({
      authentication,
      linodes,
    }),
    state,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  )
}
