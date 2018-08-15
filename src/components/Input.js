import React, { Fragment } from 'react';

const Input = (props) => {

  componentDidMount() {
    props.onIniti(props)
  }

  return (
    <Fragment>
      <input {...props}/>
    </Fragment>
  )
}

export default Input;
