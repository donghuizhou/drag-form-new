import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../../config/config';

const dragSource = {
  beginDrag (props, monitor, component) {
    return {
      name: 'SearchAreaSource'
    }
  }
};
const dragCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource()
});

class SearchArea extends Component {
  render () {
    const { connectDragSource } = this.props;
    return connectDragSource(
      <div className="list-item">搜索区域</div>
    );
  }
}

export default DragSource(ItemTypes.DRAGFORM, dragSource, dragCollect)(SearchArea);