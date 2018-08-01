import React, { Component } from 'react';
import { Select, Form } from 'antd';
import '../formElement.css';
import store from '../../../redux/store';
import { updateCurActiveItem, updateCurActiveTab } from '../../../redux/actions';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 14 }
}

class SelectEntity extends Component {
  selectWrapClick = (e) => {
    let attributes = {...this.props};
    store.dispatch(updateCurActiveTab('component-config'));
    store.dispatch(updateCurActiveItem(attributes));
  }
  formatOptions = (opts) => {
    let options = opts.split('\n');
    let result = [
      {label: '请选择', value: ''}
    ];
    options.forEach(item => {
      let tmp = {
        label: item.split(':')[1],
        value: item.split(':')[0]
      }
      result.push(tmp);
    })
    return result;
  }
  render () {
    return (
      <div className="inputWrap" onClick={this.selectWrapClick}>
        <FormItem {...formItemLayout} label={this.props.label}>
          <Select value={this.props.value}>
            {this.formatOptions(this.props.options).map(item => 
              <Option value={item.value}>{item.label}</Option>
            )}
          </Select>
        </FormItem>
        <div className="inputMask"></div>
      </div>
    );
  }
}

export default SelectEntity;