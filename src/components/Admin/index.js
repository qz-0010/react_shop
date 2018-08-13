import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Auth from './Auth';
import AddGood from './AddGood';

class Admin extends Component {

  onAddGoodSubmit(formState) {
    // axios.post
    console.log('formState', formState);
  }

  onAuthSubmit() {

  }

  render() {
    return (
      <div>
        <Auth onSubmit={this.onAuthSubmit} />
        <AddGood onSubmit={this.onAddGoodSubmit} />
      </div>
    );
  }
}

Admin.propTypes = {};

export default Admin;
