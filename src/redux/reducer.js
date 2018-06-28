import { UPDATE_FORM_JSON, UPDATE_CUR_HOVER_ITEM } from './actions';

const initState = {
  formJson: [],
  curHoverItem: {}
}

export function updateFormJsonReducer (state = initState, action) {
  switch (action.type) {
    case UPDATE_FORM_JSON:
      return action.payload;
    default:
      return [];
  }
}

export function updateCurHoverItemReducer (state = initState, action) {
  switch (action.type) {
    case UPDATE_CUR_HOVER_ITEM:
      return action.payload;
    default: 
      return {};  
  }
}