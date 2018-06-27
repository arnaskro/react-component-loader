import React, { Component } from 'react';
import PropTypes from 'prop-types';
import script from 'scriptjs';
import { Provider } from 'react-redux';

// load remote component and return it when ready
// display current children while loading 
class ReactModuleImport extends Component {
  state = {
    Store: null,
    Component: null,
    error: null
  }

  componentDidMount() {
    // expose React for UMD build
    if (typeof(window.React) === 'undefined')
      window.React = React;

    // async load of remote UMD component
    script(this.props.url, () => {
      let target = window[this.props.name];

      if (target.component && target.store) {
        let { component, store } = target;

        if (component.__esModule) {
          component = component.default;
        }

        // loaded OK
        this.setState({
          error: null,
          Component: component,
          Store: store
        });
      } else {
        // loaded fail
        this.setState({
          error: `Cannot load component ${this.props.name} at ${this.props.url}`,
          Component: null
        });
      }
    });
  }

  render() {
    if (this.state.Component) {
      return <Provider store={this.state.Store} ><this.state.Component {...this.props.props || {} } /></Provider>;
    } else if (this.state.error) {
      return <div>{ this.state.error }</div>;
    } else {
      return this.props.children;
    }
  }
}

 ReactModuleImport.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  props: PropTypes.object
}

export default  ReactModuleImport;