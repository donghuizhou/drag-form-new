import React, { Component } from 'react';
import { Button } from 'antd';

const buttonClass = {
  margin: '10px 0 0 10px' 
}

class ButtonEntity extends Component {
  render () {
    return (
      <Button type="primary" style={buttonClass}>按钮</Button>
    );
  }
}

export default ButtonEntity;