import React, { Component } from 'react';
import store from '../../redux/store';
import { connect } from 'react-redux';
import { Button, Form, Input, Select, Table, Row, Col } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const formElementsMap = {
  Input,
  Select
}
const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 16 }
}

class Preview extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
    console.log('componentDidMount')
  }
  componentDidUpdate () {
    console.log('componentDidUpdate')
  }
  stringBecomeArray = (num) => {
    let arr = []
    for (let i = 0; i < num; i++) {
      arr[i] = i + 1
    }
    return arr;
  }
  tableColumns (cols) {
    let columns = [];
    cols.split('-').forEach((item, index) => {
      let column = {
        title: item,
        key: index + ''
      }
      columns.push(column)
    })
    return columns;
  }
  showPreview () {
    var formJson = store.getState().formJson;
    if (formJson.length) {
      return formJson.map(container => {
        if (container.type === 'ButtonArea') {
          return (<div>
            {container.children.map(child => {
              return <Button size={child.attrs.size} type={child.attrs.type} style={{marginRight: '10px'}}>{child.attrs.value}</Button>
            })}
          </div>)
        } else if (container.type === 'TableArea') {
          return (<div>
            <Table columns={this.tableColumns(container.attrs.columns)}></Table>
          </div>)
        } else if (container.type === 'SearchArea') {
          return (<div>
            {this.stringBecomeArray(container.attrs.rows).map((row, rowIndex) => {
              return <Row key={rowIndex}>
                {this.stringBecomeArray(container.attrs.columns).map((column, colIndex) => {
                  const index = container.attrs.columns * rowIndex + colIndex;
                  // const formType = container.children[index] ? formElementsMap[container.children[index].type] : null;
                  const formElement = container.children[index]
                  if (formElement && formElement.type === 'Input') {
                    return <Col span={24 / container.attrs.columns} key={colIndex}>
                      <FormItem {...formItemLayout} label={formElement.attrs.label}>
                        <Input value={formElement.attrs.value} />
                      </FormItem>
                    </Col>
                  } else if (formElement && formElement.type === 'Select') {
                    return <Col span={24 / container.attrs.columns} key={colIndex}>
                      <FormItem {...formItemLayout} label={formElement.attrs.label}>
                        <Select value={formElement.attrs.value}>
                          {formElement.attrs.options.map(options => 
                            <Option value={options.value}>{options.label}</Option>
                          )}
                        </Select>
                      </FormItem>
                    </Col>
                  }
                  // return <Col span={24 / container.attrs.columns} key={colIndex}>{FormElement ? <FormElement {...container.children[index].attrs} /> : null}</Col>                  
                })}
              </Row>
            })}
          </div>)
        }
      })
    } else {
      return <div>null</div>
    }
  }
  render () {
    return (
      <div>
        {this.showPreview()}
      </div>
    )
  }
}

let PreviewComponent = connect(state => state)(Preview);

export default PreviewComponent;
