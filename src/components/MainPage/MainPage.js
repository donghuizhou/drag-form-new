import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Button } from 'antd';
import './mainPage.css';
import Canvas from '../Canvas/Canvas';
import SideList from '../SideList/SideList';
import store from '../../redux/store';
import { updateSomething, updateCurActiveTab } from '../../redux/actions';
import { connect } from 'react-redux';

class MainPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      // timestamp: store.getState().curActiveTab
    }
  }
  onPreview =() => {
    // let curActiveTab = store.getState().curActiveTab === 'component-list' ? 'component-config' : 'component-list';
    // store.dispatch(updateCurActiveTab(curActiveTab))
  }
  onCode = () => {
    // let arr = [
    //   { name: 'last', ts: Date.parse(new Date()) / 1000 },
    //   { name: 'now', ts: Date.parse(new Date()) / 1000 + 222 }
    // ];
    // store.dispatch(updateSomething(arr))
  }
  onSave = () => {
    console.log(store.getState());
  }
  render() {
    return (
      <section className="layout">
        <section className="layout-top">
          <Canvas />
          <SideList />
        </section>
        <footer className="layout-bottom">
          {/* {store.getState().something.map((item, index) => (
            <div>{item.ts}</div>
          ))} */}
          <Button type="primary" className="bottom-btn" onClick={this.onPreview}>预览</Button>
          <Button type="primary" className="bottom-btn" onClick={this.onCode}>编码</Button>
          <Button type="primary" className="bottom-btn" onClick={this.onSave}>保存</Button>
        </footer>
      </section>
    );
  }
}

let Connected = connect(state => state)(MainPage)

export default DragDropContext(HTML5Backend)(Connected);