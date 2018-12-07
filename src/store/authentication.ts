import actionCreatorFactory, { AnyAction, isType } from 'typescript-fsa';

const actionCreator = actionCreatorFactory(`@@ssr-manager/authentication`);

type State = ApplicationState['authentication'];

export const initialState: State = { token: undefined }

export const setAccessToken = actionCreator<string>(`set_token`)
export const clearAccessToken = actionCreator<undefined>(`clear_token`)

// REDUCERS
export default (state = initialState, action: AnyAction) => {
  if (isType(action, setAccessToken)) {
    return ({ token: action.payload });
  }

  if (isType(action, clearAccessToken)) {
    return ({ token: undefined });
  }

  return state;
}
