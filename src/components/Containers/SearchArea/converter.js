import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../../config/config';

const searchDragSource = {
  beginDrag (props, monitor, component) {
    return {
      name: 'SearchArea'
    }
  }
};

function dragCollect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource()
  };
}

function SearchAreaConverter (purpose) {
  return function () {
    const NewComponent = class extends Component {
      // constructor (props) {
      //   super(props);
      // }
      render () {
        const { connectDragSource } = this.props;
        let element = null;
        if (this.props.purpose === 'drag') {
          element = connectDragSource(<div className="list-item">搜索区域</div>);
        }
        if (this.props.purpose === 'drop') {
      
        }
        return element;
      }
    }
    return DragSource(ItemTypes.DRAGFORM, searchDragSource, dragCollect)(NewComponent);
  } 
}

export default SearchAreaConverter;