import React from 'react';
import Nav from '../components/layout/Nav';
import Popup from '../components/Popup';

const layout = (props) => {

  return (
    <div className="page">
      <Nav />
      {props.children}
      <Popup />
    </div>
  )
}

export default layout;
