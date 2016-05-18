import { EventEmitter } from 'events';
import AppDispatcher from '../dispatchers/main';
import { Constants } from '../utils';

class Store extends EventEmitter {
  constructor() {
    super();
    this.data = [];
    this.source = '';
  }

  get data() {
    return this._data;
  }

  get source() {
    return this._source;
  }

  set data(data) {
    this._data = data;
    this.emitChangeStore();
  }

  set source(data) {
    this._source = data;
    this.emitChangeStore();
  }

  addNewData(string) {
    let validation = string.length != 0;
    if (validation) {
      let newArray = this.data;
      newArray.push(string);
      this.data = newArray;
    }
  }

  emitChangeStore() {
    this.emit(Constants.CALLBACKS.CHANGE_STORE_EVENT);
  }

  addStoreChangeListener(callback) {
    this.on(Constants.CALLBACKS.CHANGE_STORE_EVENT, callback);
  }

  removeStoreChangeListener(callback) {
    this.removeListener(Constants.CALLBACKS.CHANGE_STORE_EVENT, callback);
  }
}

let _Store = new Store();

AppDispatcher.register((payload) => {
  let action = payload.action;
  switch (action.type) {
    case Constants.ACTIONS.ADD_DATA:
      _Store.addNewData(action.data);
      break;
    case Constants.ACTIONS.GET_DATA_SUCCESS:
      _Store.source = action.data;
      break;
    case Constants.ACTIONS.GET_DATA_FAIL:
      _Store.source = action.data;
      break;
    default:
      break;
  }
});

export default _Store;
