import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  return (
    <nav className="nav">
        <ul className="nav__list">
            <li className="nav__item">
                <Link to="/" className="nav__link">React Shop</Link>
                <Link to="/cart" className="nav__link">Корзина</Link>
                <Link to="/catalog" className="nav__link">Каталог</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Nav;