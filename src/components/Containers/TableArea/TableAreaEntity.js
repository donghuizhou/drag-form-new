import React, { Component } from 'react';
import { Table } from 'antd';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../config/config';
import store from '../../../redux/store';
import { updateCurActiveItem, updateCurActiveTab } from '../../../redux/actions';
import './tableStyle.css';

const dropTarget = {
  canDrop (props, monitor) {
    return false;
  }
}
const dropCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
});

const tableStyle = { position: 'relative' };
const bgRed = {  background: 'red', opacity: '0.5', position: 'absolute', top: '0', right: '0', bottom: '0', left: '0' };


class TableAreaEntity extends Component {
  tableWrapClick = (e) => {
    let attributes = {...this.props};
    store.dispatch(updateCurActiveTab('component-config'));
    store.dispatch(updateCurActiveItem(attributes));
  }
  render () {
    const { connectDropTarget, isOver, canDrop } = this.props;
    let columns = [];
    this.props.columns.split('-').forEach((item, index) => {
      let column = {
        title: item,
        key: index + ''
      }
      columns.push(column)
    })
    return connectDropTarget(
      <div onClick={this.tableWrapClick} className="tableWrap" style={tableStyle}>
        <Table id={this.props.id} columns={columns}></Table>
        {isOver && !canDrop && <div style={bgRed}></div>}
      </div>
    );
  }
}

export default DropTarget(ItemTypes.CONTAINER, dropTarget, dropCollect)(TableAreaEntity);