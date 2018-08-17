import React from 'react';
import { Link } from 'react-router-dom';
import LogoutBtn from '../LogoutBtn';

const Nav = (props) => {
  return (
    <nav className="nav">
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
        <li className="nav__item">
          <LogoutBtn />
        </li>
      </ul>
    </nav>
  )
};

export default Nav;