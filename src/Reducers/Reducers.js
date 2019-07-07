import { clickReducer } from './ClickReducer';
//import { OtherReducer } from './otherReducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  clickState: clickReducer,
  //otherState: otherReducer
});