import React from 'react';
import { Link } from 'react-router-dom';
import './Header.sass';

/**
 * Компонент Header отображает заголовок страницы с ссылкой на главную страницу.
 *
 * @returns Компонент заголовка страницы.
 */
const Header: React.FC = () => {
  return (
    <header className="page-header">
      <div className="page-header__logo">
        <h1 className="page-header__title">
          <Link to="/">
            Идём<span>в</span>кино
          </Link>
        </h1>
      </div>
      <Link to="/admin/" className="button button-accent page-header__button">
        Вход в админку
      </Link>
    </header>
  );
};

export default Header;
