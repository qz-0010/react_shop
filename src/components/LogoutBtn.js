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
      <span className="btn" onClick={props.logout}><i className="icon">exit_to_app</i></span>
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
