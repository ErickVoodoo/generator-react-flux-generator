import React from 'react';

import FirstPage from './components/first_page';

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        {this.props.children || <FirstPage />}
      </div>
    );
  }
}
