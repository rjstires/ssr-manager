import * as React from 'react';
import store from '../src/storage';

class Logout extends React.PureComponent<{}> {
  componentDidMount() {
    store.token.remove();
    store.noonce.remove();
    window.location.href = 'https://login.linode.com/logout';
  }

  render() {
    return null;
  }
}

export default Logout;
