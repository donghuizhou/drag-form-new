import { UPDATE_FORM_JSON, UPDATE_CUR_ACTIVE_ITEM, UPDATE_TIME_STAMP } from './actions';

const initState = {
  formJson: [],
  curActiveItem: {},
  timeStamp: 1200150129
}

export function updateFormJsonReducer (state = initState, action) {
  switch (action.type) {
    case UPDATE_FORM_JSON:
      return action.payload;
    default:
      return [];
  }
}

export function updateCurActiveItemReducer (state = initState, action) {
  switch (action.type) {
    case UPDATE_CUR_ACTIVE_ITEM:
      return action.payload;
    default: 
      return {};  
  }
}

export function updateTimeStampReducer (state = initState, action) {
  switch (action.type) {
    case UPDATE_TIME_STAMP:
      return action.payload;
    default:
      return 'default timestamp'
  }
}