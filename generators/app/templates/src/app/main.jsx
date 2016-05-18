import '../styles/main.scss';

import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router, Route } from 'react-router';

import App from './app';
import FirstPage from './components/first_page';
import SecondPage from './components/second_page';

class PhonegapApp {
  constructor() {
    if (typeof (cordova) !== 'undefined' || typeof (phonegap) !== 'undefined') {
      document.addEventListener('deviceready', this.bootstrapApp, false);
    } else {
      window.onload = this.bootstrapApp();
    }
  }

  bootstrapApp() {
    render(
      (
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <Route path="first" component={FirstPage} />
            <Route path="second" component={SecondPage} />
          </Route>
        </Router>
      ), document.getElementById('content')
    );

    if (navigator.splashscreen) {
      setTimeout(function () {
        navigator.splashscreen.hide();
      }, 2000);
    }
  }
}

var app = new PhonegapApp();
export default app;
