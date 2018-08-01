import React, { Component } from 'react';
import store from '../../redux/store';
import { updateFormJson, updateFuncs } from '../../redux/actions';
import { Form, Input, Select, Button, Modal } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

function updateJson (id, newAttr, obj) {
  obj.forEach(item => {
    if(item.attrs.id === id) {
      item.attrs = Object.assign({}, item.attrs, newAttr)
    } else {
      updateJson(id, newAttr, item.children)
    }
  })
}

function delJsonItem (id, obj) {
  obj.forEach((item, index) => {
    if(item.attrs.id === id) {
      obj.splice(index, 1);
    } else {
      delJsonItem(id, item.children);
    }
  });
}

class ConfigList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      formValues: {
        ...store.getState().curActiveItem
      }
    }
  }
  handleOk = () => {
    let id = this.state.formValues.id;
    let formJson = [].concat(store.getState().formJson);
    delJsonItem(id, formJson);
    store.dispatch(updateFormJson(formJson));
    this.setState({visible: false});
  }
  handleCancel = () => {
    this.setState({visible: false});
  }
  handleChange (val, type, e) {
    let formValues = Object.assign({}, this.state.formValues);
    formValues[val] = type === 'input' ? e.target.value : e;
    this.setState({
      formValues: formValues
    });
  }
  handelDel = () => {
    this.setState({visible: true});
  }
  handleSubmit = () => {
    let formJson = [].concat(store.getState().formJson);
    updateJson(this.state.formValues.id, this.state.formValues, formJson)
    if (Object.keys(this.state.formValues).includes('clickFunName')) {
      let funcs = [].concat(store.getState().funcs);
      if (!funcs.some(item => item.name === this.state.formValues.clickFunName)) {
        let fun = { name: this.state.formValues.clickFunName, cont: '' };
        funcs.push(fun);
        store.dispatch(updateFuncs(funcs));
      }
    }
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
      wrapperCol: { span: 24, offset: 12 }
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
          <Button type="danger" onClick={this.handelDel}>删除</Button>&nbsp;
          <Button type="primary" onClick={this.handleSubmit}>保存</Button>
        </FormItem>
      </Form>
    )
    let inputCfg = (
      <Form>
        <FormItem {...formItemLayout} label="label" style={{ marginBottom: '5px' }}>
          <Input size="small" value={this.state.formValues.label} onChange={this.handleChange.bind(this, 'label', 'input')} />
        </FormItem>
        <FormItem {...formItemLayout} label="是否禁用" style={{ marginBottom: '5px' }}>
          <Select size="small" value={this.state.formValues.disabled} onChange={this.handleChange.bind(this, 'disabled', 'select')}>
            <Option value={true}>是</Option>
            <Option value={false}>否</Option>
          </Select>
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="danger" onClick={this.handelDel}>删除</Button>&nbsp;
          <Button type="primary" onClick={this.handleSubmit}>保存</Button>
        </FormItem>
      </Form>
    )
    let selectCfg = (
      <Form>
        <FormItem {...formItemLayout} label="label" style={{ marginBottom: '5px' }}>
          <Input size="small" value={this.state.formValues.label} onChange={this.handleChange.bind(this, 'label', 'input')} />
        </FormItem>
        <FormItem {...formItemLayout} label="下拉选项" style={{ marginBottom: '5px' }}>
          <TextArea rows={5} value={this.state.formValues.options} onChange={this.handleChange.bind(this, 'options', 'input')} />
        </FormItem>
        <FormItem {...formItemLayout} label="是否禁用" style={{ marginBottom: '5px' }}>
          <Select size="small" value={this.state.formValues.disabled} onChange={this.handleChange.bind(this, 'disabled', 'select')}>
            <Option value={true}>是</Option>
            <Option value={false}>否</Option>
          </Select>
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="danger" onClick={this.handelDel}>删除</Button>&nbsp;
          <Button type="primary" onClick={this.handleSubmit}>保存</Button>
        </FormItem>
      </Form>
    )
    let tableCfg = (
      <Form>
        <FormItem {...formItemLayout} label="列名(用-隔开)" style={{ marginBottom: '5px' }}>
          <Input size="small" value={this.state.formValues.columns} onChange={this.handleChange.bind(this, 'columns', 'input')} />
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="danger" onClick={this.handelDel}>删除</Button>&nbsp;
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
        <Modal title="提示" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          确认删除该组件？  
        </Modal>
        {renderView}
      </div>
    )
  }
}

const ConfigListForm = Form.create()(ConfigList);

export default ConfigListForm;