import React, { Component } from 'react';
import { Tabs } from 'antd';
import SearchArea from '../Containers/SearchArea/SearchArea';

const TabPane = Tabs.TabPane;

class SideList extends Component {
  render () {
    return (
      <div style={{
        width: '300px',
        border: '1px solid #eee',
        overflowY: 'auto'
      }}>
        <Tabs defaultActiveKey="component-list">
          <TabPane tab="组件列表" key="component-list">
            <section style={{ border: '1px solid #eee', borderWidth: '1px 0 0 0' }}>
              <SearchArea purpose="drag" />
            </section>
            <section style={{ border: '1px solid #eee', borderWidth: '1px 0 0 0', margin: '18px 0 0 0' }}>
              {/* <Input />
              <Select />
              <Button /> */}
            </section>
          </TabPane>
          <TabPane tab="组件配置" key="component-config">组件配置</TabPane>
        </Tabs>
      </div>
    );
  }
}

export default SideList;