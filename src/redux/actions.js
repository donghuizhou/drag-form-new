export const UPDATE_FORM_JSON = 'UPDATE_FORM_JSON';
export const UPDATE_CUR_ACTIVE_ITEM = 'UPDATE_CUR_ACTIVE_ITEM';
export const UPDATE_TIME_STAMP = 'UPDATE_TIME_STAMP';

export function updateFormJson (item) {
  return {
    type: UPDATE_FORM_JSON,
    payload: item
  }
}

export function updateCurActiveItem (item) {
  return {
    type: UPDATE_CUR_ACTIVE_ITEM,
    payload: item
  }
}

export function updateTimeStamp (item) {
  return {
    type: UPDATE_TIME_STAMP,
    payload: item
  }
}