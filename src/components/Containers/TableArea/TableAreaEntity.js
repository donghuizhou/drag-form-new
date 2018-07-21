import React, { Component } from 'react';
import { Table, Divider } from 'antd';
import store from '../../../redux/store';
import { updateCurActiveItem, updateCurActiveTab } from '../../../redux/actions';
import './tableStyle.css';

class TableAreaEntity extends Component {
  tableWrapClick = (e) => {
    let attributes = {...this.props};
    store.dispatch(updateCurActiveTab('component-config'));
    store.dispatch(updateCurActiveItem(attributes));
  }
  render () {
    let columns = [];
    this.props.columns.split('-').forEach((item, index) => {
      let column = {
        title: item,
        key: index + ''
      }
      columns.push(column)
    })
    return (
      <div onClick={this.tableWrapClick} className="tableWrap">
        <Table id={this.props.id} columns={columns}></Table>
      </div>
    );
  }
}

export default TableAreaEntity;