import App, { Container } from 'next/app'
import Router from 'next/router';
import React from 'react'

import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress

import { LocaleProvider } from 'antd'
import 'moment/locale/es'
import esEs from 'antd/lib/locale-provider/es_ES'

//Binding events. 
Router.events.on('routeChangeStart', () => {console.log("jjj");NProgress.start()});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <LocaleProvider locale={esEs}>
          <Component {...pageProps} />
        </LocaleProvider>
      </Container>
    )
  }
}

export default MyApp
