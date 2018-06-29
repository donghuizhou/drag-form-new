import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../../config/config'

const dragSource = {
  beginDrag (props, monitor, component) {
    return {
      name: 'Button'
    };
  }
}

function dragCollect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource()
  };
}


class ButtonSource extends Component {
  render () {
    const { connectDragSource } = this.props;
    return connectDragSource(
      <div className="list-item">按钮</div>
    );
  }
}

export default DragSource(ItemTypes.DRAGFORM, dragSource, dragCollect)(ButtonSource);