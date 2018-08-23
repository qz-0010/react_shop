import React from 'react';
import Nav from '../../components/layout/Nav';
import Popup from '../../components/Popup';

const layout = props => (
  <div className="page">
    <div className="admin">
      <Nav />
      <div className="admin__body" style={{ marginTop: '35px' }}>
        <div className="container">
          {props.children}
        </div>
      </div>
      <Popup />
    </div>
  </div>
);

export default layout;
