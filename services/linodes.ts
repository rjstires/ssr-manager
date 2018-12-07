import { API_ROOT } from '../src/constants';
import request from './request';
import { NextContext } from 'next';


export const getLinodes = (ctx: NextContext) =>
  request(ctx, `${API_ROOT}/linode/instances`, { method: 'GET' })

export const getLinode = (ctx: NextContext, id: string | number) =>
  request(ctx, `${API_ROOT}/linode/instances/${id}`, { method: 'GET' });
