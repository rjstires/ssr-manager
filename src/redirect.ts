import Router from 'next/router';
import { NextContext } from 'next';

export default (target: string, ctx: NextContext) => {
  if (ctx.res) {
    ctx.res.writeHead(303, { Location: target });
    ctx.res.end();
  } else {
    Router.replace(target);
  }
};
