import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AuthForm from '../forms/AuthForm';
import AddGood from './AddGood';
import qs from 'qs';
import { connect } from 'react-redux';
import { authorize } from '../../store/actions';

class Admin extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    // this.props.authorize();
  }

  render() {
    return (
      <div>
        <AuthForm />
        <AddGood />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    console.log('mapStateToProps', state);

    return {
      auth: state.auth
    }
}

export default connect(mapStateToProps, {authorize})(Admin);