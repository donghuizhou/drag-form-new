import React, { Component } from 'react';
import { Button } from 'antd';
import './buttonStyle.css';
import store from '../../../redux/store';
import { updateCurActiveItem, updateCurActiveTab } from '../../../redux/actions';

class ButtonEntity extends Component {
  buttonWrapClick = (e) => {
    let attributes = {...this.props};
    store.dispatch(updateCurActiveTab('component-config'));
    store.dispatch(updateCurActiveItem(attributes));
  }
  render () {
    return (
      <div className="buttonWrap" onClick={this.buttonWrapClick}>
        <Button 
          id={this.props.id}
          type={this.props.type}
          size={this.props.size}
        >
          {this.props.value}
        </Button>
        <div className="buttonMask"></div>
      </div>
    );
  }
}

export default ButtonEntity;