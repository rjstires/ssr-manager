import * as React from 'react';
import URI from 'urijs';
import store from '../src/storage';
import Router from 'next/router';
import { connect } from 'react-redux';
import { setAccessToken } from '../src/store/authentication';
import { Dispatch } from 'redux';

interface FragmentParams {
  access_token?: string;
  expires_in?: string;
  return?: string;
  scope?: string;
  state?: string;
  token_type?: string;
}

interface Props { }

interface State { }

type CombinedProps =
  & Props
  & DispatchProps;

class Authenticate extends React.Component<CombinedProps, State> {
  state: State = { authenticated: false };

  componentDidMount() {

    const location = URI(window.location);
    /**
     * Calling .fragment() gives us everything after the hash. Since its formated
     * like a search string, we just jam a ? in front of it and use URI to
     * safely convert it to an object.
     */
    const fragmentParams: FragmentParams = URI(`?${location.fragment()}`).search(true);

    const {
      access_token,
      expires_in,
      return: returnURI,
      scope,
      state,
      token_type,
    } = fragmentParams;

    if (!access_token || !expires_in || !returnURI || !scope || !state || !token_type) {
      return Router.push('/');
    }

    if (store.noonce.get() !== state) {
      return Router.push('/')
    }

    store.token.set(access_token);

    this.props.dispatch(setAccessToken(access_token));

    return Router.push('/');
  };

  render() {
    return null;
  }
}

interface DispatchProps {
  dispatch: Dispatch;
}

const connected = connect();

export default connected(Authenticate);
