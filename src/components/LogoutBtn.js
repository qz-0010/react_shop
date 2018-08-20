import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../store/actions';

const LogoutBtn = (props) => {
  const { auth } = props;
  const { user } = auth;

  if (!user) return false;

  return (
    <Fragment>
      <button type="button" onClick={props.logout}>Выйти</button>
    </Fragment>
  );
};

LogoutBtn.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(LogoutBtn);
