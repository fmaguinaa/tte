import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import {createBrowserHistory} from 'history'
import Root from '../components/root/Root'

const {createHistory} = createBrowserHistory

export const history = createHistory

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Root
          history={history}
        />
      </BrowserRouter>
    );
  }
}