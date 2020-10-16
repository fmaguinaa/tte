import React, { Component } from 'react'
// import About from './About'
// import Contact from './Contact'
// import Cookie from './Cookie'
// import Gallery from './Gallery'
// // import Reserva from './FormSeller'
// import Slider from './Slider'

import Game from './Game'

import { parseCookies, setCookie, destroyCookie } from 'nookies'

export default class Index extends Component {
  static async getInitialProps(ctx) {
    parseCookies(ctx)

    setCookie(ctx, 'token', true, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
    destroyCookie(ctx, 'token')
  }

  render() {
    return (
      <div>
        <Game />
      </div>
    )
  }
}