import React from 'react';
import { connect } from 'react-redux';
import wrapForm from '../HOC/wrapForm';
import Input from '../Input';
import { register, openPopup, closePopup } from '../../store/actions';

const RegForm = (props) => {
  const _onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = props.formState.inputs;

    props.validateForm();

    if(!props.formState.valid) return

    props.register({
      email: email.value,
      password: password.value
    }).then((res) => {
      if(!res.data.user) return;

      props.closePopup();
    });
  };

  return (
    <form className="form" action="/register" method="POST" onSubmit={_onSubmit} noValidate>
      <h4 className="form__title">Регистрация:</h4>
      <div className="form__row">
        <Input
          autoFocus
          className="form__input form__input_txt"
          onChange={props.onInputChange}
          onInit={props.onInputInit}
          type="text"
          name="email"
          placeholder="email"
          required
        />
      </div>
      <div className="form__row">
        <Input
          className="form__input form__input_txt"
          onChange={props.onInputChange}
          onInit={props.onInputInit}
          type="password"
          name="password"
          placeholder="password"
          required
        />
      </div>
      <div className="form__row"><input type="submit" value="Зарегистрироваться" className="btn btn_action btn_rounded btn_sz-middle"/></div>
    </form>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { register, openPopup, closePopup })(wrapForm(RegForm));
