import React, { Component } from 'react';
import { Tabs } from 'antd';
import ConfigList from '../ConfigList/ConfigList';
import store from '../../redux/store'
import { updateCurActiveTab } from '../../redux/actions';
// 容器组件
import SearchAreaSource from '../Containers/SearchArea/SearchAreaSource';
import ButtonAreaSource from '../Containers/ButtonArea/ButtonAreaSource';
import TableAreaSource from '../Containers/TableArea/TableAreaSource';
// 表单组件
import ButtonSource from '../FormComponents/Button/ButtonSource';
import InputSource from '../FormComponents/Input/InputSource';
import SelectSource from '../FormComponents/Select/SelectSource';

const TabPane = Tabs.TabPane;

let prevId = store.getState().curActiveItem.id || 'null'

class SideList extends Component {
  tabChange = (key) => {
    if (key === 'component-list') {
      store.dispatch(updateCurActiveTab(key))
    }
  }
  render () {
    let rerender = false

    return (
      <div style={{ width: '300px', border: '1px solid #eee', overflowY: 'auto' }}>
        <Tabs onChange={this.tabChange} activeKey={store.getState().curActiveTab}>
          <TabPane tab="组件列表" key={"component-list"}>
            <section style={{ border: '1px solid #eee', borderWidth: '1px 0 0 0' }}>
              <SearchAreaSource />
              <ButtonAreaSource />
              <TableAreaSource />
            </section>
            <section style={{ border: '1px solid #eee', borderWidth: '1px 0 0 0', margin: '18px 0 0 0' }}>
              <InputSource />
              <SelectSource />
              <ButtonSource />
            </section>
          </TabPane>
          <TabPane tab="组件配置" key="component-config">
            <ConfigList />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default SideList;