import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { openPopup } from '../store/actions';
import AuthForm from './forms/AuthForm';

const UserHead = (props) => {
  const onBtnClick = () => {
    props.openPopup(AuthForm);
  }

  if(props.auth.user) {
    return (
      <Fragment>
        <span className="nav__text">Здравствуйте, {props.auth.user.email}</span>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <span className="nav__auth-btn" onClick={onBtnClick}>Войти</span>
        <span className="nav__auth-btn" onClick={onBtnClick}>Зарегистрироваться</span>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  popup: state.popup
});

export default connect(mapStateToProps, { openPopup })(UserHead);
