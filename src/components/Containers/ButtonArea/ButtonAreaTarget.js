import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../config/config';
import store from '../../../redux/store';
import { updateFormJson } from '../../../redux/actions';
import './buttonArea.css';

const dropTarget = {
  drop (props, monitor, component) {
    if (monitor.canDrop()) {
      component.renderComponent(monitor.getItem().name);
    }
  },
  canDrop (props, monitor) {
    return monitor.getItem().name === 'Button';
  }
}
const dropCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
});


const buttonAreaClass = {
  position: 'relative',
  background: '#FFE4C4',
  padding: '0 0 10px 0',
  minHeight: '50px',
  border: '1px dashed #BEBEBE',
  borderWidth: '1px 0 1px 0'
};
const bgGreen = {  background: 'green', opacity: '0.5', position: 'absolute', top: '0', right: '0', bottom: '0', left: '0' };
const bgRed = {  background: 'red', opacity: '0.5', position: 'absolute', top: '0', right: '0', bottom: '0', left: '0' };

class SearchAreaTarget extends Component {
  renderComponent (name) {
    let tmp = {}, formJson = [].concat(store.getState().formJson);
    formJson.forEach((item) => {
      if (item.type === 'ButtonArea') {
        let length = item.children.length;
        if (length > 0) {
          length = ++item.children[length - 1]['attrs']['id'].split('-')[2]
        }
        tmp = { 
          type: name, 
          attrs: {
            id: `buttonArea-button-${length}`,
            formType: 'button',
            value: '按钮',
            type: 'primary',
            size: 'default',
            clickFunName: 'clickFun'
          },
          children: [] 
        };
        item.children.push(tmp); 
      }
    });
    store.dispatch(updateFormJson(formJson));
  }
  render () {
    const { connectDropTarget, isOver, canDrop } = this.props;
    return connectDropTarget(
      <div id={this.props.id} style={buttonAreaClass}>
        {this.props.children}
        {isOver && canDrop && <div style={bgGreen}></div>}
        {isOver && !canDrop && <div style={bgRed}></div>}
      </div>
    );
  }
}

export default DropTarget(ItemTypes.CONTAINER, dropTarget, dropCollect)(SearchAreaTarget);