import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Button } from 'antd';
import './mainPage.css';
import Canvas from '../Canvas/Canvas';
import SideList from '../SideList/SideList';
import store from '../../redux/store';
import { connect } from 'react-redux';
import { updateTimeStamp } from '../../redux/actions';

class MainPage extends Component {
  updateTime = () => {
    let ts = Date.parse(new Date()) / 1000;
    store.dispatch(updateTimeStamp(ts))
  }
  showSomething = () => {
    console.log(store.getState());
  }
  render() {
    return (
      <section className="layout">
        <section className="layout-top">
          <Canvas formJson={store.getState().formJson} timeStamp={store.getState().timeStamp} />
          <SideList />
        </section>
        <footer className="layout-bottom">
          <Button type="primary" className="bottom-btn">预览</Button>
          <Button type="primary" className="bottom-btn" onClick={this.updateTime}>编码</Button>
          <Button type="primary" className="bottom-btn" onClick={this.showSomething}>保存</Button>
        </footer>
      </section>
    );
  }
}

let Connected = connect(state => state)(MainPage)

export default DragDropContext(HTML5Backend)(Connected);