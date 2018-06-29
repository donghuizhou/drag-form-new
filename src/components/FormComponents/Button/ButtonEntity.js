import React, { Component } from 'react';
import { Button } from 'antd';
import './buttonStyle.css';

const buttonWrap = {
  position: 'relative',
  display: 'inline-block',
  margin: '10px 0 0 10px'
}
const buttonMask = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 100
  // border: '1px solid rgb(255, 228, 196)'
}

class ButtonEntity extends Component {
  render () {
    return (
      <div style={buttonWrap} >
        <Button type="primary">{this.props.name}</Button>
        <div style={buttonMask} className="buttonMask"></div>
      </div>
    );
  }
}

export default ButtonEntity;