/**
 * Created by pingfengafei on 2/28/17.
 */
import from 'react';

function ppHOC(WrappedComponent) {
  //do proxy
  
  return class PP extends React.Component {
    render() {
      const newProps = {
        aaa: 123
      };
      return <WrappedComponent {...this.props}/>;
    }
  }