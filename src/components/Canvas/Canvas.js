import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../config/config'
import { Input, Select, Button, Modal, Form, Row, Col, Table, message } from 'antd';
import store from '../../redux/store';
import { updateFormJson } from '../../redux/actions';
// 容器组件的Target
import SearchAreaTarget from '../Containers/SearchArea/SearchAreaTarget';
import ButtonAreaTarget from '../Containers/ButtonArea/ButtonAreaTarget';
// 表单组件的实例
import TableEntity from '../Containers/TableArea/TableAreaEntity';
import ButtonEntity from '../FormComponents/Button/ButtonEntity';

const FormItem = Form.Item;

// let unsubscribe = store.subscribe((fun) => (fun()))

const canvasTarget = {
  drop (props, monitor, component) {
    const { name } = monitor.getItem();
    component.receiveDropName(name);
  }
};

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
    // isOver: monitor.isOver(),
    // canDrop: monitor.canDrop()
  }
}

class Canvas extends Component {
  constructor (props) {
    super(props);
    this.state = {
      formJson: [],
      rows: '',
      columns: '',
      gridModalVisible: false
    }
  }
  receiveDropName = (name) => {
    let tmp = {}, formJson = store.getState().formJson;
    switch (name) {
      case 'SearchAreaSource':
        for (let i in formJson) {
          if (formJson[i].type === 'SearchArea') { message.error('已存在搜索区域'); return; }
        }
        this.setState({columns: '', rows: '', gridModalVisible: true});
        break;
      case 'ButtonAreaSource': 
        for (let i in formJson) {
          if (formJson[i].type === 'ButtonArea') { message.error('已存在按钮区域'); return; }
        }
        tmp = { type: 'ButtonArea', attrs: {}, children: [] };
        formJson.push(tmp);
        store.dispatch(updateFormJson(formJson));
        this.setState({formJson: formJson});
        break;
      case 'TableAreaSource':
        for (let i in formJson) {
          if (formJson[i].type === 'TableArea') { message.error('已存在表格区域'); return; }
        }
        tmp = { type: 'TableArea', attrs: {}, children: [] };
        formJson.push(tmp);
        store.dispatch(updateFormJson(formJson));
        this.setState({formJson: formJson});
        break;  
      case 'Button':
        tmp = { type: 'Button', attrs: {}, children: [] };
        formJson.forEach((item) => {
          if (item.type === 'ButtonArea') { item.children.push(tmp); }
        });
        store.dispatch(updateFormJson(formJson));
        this.setState({formJson: formJson});
        break;  
    }
  }
  rowsChange = (e) => {
    this.setState({rows: e.target.value});
  }
  columnsChange = (e) => {
    this.setState({columns: e.target.value});
  }
  handleOk = () => {
    if (24 % this.state.columns !== 0) { message.error('列数必须能被24整除'); return; }
    this.setState({gridModalVisible: false});
    let formJson = store.getState().formJson;
    let tmp = { type: 'SearchArea', attrs: { columns: this.state.columns, rows: this.state.rows }, children: [] }
    formJson.push(tmp);
    store.dispatch(updateFormJson(formJson));
    this.setState({formJson: formJson});
  }
  handleCancel = () => {
    this.setState({gridModalVisible: false});
  }
  stringBecomeArray = (num) => {
    let arr = []
    for (let i = 0; i < num; i++) {
      arr[i] = i + 1
    }
    return arr;
  }
  renderFormJson = () => {
    let doms = this.state.formJson.map((component, index) => (
      component.type === 'ButtonArea' ? 
        <ButtonAreaTarget id={'ButtonArea-' + index} key={index}>
          {component.children.map((child, pos) => (
            child.type === 'Button' ?
              <ButtonEntity name="按钮吧" id={'Button-' + pos} key={pos} /> : null
          ))}
        </ButtonAreaTarget> : 
        component.type === 'TableArea' ? <TableEntity id={'TableArea-' + index} key={index} /> : 
        component.type === 'SearchArea' ? 
        <SearchAreaTarget id={'SearchArea' + index} key={index}>
          {this.stringBecomeArray(component.attrs.rows).map((row, index) => (
            <Row key={index}>
              {this.stringBecomeArray(component.attrs.columns).map((column, index) => (
                <Col span={24 / component.attrs.columns} 
                  style={{background: (row + column) % 2 === 0 ? '#f0f0f0' : '#E6E6FA', height: '40px'}}
                  key={index}>
                  {row}-{column}
                </Col>
              ))}
            </Row>
          ))}
        </SearchAreaTarget> : null 
    ));
    return doms;
  }
  render () {
    const { connectDropTarget } = this.props;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 }
    };
    return connectDropTarget(
      <div style={{ display: 'relative', flex: 1, margin: '0 15px 0 0', border: '1px dashed red', overflowY: 'auto' }}>
        <Modal title="设置栅格布局" visible={this.state.gridModalVisible} onOk={this.handleOk} onCancel={this.handleCancel} cancelText={'取消'} okText={'确定'} >
          <Form layout="inline">
            <FormItem {...formItemLayout} label="行">
                <Input value={this.state.rows} onChange={this.rowsChange} />
            </FormItem>
            <FormItem {...formItemLayout} label="列">
              <Input value={this.state.columns} onChange={this.columnsChange} />
            </FormItem>
          </Form>
        </Modal>
        {this.renderFormJson()}
      </div>
    );
  }
}

export default DropTarget(ItemTypes.DRAGFORM, canvasTarget, collect)(Canvas);