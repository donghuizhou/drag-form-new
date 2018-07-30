import { UPDATE_FORM_JSON, 
         UPDATE_CUR_ACTIVE_ITEM, 
         UPDATE_CUR_ACTIVE_TAB,
         UPDATE_FUNCS } from './actions';

const initState = {
  formJson: [],
  curActiveItem: {},
  curActiveTab: 'component-list',
  funcs: []
}

export function updateStateReducer (state =initState, action) {
  switch (action.type) {
    case UPDATE_FORM_JSON:
      return Object.assign({}, state, {
        formJson: action.payload
      });
    case UPDATE_CUR_ACTIVE_ITEM:
      return Object.assign({}, state, {
        curActiveItem: action.payload
      });
    case UPDATE_CUR_ACTIVE_TAB:
      return Object.assign({}, state, {
        curActiveTab: action.payload
      });  
    case UPDATE_FUNCS:
      return Object.assign({}, state, {
        funcs: action.payload
      });
    default:
      return state;
  }
}

// export function updateFormJsonReducer (state = initState, action) {
//   switch (action.type) {
//     case UPDATE_FORM_JSON:
//       // return Object.assign({}, state, {
//       //   formJson: action.payload
//       // })
//       return action.payload;
//     default:
//       return state.formJson;
//   }
// }

// export function updateCurActiveItemReducer (state = initState, action) {
//   switch (action.type) {
//     case UPDATE_CUR_ACTIVE_ITEM:
//       // return Object.assign({}, state, {
//       //   curActiveItem: action.payload
//       // })
//       return state.curActiveItem;
//     default: 
//       return state.curActiveItem;  
//   }
// }

// export function updateCurActiveTabReducer (state = initState, action) {
//   switch (action.type) {
//     case UPDATE_CUR_ACTIVE_TAB:
//       // return Object.assign({}, state, {
//       //   curActiveTab: action.payload
//       // })
//       return action.payload;
//     default:
//       return state.curActiveTab;
//   }
// }