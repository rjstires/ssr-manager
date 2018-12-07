import React from 'react'
import { initializeStore } from './store'
import { Store } from 'redux';
import { NextComponentClass } from 'next';
import { setAccessToken } from './store/authentication';
const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore(initialState?: any) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState)
  }

  // Create store if unavailable on the client and set it on the window object
  if (!(window as any)[__NEXT_REDUX_STORE__]) {
    (window as any)[__NEXT_REDUX_STORE__] = initializeStore(initialState)
  }
  return (window as any)[__NEXT_REDUX_STORE__]
}

export default (App: NextComponentClass<{ store: Store }>) => {
  return class AppWithRedux extends React.Component {

    store: Store;

    static async getInitialProps(appContext) {

      const store = getOrCreateStore()

      if (isServer) {
        store.dispatch(setAccessToken(appContext.ctx.req.cookies.token));
      }

      // Provide the store to getInitialProps of pages
      appContext.ctx.store = store

      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext)
      }

      return {
        ...appProps,
        initialReduxState: store.getState()
      }
    }

    constructor(props) {
      super(props)
      this.store = getOrCreateStore(props.initialReduxState)
    }

    render() {
      const { initialReduxState, ...rest } = this.props;

      return <App {...rest} store={this.store} />
    }
  }
}
