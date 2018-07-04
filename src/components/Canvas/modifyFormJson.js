import store from '../../redux/store';
import { updateFormJson } from '../../redux/actions';
import { message } from 'antd';

export function modifyFormJson (name) {
  let tmp = {}, formJson = store.getState().formJson;
  switch (name) {
    case 'SearchArea':
      for (let i in formJson) {
        if (formJson[i].type === 'SearchArea') { message.error('已存在搜索区域'); return; }
      }
      this.setState({columns: '', rows: '', gridModalVisible: true});
      break;
    case 'ButtonArea': 
      for (let i in formJson) {
        if (formJson[i].type === 'ButtonArea') { message.error('已存在按钮区域'); return; }
      }
      tmp = { type: name, attrs: {}, children: [] };
      formJson.push(tmp);
      store.dispatch(updateFormJson(formJson));
      break;
    case 'TableArea':
      for (let i in formJson) {
        if (formJson[i].type === 'TableArea') { message.error('已存在表格区域'); return; }
      }
      tmp = { type: name, attrs: {}, children: [] };
      formJson.push(tmp);
      store.dispatch(updateFormJson(formJson));
      break;  
    case 'Button':
      tmp = { type: name, attrs: {}, children: [] };
      formJson.forEach((item) => {
        if (item.type === 'ButtonArea') { 
          item.children.push(tmp); 
        }
      });
      store.dispatch(updateFormJson(formJson));
      break;  
    case 'Input':
      tmp = { type: name, attrs: {}, children: [] };
      formJson.forEach((item) => {
        if (item.type === 'SearchArea' && item.attrs.rows * item.attrs.columns === item.children.length) { message.error('搜索区域已满'); return; }
        if (item.type === 'SearchArea' && item.attrs.rows * item.attrs.columns !== item.children.length) { item.children.push(tmp); }
      });
      store.dispatch(updateFormJson(formJson));
      break;
  }
}