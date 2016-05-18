import style from '../../styles/list.scss';

import React from 'react';
import Store from '../stores/main';
import Action from '../actions/main';
import Ajax from '../middleware/ajax';

import { ListItem } from './common';
import { Constants } from '../utils';

export default class SecondPage extends React.Component {
  constructor(props) {
    super(props);
    this.changeStoreCallback = this.storeChangeListener.bind(this);
    this.changeAjaxCallback = this.ajaxChangeListener.bind(this);

    this.state = {
      dataList: Store.data || [],
      source: Store.source || '',
      inputStoreValue: '',
      inputAjaxValue: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    Store.addStoreChangeListener(this.changeStoreCallback);
    Ajax.addChangeListener(this.changeAjaxCallback);
  }

  componentWillUnmount() {
    Store.removeStoreChangeListener(this.changeStoreCallback);
    Ajax.removeChangeListener(this.changeAjaxCallback);
  }

  ajaxChangeListener() {
    this.setState({
      isLoading: Ajax.isExecuting,
    });
  }

  storeChangeListener() {
    this.setState({
      dataList: Store.data,
      inputStoreValue: '',
      source: Store.source,
    });
  }

  onChangeStoreInput(e) {
    this.setState({
      inputStoreValue: e.target.value,
    });
  }

  onChangeAjaxInput(e) {
    this.setState({
      inputAjaxValue: e.target.value,
    });
  }

  onClickAddData() {
    Action.actionStart(this.state.inputStoreValue, Constants.ACTIONS.ADD_DATA);
  }

  onClickLoadData() {
    this.setState({
      source: '',
    });
    Ajax.execute(this.state.inputAjaxValue, 'GET', null)
      .then((data) => {
        Action.actionStart(data, Constants.ACTIONS.GET_DATA_SUCCESS);
      })
      .catch((data) => {
        Action.actionStart(data, Constants.ACTIONS.GET_DATA_FAIL);
      });
  }

  render() {
    return (
      <div className={ style. main }>
        <div className={ style.first }>
          <p>example of store and action</p>
          <input onChange={ this.onChangeStoreInput.bind(this)}
            value={ this.state.inputStoreValue } type="text" placeholder="value..."/>
          <button onClick={ this.onClickAddData.bind(this) }>add new</button>
          {
            this.state.dataList.length != 0 && this.state.dataList.map((item, index) => (
              <ListItem value={ item } key={ index }/>
            ))
          }
        </div>
        <div className="horiz-border"/>
        <div className={ style.second }>
          <p>example of HTTP request</p>
          <input onChange={ this.onChangeAjaxInput.bind(this)}
            value={ this.state.inputAjaxValue } type="text" placeholder="http://..."/>
          <button onClick={ this.onClickLoadData.bind(this) }>get data</button>
          <p className={ this.state.isLoading || 'hidden' }>Loading...</p>
          <p>{ this.state.source }</p>
        </div>
      </div>
    );
  }
}
