import React from 'react';

export default class ListItem extends React.Component {
  render() {
    return (
      <div>
        <p>{ this.props.value }</p>
      </div>
    );
  }
}
