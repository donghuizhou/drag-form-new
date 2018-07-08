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
  render () {
    return (
      <div className="inputWrap" onClick={this.selectWrapClick}>
        <FormItem {...formItemLayout} label={this.props.label}>
          <Select value={this.props.value}>
            {this.props.options.map(item => 
              <Option value={item.key}>{item.vlaue}</Option>
            )}
          </Select>
        </FormItem>
        <div className="inputMask"></div>
      </div>
    );
  }
}

export default SelectEntity;