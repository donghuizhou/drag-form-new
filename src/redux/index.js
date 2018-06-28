import { combineReducers } from 'redux';
import { updateFormJsonReducer, updateCurHoverItemReducer } from './reducer';

const allReducers = {
  formJson: updateFormJsonReducer,
  curHoverItem: updateCurHoverItemReducer
};

const rootReducer = combineReducers(allReducers);

export default rootReducer;