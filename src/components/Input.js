import React, { Fragment } from 'react';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onInit(this.props);
  }

  render() {
    return (
      <Fragment>
        <input {...this.props}/>
      </Fragment>
    );
  }
}
