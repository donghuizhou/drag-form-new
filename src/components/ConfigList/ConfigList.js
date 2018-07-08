import React, { Component } from 'react';
import store from '../../redux/store';
import { updateFormJson, updateCurActiveTab } from '../../redux/actions';
import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button, Radio } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class ConfigList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formValues: {
        ...store.getState().curActiveItem
      }
    }
  }
  handleChange (val, type, e) {
    let formValues = Object.assign({}, this.state.formValues);
    formValues[val] = type === 'input' ? e.target.value : e;
    this.setState({
      formValues: formValues
    });
  }
  handleSubmit = () => {
    let formJson = [].concat(store.getState().formJson);
    formJson.forEach(container => {
      if (container.type === 'ButtonArea') {
        container.children.forEach(child => {
          if (child.attrs.id === this.state.formValues.id) {
            child.attrs = Object.assign({}, child.attrs, this.state.formValues)
          }
        })
      }
    })
    store.dispatch(updateFormJson(formJson));
  }
  shouldComponentUpdate () {
    if (this.state.formValues.id !== store.getState().curActiveItem.id) {
      this.setState({
        formValues: {
          ...store.getState().curActiveItem
        }
      })
    }
    return true
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 15 }
    };
    const tailFormItemLayout = {
      wrapperCol: { span: 24, offset: 18 }
    };
    let btnCfg = (      
      <Form>
        <FormItem {...formItemLayout} label="名称" style={{ marginBottom: '5px' }}>
          <Input size="small" value={this.state.formValues.value} onChange={this.handleChange.bind(this, 'value', 'input')} />
        </FormItem>
        <FormItem {...formItemLayout} label="类型" style={{ marginBottom: '5px' }}>
          <Select size="small" value={this.state.formValues.type} onChange={this.handleChange.bind(this, 'type', 'select')}>
            <Option value="primary">primary</Option>
            <Option value="dashed">dashed</Option>
            <Option value="danger">danger</Option>
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label="尺寸" style={{ marginBottom: '5px' }}>
          <Select size="small" value={this.state.formValues.size} onChange={this.handleChange.bind(this, 'size', 'select')}>
            <Option value="default">default</Option>
            <Option value="small">small</Option>
            <Option value="large">large</Option>
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label="点击事件" style={{ marginBottom: '5px' }}>
          <Input size="small" value={this.state.formValues.clickFunName} onChange={this.handleChange.bind(this, 'clickFunName', 'input')} />
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" onClick={this.handleSubmit}>保存</Button>
        </FormItem>
      </Form>
    )
    let inputCfg = (
      <Form>
        <FormItem {...formItemLayout} label="label" style={{ marginBottom: '5px' }}>
          <Input size="small" value={this.state.formValues.label} onChange={this.handleChange.bind(this, 'label', 'input')} />
        </FormItem>
        <FormItem {...formItemLayout} label="值" style={{ marginBottom: '5px' }}>
          <Input size="small" value={this.state.formValues.value} onChange={this.handleChange.bind(this, 'value', 'input')} />
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" onClick={this.handleSubmit}>保存</Button>
        </FormItem>
      </Form>
    )
    let selectCfg = (
      <Form>
        <FormItem {...formItemLayout} label="label" style={{ marginBottom: '5px' }}>
          <Input size="small" value={this.state.formValues.label} onChange={this.handleChange.bind(this, 'label', 'input')} />
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" onClick={this.handleSubmit}>保存</Button>
        </FormItem>
      </Form>
    )
    let tableCfg = (
      <Form>
        <FormItem {...formItemLayout} label="是否显示边框" style={{ marginBottom: '5px' }}>
          <RadioGroup value="Y">
            <Radio value="Y">是</Radio>
            <Radio value="N">否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem {...formItemLayout} label="表格标题" style={{ marginBottom: '5px' }}>
          <Input size="small" value=""/>
        </FormItem>
        <FormItem {...formItemLayout} label="加载动画" style={{ marginBottom: '5px' }}>
          <RadioGroup value="Y">
            <Radio value="Y">是</Radio>
            <Radio value="N">否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem {...formItemLayout} label="是否显示表头" style={{ marginBottom: '5px' }}>
          <RadioGroup value="Y">
            <Radio value="Y">是</Radio>
            <Radio value="N">否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem {...formItemLayout} label="表头名称" style={{ marginBottom: '5px' }}>
          <Input size="small" value=""/>
        </FormItem>
        <FormItem {...formItemLayout} label="一页数据量" style={{ marginBottom: '5px' }}>
          <Input size="small" value=""/>
        </FormItem>
        <FormItem {...formItemLayout} label="是否分页" style={{ marginBottom: '5px' }}>
          <RadioGroup value="Y">
            <Radio value="Y">是</Radio>
            <Radio value="N">否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" onClick={this.handleSubmit}>保存</Button>
        </FormItem>
      </Form>
    )
    let renderView;
    switch (this.state.formValues.formType) {
      case 'button':
        renderView = btnCfg;
        break;
      case 'input':
        renderView = inputCfg;
        break;  
      case 'select':
        renderView = selectCfg;
        break;  
      case 'table':
        renderView = tableCfg;
        break;  
    }
    return (
      <div>
        {renderView}
      </div>
    )
  }
}

const ConfigListForm = Form.create()(ConfigList);

export default ConfigListForm;