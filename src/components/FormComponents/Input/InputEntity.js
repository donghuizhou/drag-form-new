import React, { Component } from 'react';
import { Input, Form } from 'antd';
import '../formElement.css';
import store from '../../../redux/store';
import { updateCurActiveItem, updateCurActiveTab } from '../../../redux/actions';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 14 }
}

class InputEntity extends Component {
  inputWrapClick = (e) => {
    let attributes = {...this.props};
    store.dispatch(updateCurActiveTab('component-config'));
    store.dispatch(updateCurActiveItem(attributes));
  }
  render () {
    return (
      <div className="inputWrap" onClick={this.inputWrapClick}>
        <FormItem {...formItemLayout} label={this.props.label}>
          <Input id={this.props.id} value={this.props.value} />
        </FormItem>
        <div className="inputMask"></div>
      </div>
    );
  }
}

export default InputEntity;