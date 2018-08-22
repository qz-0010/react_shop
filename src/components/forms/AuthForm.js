import React from 'react';
import { connect } from 'react-redux';
import wrapForm from '../HOC/wrapForm';
import Input from '../Input';
import { authorize, openPopup, closePopup } from '../../store/actions';
// import RegForm from './RegForm';

const Auth = (props) => {
  if (props.auth.user) return false;

  const _onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = props.formState.inputs;

    props.validateForm();

    if(!props.formState.valid) return

    props.authorize({
      email: email.value,
      password: password.value
    }).then((res) => {
      if(!res.data) return;

      props.closePopup();
    });
  };

  const onRegBtnClick = () => {
    // props.openPopup()
  }

  return (
    <form className="form" action="/login" method="POST" onSubmit={_onSubmit} noValidate>
      <h4 className="form__title">Авторизация:</h4>
      <div className="form__row">
        <Input
          className="form__input"
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
          className="form__input"
          onChange={props.onInputChange}
          onInit={props.onInputInit}
          type="password"
          name="password"
          placeholder="password"
          required
        />
      </div>
      <div className="form__row"><input type="submit" className="btn btn_rounded btn_middle-sz"/></div>
      <footer className="form__footer">
        <span className="link">Зарегистрироваться</span>
      </footer>
    </form>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { authorize, openPopup, closePopup })(wrapForm(Auth));
