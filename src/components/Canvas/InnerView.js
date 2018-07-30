import React, { Component } from 'react';
import store from '../../redux/store';
import { connect } from 'react-redux'
import { Row, Col } from 'antd';
// 容器组件的Target
import SearchAreaTarget from '../Containers/SearchArea/SearchAreaTarget';
import ButtonAreaTarget from '../Containers/ButtonArea/ButtonAreaTarget';
// 表单组件的实例
import TableEntity from '../Containers/TableArea/TableAreaEntity';
import ButtonEntity from '../FormComponents/Button/ButtonEntity';
import InputEntity from '../FormComponents/Input/InputEntity';
import SelectEntity from '../FormComponents/Select/SelectEntity';

const componentsMap = {
  ButtonArea: ButtonAreaTarget,
  SearchArea: SearchAreaTarget,
  TableArea: TableEntity,
  Button: ButtonEntity,
  Input: InputEntity,
  Select: SelectEntity
}

class InnerViewBefore extends Component {
  stringBecomeArray = (num) => {
    let arr = []
    for (let i = 0; i < num; i++) {
      arr[i] = i + 1
    }
    return arr;
  }
  render () {
    return (
      <div>
        {store.getState().formJson.map((component, comIndex) => (
          component.type === 'ButtonArea' ? 
            <ButtonAreaTarget id={'ButtonArea-' + comIndex} key={comIndex}>
              {component.children.map((child, pos) => (
                child.type === 'Button' ?
                  <ButtonEntity {...child.attrs} key={pos} /> : null
              ))}
            </ButtonAreaTarget> : 
            component.type === 'TableArea' ? <TableEntity {...component.attrs}  key={comIndex} /> : 
            component.type === 'SearchArea' ? 
            <SearchAreaTarget id={'SearchArea' + comIndex} key={comIndex}>
              {this.stringBecomeArray(component.attrs.rows).map((row, rowIndex) => (
                <Row key={rowIndex}>
                  {this.stringBecomeArray(component.attrs.columns).map((column, colIndex) => {
                    const index = component.attrs.columns * rowIndex + colIndex;
                    const FormElement = component.children[index] ? componentsMap[component.children[index].type] : null;
                    return <Col span={24 / component.attrs.columns} 
                      style={{background: (row + column) % 2 === 0 ? '#f0f0f0' : '#E6E6FA', height: '40px'}}
                      key={colIndex}>
                        {FormElement ? <FormElement {...component.children[index].attrs} /> : null}
                      </Col>
                  })}
                </Row>
              ))}
            </SearchAreaTarget> : null
        ))}
      </div>
    )
  }
}

let InnerView = connect(state => state)(InnerViewBefore)

export default InnerView;