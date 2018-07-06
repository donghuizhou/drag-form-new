import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { ItemTypes } from '../config/config'
import { Input, Modal, Form, Row, Col, message } from 'antd';
import store from '../../redux/store';
import { updateFormJson } from '../../redux/actions';
import InnerView from './InnerView';
// 容器组件的Target
// import SearchAreaTarget from '../Containers/SearchArea/SearchAreaTarget';
// import ButtonAreaTarget from '../Containers/ButtonArea/ButtonAreaTarget';
// // 表单组件的实例
// import TableEntity from '../Containers/TableArea/TableAreaEntity';
// import ButtonEntity from '../FormComponents/Button/ButtonEntity';
// import InputEntity from '../FormComponents/Input/InputEntity';

// const componentsMap = {
//   ButtonArea: ButtonAreaTarget,
//   SearchArea: SearchAreaTarget,
//   TableArea: TableEntity,
//   Button: ButtonEntity,
//   Input: InputEntity
// }

const FormItem = Form.Item;

const canvasTarget = {
  drop (props, monitor, component) {
    const { name } = monitor.getItem();
    component.receiveDropName(name);
  }
};

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

class Canvas extends Component {
  constructor (props) {
    super(props);
    this.state = {
      // formJson: [].concat(store.getState().formJson),
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
        tmp = { type: name, attrs: {}, children: [] };
        formJson.push(tmp);
        store.dispatch(updateFormJson(formJson));
        break;  
      case 'Button':
        formJson.forEach((item) => {
          if (item.type === 'ButtonArea') {
            let length = item.children.length;
            if (length > 0) {
              length = ++item.children[length - 1]['attrs']['id'].split('-')[2]
            }
            tmp = { 
              type: name, 
              attrs: {
                id: `buttonArea-button-${length}`,
                value: ['按钮', 'btn'][parseInt(Math.random()*2, 10)],
                type: ['primary', 'dashed', 'danger'][parseInt(Math.random()*3, 10)],
                size: ['default', 'small', 'large'][parseInt(Math.random()*3, 10)],
                clickFunName: ['clickFun', 'changeName'][parseInt(Math.random()*2, 10)]
              },
              children: [] 
            };
            item.children.push(tmp); 
          }
        });
        store.dispatch(updateFormJson(formJson));
        break;  
      case 'Input':
        tmp = { type: name, attrs: {}, children: [] };
        formJson.forEach((item) => {
          if (item.type === 'SearchArea' && item.attrs.rows * item.attrs.columns === item.children.length) { message.error('搜索区域已满'); return; }
          if (item.type === 'SearchArea' && item.attrs.rows * item.attrs.columns !== item.children.length) { item.children.push(tmp); }
        });
        store.dispatch(updateFormJson(formJson));
        break;
    }
    // this.renderFormJson();
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
    // this.renderFormJson();
  }
  handleCancel = () => {
    this.setState({gridModalVisible: false});
  }
  // renderFormJson = (formJson) => {
  //   let doms = store.getState().formJson.map((component, comIndex) => (
  //     component.type === 'ButtonArea' ? 
  //       <ButtonAreaTarget id={'ButtonArea-' + comIndex} key={comIndex}>
  //         {component.children.map((child, pos) => (
  //           child.type === 'Button' ?
  //             <ButtonEntity {...child.attrs} key={pos} /> : null
  //         ))}
  //       </ButtonAreaTarget> : 
  //       component.type === 'TableArea' ? <TableEntity id={'TableArea-' + comIndex} key={comIndex} /> : 
  //       component.type === 'SearchArea' ? 
  //       <SearchAreaTarget id={'SearchArea' + comIndex} key={comIndex}>
  //         {this.stringBecomeArray(component.attrs.rows).map((row, rowIndex) => (
  //           <Row key={rowIndex}>
  //             {this.stringBecomeArray(component.attrs.columns).map((column, colIndex) => {
  //               const index = component.attrs.columns * rowIndex + colIndex;
  //               const FormElement = component.children[index] ? componentsMap[component.children[index].type] : null;
  //               return <Col span={24 / component.attrs.columns} 
  //                 style={{background: (row + column) % 2 === 0 ? '#f0f0f0' : '#E6E6FA', height: '40px'}}
  //                 key={colIndex}>
  //                   {FormElement ? <FormElement /> : null}
  //                 </Col>
  //             })}
  //           </Row>
  //         ))}
  //       </SearchAreaTarget> : null
  //   ));
  //   this.setState({formJson: doms});
  // }
  render () {
    const { connectDropTarget } = this.props;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 }
    };
    return connectDropTarget(
      <div style={{ display: 'relative', flex: 1, margin: '0 15px 0 0', border: '1px dashed #BEBEBE', overflowY: 'auto' }}>
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
      </div>
    );
  }
}

export default DropTarget(ItemTypes.DRAGFORM, canvasTarget, collect)(Canvas);