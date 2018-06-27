import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../config/config'

const canvasTarget = {
};

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
    // isOver: monitor.isOver(),
    // canDrop: monitor.canDrop()
  }
}

class Canvas extends Component {
  // constructor (props) {
  //   super(props);
  // }
  render () {
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div style={{ display: 'relative', flex: 1, margin: '0 15px 0 0', border: '1px dashed red', overflowY: 'auto' }}>
      </div>
    );
  }
}

export default DropTarget(ItemTypes.DRAGFORM, canvasTarget, collect)(Canvas);