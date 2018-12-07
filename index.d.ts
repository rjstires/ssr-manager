import { NextContext as _NextContext } from 'next';
import { Store } from 'redux';
declare module NodeJS {
  interface Global {
    __INIT_MATERIAL_UI__: any
  }
  interface Process {
    browser?: any
  }
}

declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

declare module 'next' {
  interface NextContext extends _NextContext {
    store: Store<ApplicationState>;
  }
}
