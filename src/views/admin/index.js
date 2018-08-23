import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Nav from '../../components/layout/Nav';
import AuthForm from '../../components/forms/AuthForm';
import AddGoodForm from '../../components/forms/AddGoodForm';
import { authorize } from '../../store/actions';
import Layout from './Layout';

const Admin = () => (
  <Layout>
    <AddGoodForm />
  </Layout>
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { authorize })(Admin);
