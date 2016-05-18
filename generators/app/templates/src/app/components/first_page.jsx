import style from '../../styles/login.scss';

import React from 'react';

export default class FirstPage extends React.Component {
  constructor(props) {
    super(props);
  }

  onClickNavigateToList() {
    window.location.href = '#/second';
  }

  render() {
    return (
      <div className={ style.main }>
        <div className={ style.header }>
          Simple React project with store and Ajax request.
        </div>
        <div className={ style.content }>
          <button onClick={ this.onClickNavigateToList.bind(this) }>go next</button>
        </div>
      </div>
    );
  }
}
