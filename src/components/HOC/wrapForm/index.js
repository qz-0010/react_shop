import React, { Fragment } from 'react';

function wrapForm(WrappedComponent) {
  return class extends React.Component {

    constructor(props) {
      super(props);

      this.onInputChange = this.onInputChange.bind(this);
    }

    state = {
    };

    onInputChange(e) {
      const { name, type, value, checked } = e.target;
      let val;
      const newState = {};

      if(type === 'checkbox' || type === 'radio'){
        val = checked;
      } else {
        val = value;
      }

      newState[name] = val;
      this.setState(newState);
      // console.log('wrapForm', this.state);
    }

    render() {

      return (
        <Fragment>
          <WrappedComponent formState={this.state} onInputChange={this.onInputChange} {...this.props} />
        </Fragment>
      );
    }
  }
}

export default wrapForm;
