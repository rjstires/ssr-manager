import React from 'react';
import { createOAuthURL, setNoonce } from '../../src/authentication.utils';
import store from '../../src/storage';

const authenticated = (Component: React.ComponentType) => {
  return class AuthWrapper extends React.Component<{}, {}> {
    state = { authenticated: false }

    componentDidMount() {
      const token = store.token.get();

      if (token) {
        return this.setState({ authenticated: true });
      }

      if (!token) {
        const state = setNoonce();
        window.location.href = createOAuthURL(state).toString();
      }
    }

    render() {
      const { authenticated } = this.state;

      return authenticated ? <Component {...this.props} /> : null;
    }
  }
}

export default authenticated;
