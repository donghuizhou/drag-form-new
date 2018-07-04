import { combineReducers } from 'redux';
import { updateFormJsonReducer, updateCurActiveItemReducer, updateTimeStampReducer } from './reducer';

const allReducers = {
  formJson: updateFormJsonReducer,
  curActiveItem: updateCurActiveItemReducer,
  timeStamp: updateTimeStampReducer
};

const rootReducer = combineReducers(allReducers);

export default rootReducer;