import React, { Component } from 'react';
import store from '../../redux/store';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css'; 

const options = {
  lineNumbers: true,                      //显示行号  
  mode: {name: "text/javascript"},        //定义mode  
  extraKeys: {"Ctrl": "autocomplete"},    //自动提示配置  
  theme: "monokai",                       //选中的theme  
  readOnly: true                          //只读
};

const funs = [
  {funName: 'handleClick()', funBody: 'console.log("i am handleClick")'},
  {funName: 'handleChange()', funBody: 'console.log("i am handleChange")'},
  {funName: 'handleSubmit()', funBody: 'console.log("i am handleSubmit")'}
];

let doms = ``;

funs.forEach(item => {
   doms += `${item.funName} {
    ${item.funBody}
  }
  `
});

const code = `import React, { Component } from "react";

class ReactComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }
  ${doms}
  render () {
    return (
      <div>hello world</div>
    )
  }
}
`

class Code extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }
  showCode = () => {
    let code = 'a\nb';
    return code;
  }
  render () {
    return (
      <div>
        <CodeMirror ref="codemirror" value={code} options={options} />
      </div>
    );
  }
}

export default Code;