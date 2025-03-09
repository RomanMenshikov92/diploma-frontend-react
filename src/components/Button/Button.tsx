import React from 'react';
import './Button.sass';
import { ButtonProps } from '../../interfaces/IProps';

/**
 * Компонент кнопки.
 *
 * @param {ButtonProps} props - Свойства компонента Button.
 * @returns {React.FC} Компонент кнопки.
 */
const Button: React.FC<ButtonProps> = ({ type, onClick, disabled = false, className = '', children }) => {
  const buttonClass = `button ${type === 'accent' ? 'button-accent' : type === 'trash' ? 'button-trash' : 'button-regular'} ${className}`;

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
