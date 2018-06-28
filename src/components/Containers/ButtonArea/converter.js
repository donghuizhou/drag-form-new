import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { ItemTypes } from '../../config/config';

let dragOrDrop = 'drag'

const buttonDragSource = {
  beginDrag (props, monitor, component) {
    return {
      name: 'ButtonArea'
    }
  }
};
const dragCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource()
});

const buttonDropTarget = {
}
const dropCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
});

function ButtonAreaConverter (purpose) {
  return function () {
    const NewComponent = class extends Component {
      render () {
        dragOrDrop = this.props.purpose;
        let element;
        if (this.props.purpose === 'drag') {
          const { connectDragSource } = this.props;
          element = connectDragSource(<div className="list-item">按钮区域</div>);
        }
        if (this.props.purpose === 'drop') {
          const { connectDropTarget } = this.props;
          element = connectDropTarget(<div>按钮drop区域</div>);
        }
        return element;
      }
    }
    return dragOrDrop === 'drop' ? 
      DropTarget(ItemTypes.DRAGFORM, buttonDropTarget, dropCollect)(NewComponent) : 
      DragSource(ItemTypes.DRAGFORM, buttonDragSource, dragCollect)(NewComponent);
  }
}

export default ButtonAreaConverter;