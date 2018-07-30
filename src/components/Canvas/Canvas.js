import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
// import { connect } from 'react-redux';
import { ItemTypes } from '../config/config'
import { Input, Modal, Form, message } from 'antd';
import store from '../../redux/store';
import { updateFormJson } from '../../redux/actions';
import InnerView from './InnerView';

const FormItem = Form.Item;

const canvasTarget = {
  drop (props, monitor, component) {
    const { name } = monitor.getItem();
    component.receiveDropName(name);
  },
  canDrop (props, monitor) {
    let item = monitor.getItem().name;
    return item === 'SearchArea' || item === 'ButtonArea' || item === 'TableArea';
  }
};

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}

const bgGreen = {  background: 'green', opacity: '0.3', height: '100%' };
const bgRed = {  background: 'red', opacity: '0.3', height: '100%' };

class Canvas extends Component {
  constructor (props) {
    super(props);
    this.state = {
      rows: '',
      columns: '',
      gridModalVisible: false
    }
  }
  receiveDropName = (name) => {
    let tmp = {}, formJson = [].concat(store.getState().formJson);
    switch (name) {
      case 'SearchArea':
        for (let i in formJson) {
          if (formJson[i].type === 'SearchArea') { message.error('已存在搜索区域'); return; }
        }
        this.setState({columns: '', rows: '', gridModalVisible: true});
        break;
      case 'ButtonArea': 
        for (let i in formJson) {
          if (formJson[i].type === 'ButtonArea') { message.error('已存在按钮区域'); return; }
        }
        tmp = { type: name, attrs: {}, children: [] };
        formJson.push(tmp);
        store.dispatch(updateFormJson(formJson));
        break;
      case 'TableArea':
        for (let i in formJson) {
          if (formJson[i].type === 'TableArea') { message.error('已存在表格区域'); return; }
        }
        tmp = { 
          type: name,
          attrs: {
            id: `tableArea`,
            formType: 'table',
            columns: 'column1-column2-column3-column4'
          }, children: [] };
        formJson.push(tmp);
        store.dispatch(updateFormJson(formJson));
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
    let formJson = [].concat(store.getState().formJson);
    let tmp = { type: 'SearchArea', attrs: { columns: this.state.columns, rows: this.state.rows }, children: [] }
    formJson.push(tmp);
    store.dispatch(updateFormJson(formJson));
  }
  handleCancel = () => {
    this.setState({gridModalVisible: false});
  }
  render () {
    const { connectDropTarget, isOver, canDrop } = this.props;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 }
    };
    return connectDropTarget(
      <div style={{ position: 'relative', flex: 1, margin: '0 15px 0 0', border: '1px dashed #BEBEBE', overflowY: 'auto' }}>
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
        <InnerView />
        {isOver && canDrop && <div style={bgGreen}> </div>}
        {isOver && !canDrop && <div style={bgRed}> </div>}
      </div>
    );
  }
}

export default DropTarget(ItemTypes.DRAGFORM, canvasTarget, collect)(Canvas);