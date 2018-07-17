import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Button, Modal } from 'antd';
import './mainPage.css';
import Canvas from '../Canvas/Canvas';
import SideList from '../SideList/SideList';
import Code from '../Code/Code'
import store from '../../redux/store';
import { updateSomething, updateCurActiveTab } from '../../redux/actions';
import { connect } from 'react-redux';

class MainPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      visible: false
    }
  }
  onPreview = () => {
  }
  onCode = () => {
    this.setState({visible: true})
  }
  onSave = () => {
    console.log(store.getState());
  }
  handleOk = () => {
    this.setState({visible: false})
  }
  handleCancel = () => {
    this.setState({visible: false})
  }
  render() {
    return (
      <section className="layout">
        <section className="layout-top">
          <Canvas />
          <SideList />
        </section>
        <footer className="layout-bottom">
          <Button type="primary" className="bottom-btn" onClick={this.onPreview}>预览</Button>
          <Button type="primary" className="bottom-btn" onClick={this.onCode}>编码</Button>
          <Button type="primary" className="bottom-btn" onClick={this.onSave}>保存</Button>
        </footer>
        <Modal title="编码" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}
          cancelText="取消" okText="确定 ">
          <Code />
        </Modal>
      </section>
    );
  }
}

let Connected = connect(state => state)(MainPage)

export default DragDropContext(HTML5Backend)(Connected);