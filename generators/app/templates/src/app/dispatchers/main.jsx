import { Dispatcher } from 'flux';
import Constants from '../utils/constants';

class AppDispatcher extends Dispatcher {
  handleAction(action) {
    this.dispatch({
      source: Constants.DISPATCHER.MAIN,
      action: action,
    });
  }
}

let _AppDispatcher = new AppDispatcher();
export default _AppDispatcher;
