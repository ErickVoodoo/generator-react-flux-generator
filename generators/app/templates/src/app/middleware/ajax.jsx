import { EventEmitter } from 'events';
import AppDispatcher from '../dispatchers/main';
import Action from '../actions/main';
import { Constants } from '../utils';

class Ajax extends EventEmitter {
  constructor() {
    super();
    this._isExecuting = false;
  }

  get isExecuting() {
    return this._isExecuting;
  }

  set isExecuting(value) {
    this._isExecuting = value;
    this.emitChange();
  }

  execute(url, requestType, params, contentType = 'application/json') {
    return new Promise(
      (resolve, reject) => {
        var request = new XMLHttpRequest();
        request.open(requestType, url, true);
        request.setRequestHeader('Content-Type', contentType);
        request.onloadstart = () => {
          setTimeout(() => {
            Action.actionStart(null, Constants.ACTIONS.REQUEST_STARTED);
          },
        );
        };

        request.onload = () => {
          Action.actionStart(null, Constants.ACTIONS.REQUEST_FINISHED);
          switch (request.status) {
            case 201:
            case 200:
              resolve(request.response);
              break;
            case 409:
              reject(Constants.ERRORS.CONFLICT);
              break;
            default:
              reject(`${Constants.ERRORS.NETWORK}: ${request.statusText}`);
              break;
          }
        };

        request.onerror = () => {
          Action.actionStart(null, Constants.ACTIONS.REQUEST_FINISHED);
          reject(Constants.ERRORS.NETWORK);
        };

        params ? request.send(params) : request.send();
      });
  };

  emitChange() {
    this.emit(Constants.CALLBACKS.CHANGE_AJAX_EVENT);
  }

  addChangeListener(callback) {
    this.on(Constants.CALLBACKS.CHANGE_AJAX_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CALLBACKS.CHANGE_AJAX_EVENT, callback);
  }
}

let _Ajax = new Ajax();

AppDispatcher.register((payload) => {
  let action = payload.action;
  switch (action.type) {
    case Constants.ACTIONS.REQUEST_STARTED:
      _Ajax.isExecuting = true;
      break;
    case Constants.ACTIONS.REQUEST_FINISHED:
      _Ajax.isExecuting = false;
      break;
    default:
      break;
  }
});

export default _Ajax;
