import 'isomorphic-fetch';
import { NextContext } from 'next';
import redirect from '../src/redirect';

declare interface RequestConfig { }

const redirectUnauthenticated = (ctx: NextContext) => (response: Response) => {
  if (response.status === 401) {
    redirect(`/logout`, ctx)
  }

  return response;
}

const request = (ctx: NextContext, path: string, opt: RequestConfig) => {
  const { store } = ctx;

  const { authentication } = store.getState();

  return fetch(path, { ...opt, headers: { Authorization: `Bearer ${authentication.token}` } })
    .then(redirectUnauthenticated(ctx))
    .then(response => response.json())
}

export default request;
