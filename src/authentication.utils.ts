import URI from 'urijs';
import uuid from 'uuid/v4';
import { APP_ROOT, CLIENT_ID, LOGIN_ROOT } from './constants';
import storage from './storage';

export const createOAuthURL = (noonce: string) =>
  URI(`${LOGIN_ROOT}/oauth/authorize`)
    .addSearch('client_id', CLIENT_ID)
    .addSearch('scope', '*')
    .addSearch('response_type', 'token')
    .addSearch('state', noonce)
    .addSearch('redirect_uri', `${APP_ROOT}/authenticate`);

  export const setNoonce = () => {
    const noonce = uuid();
    storage.noonce.set(noonce);
    return noonce;
  };
