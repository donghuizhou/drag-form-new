import React, { Component } from 'react';
import { Button } from 'antd';
import './buttonStyle.css';

class ButtonEntity extends Component {
  render () {
    return (
      <div className="buttonWrap">
        <Button type="primary">{this.props.name}</Button>
        <div className="buttonMask"></div>
      </div>
    );
  }
}

export default ButtonEntity;