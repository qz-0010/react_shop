import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Auth from './Auth';
import AddGood from './AddGood';
import qs from 'qs';


class Admin extends Component {

  async onAddGoodSubmit(formState) {
    const { title, price } = formState.values;

    if(!formState.valid) return

    axios.post('/admin/good', { title, price }).then(
      (res) => console.log(res),
      (err) => console.log(err)
    )
  }

  onAuthSubmit(formState) {
    debugger;
    const { email, password } = formState.values;

    if(!formState.valid) return

    console.log(qs.stringify({ email, password }));

    axios.post('/login', qs.stringify({ email, password })).then(
      (res) => console.log(res),
      (err) => console.log(err)
    )
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
