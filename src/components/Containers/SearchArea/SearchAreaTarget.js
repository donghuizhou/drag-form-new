import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../config/config';
// import store from '../../../redux/store';
// import { updateCurHoverItem } from '../../../redux/actions';

const dropTarget = {
  // drop () {
  //   console.log('buttonArea drop')
  // },
  // canDrop (props) {
  //   store.dispatch(updateCurHoverItem(props));
  //   // console.log('props: ', props);
  //   return true;
  // }
}
const dropCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
});

class SearchAreaTarget extends Component {
  render () {
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div id={this.props.id}>
        {this.props.children}
      </div>
    );
  }
}

export default DropTarget(ItemTypes.DRAGFORM, dropTarget, dropCollect)(SearchAreaTarget);