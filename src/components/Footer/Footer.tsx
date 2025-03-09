import React from 'react';
import './Footer.sass';

/**
 * Компонент Footer отображает нижний колонтитул страницы с информацией о дипломной работе.
 *
 * @returns Компонент нижнего колонтитула страницы.
 */
const Footer: React.FC = () => {
  return (
    <footer className="page-footer">
      {/* Текст с информацией о дипломной работе */}
      Нетология. Итоговый проект. Идем в кино. 2025г.
    </footer>
  );
};

export default Footer;
