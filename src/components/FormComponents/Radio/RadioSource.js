import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../../config/config'

const dragSource = {
  beginDrag (props, monitor, component) {
    return {
      name: 'Radio'
    };
  }
}

function dragCollect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource()
  };
}


class RadioSource extends Component {
  render () {
    const { connectDragSource } = this.props;
    return connectDragSource(
      <div className="list-item">单选框</div>
    );
  }
}

export default DragSource(ItemTypes.CONTAINER, dragSource, dragCollect)(RadioSource);