import { API_ROOT } from '../src/constants';
import request from './request';
import { NextContext } from 'next';

interface Params {
  page: number;
  pageSize: number;
}

export const getLinodes = (ctx: NextContext, params?: Params) =>
  request(ctx, `${API_ROOT}/linode/instances`, { method: 'GET', params })
  .then(({ data }) => data);

  export const getLinode = (ctx: NextContext, id: string | number) =>
  request(ctx, `${API_ROOT}/linode/instances/${id}`, { method: 'GET' })
  .then(({ data }) => data);
