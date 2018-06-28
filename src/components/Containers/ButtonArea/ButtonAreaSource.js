import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../../config/config';

const dragSource = {
  beginDrag (props, monitor, component) {
    return {
      name: 'ButtonAreaSource'
    }
  }
};
const dragCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource()
});

class ButtonAreaSource extends Component {
  render () {
    const { connectDragSource } = this.props;
    return connectDragSource(
      <div className="list-item">按钮区域</div>
    );
  }
}

export default DragSource(ItemTypes.DRAGFORM, dragSource, dragCollect)(ButtonAreaSource);