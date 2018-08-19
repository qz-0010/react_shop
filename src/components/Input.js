import React, { Component, Fragment } from 'react';

export default class Input extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onInit(this.props);
  }

  render() {
    return (
      <Fragment>
        <input {...this.props} />
      </Fragment>
    );
  }
}
