import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../Button/Button';
import './Header.sass';

/**
 * Компонент AdminHeader отображает заголовок страницы с подзаголовком для админки.
 *
 * @returns Компонент заголовка страницы с подзаголовком для админки.
 */
const AdminHeader: React.FC = () => {
  const { logout, token } = useAuth();
  const location = useLocation();
  const handleLogout = () => {
    logout();
  };
  return (
    <header className="page-header">
      <div className="page-header__logo">
        <h1 className="page-header__title">
          <Link to="/admin/">
            Идём<span>в</span>кино
          </Link>
        </h1>
        <span className="page-header__subtitle">Администраторррская</span>
      </div>
      <div className="page-header__buttons">
        <Link to="/" className="button button-accent page-header__button">
          Вход на сайт
        </Link>
        {token !== null && location.pathname === '/admin/admin' && (
          <Button type="accent" onClick={handleLogout}>
            Выйти
          </Button>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
