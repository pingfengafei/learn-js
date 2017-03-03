/**
 * Created by pingfengafei on 2/28/17.
 */
//import React from 'react';

var React = require('react');
var WrappedComponent = require('./WrappedComponent');

//操作props
function ppHOC(WrappedComponent) {
  return class PP extends React.Component {
    render() {
      console.log('render');
      const newProps = {
        aaa: 123
      };
     // return <WrappedComponent {...this.props} {...newProps}/>;
    }
  }
}

var A = ppHOC(WrappedComponent);
var b = new A();
b.render();
