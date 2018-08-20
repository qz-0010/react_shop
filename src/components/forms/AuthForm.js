import React from 'react';
import { connect } from 'react-redux';
import wrapForm from '../HOC/wrapForm';
import Input from '../Input';
import { authorize } from '../../store/actions';

const Auth = (props) => {
  if (props.auth.user) return false;

  const _onSubmit = (e) => {
    e.preventDefault();

    props.validateForm();
    props.authorize(props.formState.values);
  };

  return (
    <form action="/login" method="POST" onSubmit={_onSubmit} noValidate>
      <div>
        <Input
          onChange={props.onInputChange}
          onInit={props.onInputInit}
          type="text"
          name="email"
          placeholder="email"
          required
        />
      </div>
      <div>
        <Input
          onChange={props.onInputChange}
          onInit={props.onInputInit}
          type="password"
          name="password"
          placeholder="password"
          required
        />
      </div>
      <div><input type="submit" /></div>
    </form>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { authorize })(wrapForm(Auth));
