import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { openPopup } from '../store/actions';
import LogoutBtn from './LogoutBtn';

const UserHead = (props) => {
  const onAuthClick = (e) => {

    import(`./forms/${e.target.dataset.form}`).then((module) => {
      props.openPopup(module.default);
    })
  }

  if(props.auth.user) {
    return (
      <Fragment>
        <div className="nav__user">
          <div className="nav__user-item">
            <span className="nav__user-text">Здравствуйте, {props.auth.user.email}</span>
          </div>
          <div className="nav__user-item">
            <LogoutBtn />
          </div>
        </div>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <span className="nav__btn" onClick={onAuthClick} data-form='AuthForm'>Войти</span>{' / '}
        <span className="nav__btn" onClick={onAuthClick} data-form='RegForm'>Зарегистрироваться</span>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { openPopup })(UserHead);
