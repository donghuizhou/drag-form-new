import React, { Component } from 'react';
import { Input, Form } from 'antd';
import './inputStyle.css';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 14 }
}

class InputEntity extends Component {
  render () {
    return (
      <div className="inputWrap">
        <FormItem {...formItemLayout} label="出生日期">
          <Input value="value" />
        </FormItem>
        <div className="inputMask"></div>
      </div>
    );
  }
}

export default InputEntity;