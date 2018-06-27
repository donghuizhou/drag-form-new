import React, { Component } from 'react';
import SearchAreaConverter from './converter'

let purpose = null;

class SearchArea extends Component {
  // constructor (props) {
  //   super(props);
  // }
  render () {
    purpose = this.props.purpose;
    return (<div></div>);
  }
}

export default SearchAreaConverter(purpose)(SearchArea);