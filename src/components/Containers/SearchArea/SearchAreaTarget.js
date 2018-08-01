import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { message } from 'antd';
import { ItemTypes } from '../../config/config';
import store from '../../../redux/store';
import { updateFormJson } from '../../../redux/actions';

const dropTarget = {
  drop (props, monitor, component) {
    if (monitor.canDrop()) {
      component.renderComponent(monitor.getItem().name);
    }
  },
  canDrop (props, monitor) {
    let item = monitor.getItem().name;
    return item === 'Input' || item === 'Select';
  }
}
const dropCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
});

const searchAreaStyle = { position: 'relative' };
const bgGreen = {  background: 'green', opacity: '0.3', position: 'absolute', top: '0', right: '0', bottom: '0', left: '0' };
const bgRed = {  background: 'red', opacity: '0.3', position: 'absolute', top: '0', right: '0', bottom: '0', left: '0' };

class SearchAreaTarget extends Component {
  renderComponent (name) {
    let tmp = {}, formJson = [].concat(store.getState().formJson);
    switch (name) {
      case 'Input':
        formJson.forEach((item) => {
          if (item.type === 'SearchArea' && item.attrs.rows * item.attrs.columns === item.children.length) { message.error('搜索区域已满'); return; }
          if (item.type === 'SearchArea' && item.attrs.rows * item.attrs.columns !== item.children.length) { 
            let length = item.children.length;
            if (length > 0) {
              length = ++item.children[length - 1]['attrs']['id'].split('-')[2]
            }
            tmp = { 
              type: name, 
              attrs: {
                id: `searchArea-input-${length}`,
                formType: 'input',
                value: '',
                label: 'label',
                disabled: false
              },
              children: [] 
            };
            item.children.push(tmp); 
          }
        });
        store.dispatch(updateFormJson(formJson));
        break;
      case 'Select':
        formJson.forEach((item) => {
          if (item.type === 'SearchArea' && item.attrs.rows * item.attrs.columns === item.children.length) { message.error('搜索区域已满'); return; }
          if (item.type === 'SearchArea' && item.attrs.rows * item.attrs.columns !== item.children.length) { 
            let length = item.children.length;
            if (length > 0) {
              length = ++item.children[length - 1]['attrs']['id'].split('-')[2]
            }
            tmp = { 
              type: name, 
              attrs: {
                id: `searchArea-select-${length}`,
                formType: 'select',
                value: '',
                label: 'label',
                options: 'option1:option1\noption2:option2\noption3:option3',
                disabled: false
              },
              children: [] 
            };
            item.children.push(tmp); 
          }
        });
        store.dispatch(updateFormJson(formJson));
        break; 
    }
  }
  render () {
    const { connectDropTarget, isOver, canDrop } = this.props;
    return connectDropTarget(
      <div id={this.props.id} style={searchAreaStyle}>
        {this.props.children}
        {isOver && canDrop && <div style={bgGreen}></div>}
        {isOver && !canDrop && <div style={bgRed}></div>}
      </div>
    );
  }
}

export default DropTarget(ItemTypes.CONTAINER, dropTarget, dropCollect)(SearchAreaTarget);