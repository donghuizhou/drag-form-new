import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Button } from 'antd';
import './mainPage.css';
import Canvas from '../Canvas/Canvas';
import SideList from '../SideList/SideList';
import store from '../../redux/store';

class MainPage extends Component {
  showSomething = () => {
    // console.log(store.getState());
  }
  render() {
    return (
      <section className="layout">
        <section className="layout-top">
          <Canvas />
          <SideList />
        </section>
        <footer className="layout-bottom">
          <Button type="primary" className="bottom-btn">预览</Button>
          <Button type="primary" className="bottom-btn">编码</Button>
          <Button type="primary" className="bottom-btn" onClick={this.showSomething}>保存</Button>
        </footer>
      </section>
    );
  }
}

export default DragDropContext(HTML5Backend)(MainPage);