import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../../config/config'

const dragSource = {
  beginDrag (props, monitor, component) {
    return {
      name: 'Checkbox'
    };
  }
}

function dragCollect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource()
  };
}


class CheckboxSource extends Component {
  render () {
    const { connectDragSource } = this.props;
    return connectDragSource(
      <div className="list-item">多选框</div>
    );
  }
}

export default DragSource(ItemTypes.CONTAINER, dragSource, dragCollect)(CheckboxSource);