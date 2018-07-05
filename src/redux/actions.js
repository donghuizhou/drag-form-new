export const UPDATE_FORM_JSON = 'UPDATE_FORM_JSON';
export const UPDATE_CUR_ACTIVE_ITEM = 'UPDATE_CUR_ACTIVE_ITEM';
export const UPDATE_CUR_ACTIVE_TAB = 'UPDATE_CUR_ACTIVE_TAB';
export const UPDATE_SOMETHING = 'UPDATE_SOMETHING'

export function updateFormJson (item) {
  return {
    type: UPDATE_FORM_JSON,
    payload: item 
  }
}

export function updateCurActiveItem (item) {
  return {
    type: UPDATE_CUR_ACTIVE_ITEM,
    payload: {...item}
  }
}

export function updateCurActiveTab (item) {
  return {
    type: UPDATE_CUR_ACTIVE_TAB,
    payload: item
  }
}

export function updateSomething (item) {
  return {
    type: UPDATE_SOMETHING,
    payload: item
  }
}