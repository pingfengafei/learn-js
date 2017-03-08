/**
 * Created by pingfengafei on 2/28/17.
 */
function refHOC(WrappedComponent) {
  return class RefsHOC extends React.Component {
    proc(wrappedComponentInstance) {
      //wrappedComponentInstance.method();
    }
    
    render() {
      const props = Object.assign({}, this.props, {ref: this.proc.bind(this)});
      return <WrappedComponent {...props}/>;
    }
  }
}
