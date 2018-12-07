import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import App, { AppProps, Container, DefaultAppIProps } from 'next/app';
import Router from 'next/router';
import nprogress from 'nprogress';
import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import getPageContext, { PageContext } from '../src/getPageContext';
import withReduxStore from '../src/withReduxStore';

nprogress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => {
  nprogress.start();
});

Router.events.on('routeChangeComplete', () => {
  nprogress.done();
});

Router.events.on('routeChangeError', () => {
  nprogress.done();
});

interface Props {
  store: Store;
}

type CombinedProps =
  & Props
  & DefaultAppIProps
  & AppProps;

class MyApp extends App<CombinedProps> {

  pageContext: PageContext;

  /** @todo Typing props? */
  constructor(props: CombinedProps) {
    super(props);
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator
          .serviceWorker
          .register('/serviceWorker.js')
          .then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
          });
      });
    }
  }

  render() {

    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider registry={this.pageContext.sheetsRegistry} generateClassName={this.pageContext.generateClassName}>
          <Provider store={store}>
            <MuiThemeProvider theme={this.pageContext.theme} sheetsManager={this.pageContext.sheetsManager}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
              <Component pageContext={this.pageContext} {...pageProps} />
            </MuiThemeProvider>
          </Provider>
        </JssProvider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
