import React, { Component } from 'react';
import store from '../../redux/store';
import { updateFormJson, updateCurActiveTab } from '../../redux/actions';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class ConfigList extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('received values from form: ', values);
        let formJson = [].concat(store.getState().formJson);
        formJson.forEach((container) => {
          container.children.forEach((child) => {
            if (child.attrs.id === store.getState().curActiveItem.id) {
              child.attrs = { ...child.attrs, ...values };
            }
          });
        });
        store.dispatch(updateFormJson(formJson));
        store.dispatch(updateCurActiveTab('component-list'))
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 15 }
    };
    const tailFormItemLayout = {
      wrapperCol: { span: 24, offset: 18 }
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="名称" style={{marginBottom: '5px'}}>
          {getFieldDecorator('value', {
            rules: [{
              required: true, message: '请输入名称'
            }],
            initialValue: store.getState().curActiveItem.value ? store.getState().curActiveItem.value : ''
          })(
            <Input size="small" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="类型" style={{marginBottom: '5px'}}>
          {getFieldDecorator('type', {
            rules: [{
              required: true, message: '请选择类型'
            }],
            initialValue: store.getState().curActiveItem.type ? store.getState().curActiveItem.type : ''
          })(
            <Select size="small">
              <Option value="primary">primary</Option>
              <Option value="dashed">dashed</Option>
              <Option value="danger">danger</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="尺寸" style={{marginBottom: '5px'}}>
          {getFieldDecorator('size', {
            rules: [{
              required: true, message: '请选择尺寸'
            }],
            initialValue: store.getState().curActiveItem.size ? store.getState().curActiveItem.size : ''
          })(
            <Select size="small">
              <Option value="default">default</Option>
              <Option value="small">small</Option>
              <Option value="large">large</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="点击事件" style={{marginBottom: '5px'}}>
          {getFieldDecorator('clickFunName', {
            rules: [{
              required: true, message: '请输入点击事件名称'
            }],
            initialValue: store.getState().curActiveItem.clickFunName ? store.getState().curActiveItem.clickFunName : ''
          })(
            <Input size="small" />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">保存</Button>
        </FormItem>
      </Form>
    )
  }
}

const ConfigListForm = Form.create()(ConfigList);

export default ConfigListForm;
 
{/* <Row>
<Col span={18}>
  <Input size="small" />
</Col>
<Col offset={2} span={4}>
  <Tooltip title="编码">
    <Button type="primary" icon="code-o"/>
  </Tooltip>
</Col>
</Row> */}