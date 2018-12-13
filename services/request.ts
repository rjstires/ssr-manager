import Axios, { AxiosResponse } from 'axios';
import { NextContext } from 'next';
import redirect from '../src/redirect';

declare interface RequestConfig {
  method: 'GET';
  params?: any;
}

const redirectUnauthenticated = (ctx: NextContext) => (response: AxiosResponse) => {
  if (response.status === 401) {
    redirect(`/logout`, ctx)
  }
  return response;
}

const request = (ctx: NextContext, path: string, opt: RequestConfig) => {
  const { store } = ctx;

  const { authentication } = store.getState();

    return Axios(path, { ...opt, headers: { Authorization: `Bearer ${authentication.token}` } })
    .then(redirectUnauthenticated(ctx))
}

export default request;
