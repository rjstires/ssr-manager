// import { get as getLocal, set as setLocal, remove as removeLocal } from 'store';
import { get as getCookie, set as setCookie, remove as removeCookie } from 'js-cookie';

const namespaced = (s: string) => s;

const TOKEN = namespaced(`token`);
const NOONCE = namespaced(`noonce`);

const token = {
  get: () => getCookie(TOKEN),
  set: (v: string) => setCookie(TOKEN, v),
  remove: () => removeCookie(TOKEN),
};

const noonce = {
  get: () => getCookie(NOONCE),
  set: (v: string) => setCookie(NOONCE, v),
  remove: () => removeCookie(NOONCE),
};

export default { token, noonce }
