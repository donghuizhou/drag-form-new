import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../../config/config'

const dragSource = {
  beginDrag (props, monitor, component) {
    return {
      name: 'Select'
    };
  }
}

function dragCollect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource()
  };
}


class SelectSource extends Component {
  render () {
    const { connectDragSource } = this.props;
    return connectDragSource(
      <div className="list-item">选择器</div>
    );
  }
}

export default DragSource(ItemTypes.CONTAINER, dragSource, dragCollect)(SelectSource);