import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Button, Modal } from 'antd';
import './mainPage.css';
import Canvas from '../Canvas/Canvas';
import SideList from '../SideList/SideList';
import Code from '../Code/Code';
import Preview from '../Preview/Preview';
import store from '../../redux/store';
import { updateSomething, updateCurActiveTab } from '../../redux/actions';
import { connect } from 'react-redux';

class MainPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      codeVisiable: false,
      previewVisiable: false
    }
  }
  onPreview = () => {
    this.setState({previewVisiable: true})
  }
  onCode = () => {
    this.setState({codeVisiable: true})
  }
  onSave = () => {
    console.log(store.getState());
  }
  handleCodeOk = () => {
    this.setState({codeVisiable: false})
  }
  handleCodeCancel = () => {
    this.setState({codeVisiable: false})
  }
  handlePreviewOk = () => {
    this.setState({previewVisiable: false})
  }
  handlePreviewCancel = () => {
    this.setState({previewVisiable: false})
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
        <Modal title="编码" visible={this.state.codeVisiable} onOk={this.handleCodeOk} onCancel={this.handleCodeCancel}
          cancelText="取消" okText="确定 ">
          <Code />
        </Modal>
        <Modal width={'80%'} title="预览" visible={this.state.previewVisiable} onOk={this.handlePreviewOk} onCancel={this.handlePreviewCancel}
          cancelText="取消" okText="确定 ">
          {this.state.previewVisiable ? <Preview/> : null}
        </Modal>
      </section>
    );
  }
}

let Connected = connect(state => state)(MainPage)

export default DragDropContext(HTML5Backend)(Connected);