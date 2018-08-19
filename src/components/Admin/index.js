import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AuthForm from '../forms/AuthForm';
import AddGood from './AddGood';
import { authorize } from '../../store/actions';

const Admin = () => (
  <div>
    <AuthForm />
    <AddGood />
  </div>
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { authorize })(Admin);
