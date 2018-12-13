import actionCreatorFactory, { AnyAction, isType } from 'typescript-fsa';
import { getLinodes } from '../../services/linodes';
import { NextContext } from 'next';
import { ThunkAction } from 'redux-thunk';
import { range } from 'ramda';
import * as Bluebird from 'bluebird';

const actionCreator = actionCreatorFactory(`@@ssr-manager/data/linodes`);

type State = ApplicationState['linodes'];

export const initialState: State = {
  loading: false,
  data: [],
  error: undefined,
}

export const startLinodesRequest = actionCreator(`start`);

export const finishLinodesRequest = actionCreator<Linode.Instance[]>(`finished`);

export const failedLinodesRequest = actionCreator<Error>(`failed`);

// REDUCERS
export default (state = initialState, action: AnyAction) => {
  if (isType(action, startLinodesRequest)) {
    return ({
      ...state,
      loading: false,
    })
  }

  if (isType(action, finishLinodesRequest)) {
    return ({
      ...state,
      loading: false,
      error: undefined,
      data: action.payload,
    })
  }

  if (isType(action, failedLinodesRequest)) {
    return ({
      ...state,
      loading: false,
      error: action.payload,
      data: [],
    })
  }

  return state;
}

// ACTIONS
type RequestLinodes = (ctx: NextContext) => ThunkAction<Promise<any>, ApplicationState, undefined, any>;
export const requestLinodes: RequestLinodes = (ctx) => (dispatch) => {
  return getLinodes(ctx)
    .then(({ data, page, pages, results }) => {
      // If we only have one page, return it.
      if (page === pages) {
        return Promise.resolve({ data, results });
      }

      const remaining = range(page + 1, pages + 1)

      return Bluebird.map(remaining, (id) => getLinodes(ctx, { page: id }).then(({ data }) => data))
        .then((linodesArray) => ({
          pages,
          data: linodesArray.reduce((result, current) => [...result, ...current], data),
          results: results,
        }))
    })
    .then(({ data }) => data)
    .then((response) => {
      dispatch(finishLinodesRequest(response));
    })
    .catch((error) => {
      dispatch(failedLinodesRequest(error))
    })
};
