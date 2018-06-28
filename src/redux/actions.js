export const UPDATE_FORM_JSON = 'UPDATE_FORM_JSON';
export const UPDATE_CUR_HOVER_ITEM = 'UPDATE_CUR_HOVER_ITEM';

export function updateFormJson (item) {
  return {
    type: UPDATE_FORM_JSON,
    payload: item
  }
}

export function updateCurHoverItem (item) {
  return {
    type: UPDATE_CUR_HOVER_ITEM,
    payload: item
  }
}