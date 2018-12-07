import store from './storage';
import getConfig from 'next/config';
export const ACCESS_TOKEN = store.token.get();

const {
  publicRuntimeConfig: {
    clientId, loginRoot, appRoot, apiRoot
  },
} = getConfig();

export const CLIENT_ID = clientId;

export const LOGIN_ROOT = loginRoot;

export const APP_ROOT = appRoot;

export const API_ROOT = apiRoot;
