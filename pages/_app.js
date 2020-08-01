import React from 'react';
import App from 'next/app';

import '../src/client/styles/global.scss';

class MyApp extends App {
  render() {
    const {Component, pageProps} = this.props;
    return <Component {...pageProps}></Component>;
  }
}

export default MyApp;
