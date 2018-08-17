import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../store/actions';


const LogoutBtn = (props) => {
  debugger;
  if(!props.auth.user) return false;

  return (
    <Fragment>
      <button onClick={props.logout}>Выйти</button>
    </Fragment>
  )
}


const mapStateToProps = (state) => {
  console.log('mapStateToProps', state);

  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {logout})(LogoutBtn);
