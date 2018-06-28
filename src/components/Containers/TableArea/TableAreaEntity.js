import React, { Component } from 'react';
import { Table } from 'antd';

class TableAreaEntity extends Component {
  render () {
    let columns = [
      { title: 'name', dataIndex: 'name', key: 'name' },
      { title: 'age', dataIndex: 'age', key: 'age' },
      { title: 'city', dataIndex: 'city', key: 'city' }
    ];
    return (
      <Table id={this.props.id} columns={columns}></Table>
    );
  }
}

export default TableAreaEntity;