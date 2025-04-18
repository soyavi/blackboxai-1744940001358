import {combineReducers} from 'redux';
import auth from './auth';
import display from './display';
import conversation from './conversation';
import calendar from './calendar';

export default combineReducers({
  auth,
  display,
  conversation,
  calendar,
});
