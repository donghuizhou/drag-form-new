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
    let columns = [
      { title: 'name', dataIndex: 'name', key: 'name' },
      { title: 'age', dataIndex: 'age', key: 'age' },
      { title: 'city', dataIndex: 'city', key: 'city' }
    ];
    return (
      <div onClick={this.tableWrapClick} class="tableWrap">
        <Table id={this.props.id} columns={columns}></Table>
      </div>
    );
  }
}

export default TableAreaEntity;

[
  {
    type: 'SearchArea',
    attrs: {},
    children: [
      { type: 'input', attrs: {}, children: '' },
      { type: 'input', attrs: {}, children: '' },
      { type: 'input', attrs: {}, children: '' },
      { type: 'select', attrs: {}, children: '' }
    ]
  },
  {
    type: 'ButtonArea',
    attrs: {},
    children: [
      { type: 'button', attrs: {}, children: '' },
      { type: 'button', attrs: {}, children: '' },
      { type: 'button', attrs: {}, children: '' }
    ]
  },
  {
    type: 'TableArea',
    attrs: {},
    children: ''
  }
]