import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutBtn from '../LogoutBtn';
import UserHead from '../UserHead';


const Nav = (props) => {
  const adminLink = () => {
    if(!props.auth.user) return false;

    if(!props.auth.user.admin) return false;
    
    return (
      <li className="nav__item">
        <Link to="/admin" className="nav__link">Админ</Link>
      </li>
    )
  }

  return (
    <nav className="nav">
      <div className="nav__row">
        <div className="nav__head-col">
        </div>
        <div className="nav__head-col">
          <UserHead />
        </div>
      </div>
      <div className="nav__row"></div>
      <ul className="nav__list">
        <li className="nav__item">
          <Link to="/" className="nav__link">React Shop</Link>
        </li>
        <li className="nav__item">
          <Link to="/cart" className="nav__link">Корзина</Link>
        </li>
        <li className="nav__item">
          <Link to="/catalog" className="nav__link">Каталог</Link>
        </li>
        {adminLink()}
        <li className="nav__item">
          <LogoutBtn />
        </li>
      </ul>
    </nav>
  );
}


const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Nav);
