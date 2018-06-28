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


const buttonAreaClass = {
  background: '#FFE4C4',
  padding: '0 0 10px 0',
  minHeight: '50px',
  border: '1px dashed #BEBEBE',
  borderWidth: '1px 0 1px 0'
}

class SearchAreaTarget extends Component {
  render () {
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div id={this.props.id} style={buttonAreaClass}>
        {this.props.children}
      </div>
    );
  }
}

export default DropTarget(ItemTypes.DRAGFORM, dropTarget, dropCollect)(SearchAreaTarget);