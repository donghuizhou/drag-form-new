import React, { Component } from 'react';
import { Form, Input, Select, Button } from 'antd';
import store from '../../redux/store';
import { updateFuncs } from '../../redux/actions';

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

class Code extends Component {
  constructor (props) {
    super(props);
    this.state = {
      funcs: store.getState().funcs,
      funName: store.getState().funcs.length ? store.getState().funcs[0].name : '',
      funCont: store.getState().funcs.length ? store.getState().funcs[0].cont : ''
    };
  }
  funNameChange = (e) => {
    let newCont = '';
    this.state.funcs.forEach(item => {
      if (item.name === e) { 
        newCont = item.cont;
      }
    })
    this.setState({
      funName: e,
      funCont: newCont
    });
  }
  funContChange = (e) => {
    this.setState({
      funCont: e.target.value
    });
  }
  handleSubmit = () => {
    let funcs = [].concat(store.getState().funcs);
    funcs.forEach(item => {
      if (item.name === this.state.funName) {
        item.cont = this.state.funCont;
      }
    });
    store.dispatch(updateFuncs(funcs));
  }
  render () {
    const formItemSelect = {
      labelCol: { span: 4 },
      wrapperCol: { span: 12 }
    };
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    };
    const tailFormItemLayout = {
      wrapperCol: { offset: 16, span: 8 }
    };
    return (
      <div>
        <Form>
          <FormItem {...formItemSelect} label="方法名">
            <Select value={this.state.funName}
              onChange={this.funNameChange}>
              {this.state.funcs.map(item => 
                <Option value={item.name}>{item.name}</Option>
              )}
            </Select>
          </FormItem>
          <FormItem {...formItemLayout} label="代码">
            <TextArea onChange={this.funContChange} value={this.state.funCont} rows={10} />
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button onClick={this.props.closeCode}>取消</Button>&nbsp;
            <Button onClick={this.handleSubmit} type="primary">提交</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

// let CodeComponent = connect(state => state)(Code);

export default Code;

// import CodeMirror from 'react-codemirror';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/monokai.css'; 

// const options = {
//   lineNumbers: true,                      //显示行号  
//   mode: {name: "text/javascript"},        //定义mode  
//   extraKeys: {"Ctrl": "autocomplete"},    //自动提示配置  
//   theme: "monokai",                       //选中的theme  
//   readOnly: true                          //只读
// };

// const funs = [
//   {funName: 'handleClick()', funBody: 'console.log("i am handleClick")'},
//   {funName: 'handleChange()', funBody: 'console.log("i am handleChange")'},
//   {funName: 'handleSubmit()', funBody: 'console.log("i am handleSubmit")'}
// ];

// let doms = ``;

// funs.forEach(item => {
//    doms += `${item.funName} {
//     ${item.funBody}
//   }
//   `
// });

// const code = `import React, { Component } from "react";

// class ReactComponent extends Component {
//   constructor (props) {
//     super(props);
//     this.state = {};
//   }
//   ${doms}
//   render () {
//     return (
//       <div>hello world</div>
//     )
//   }
// }
// `

// class Code extends Component {
//   constructor (props) {
//     super(props);
//     this.state = {
//     };
//   }
//   showCode = () => {
//     let code = 'a\nb';
//     return code;
//   }
//   render () {
//     return (
//       <div>
//         {/* <CodeMirror ref="codemirror" value={code} options={options} /> */}
//       </div>
//     );
//   }
// }

// export default Code;