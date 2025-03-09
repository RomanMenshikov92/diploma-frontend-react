import React from 'react';
import './Modal.sass';
import Button from '../Button/Button';
import { ModalProps } from '../../interfaces/IProps';

/**
 * Компонент модального окна.
 *
 * @param {ModalProps} props - Свойства компонента Modal.
 * @returns {React.FC} Компонент модального окна.
 */
const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  onSave,
  title,
  message,
  inputPlaceholder,
  inputVisible = true,
  notification = false,
  children,
  textNo = 'Отмена',
  textYes = 'Сохранить',
}) => {
  const [inputValue, setInputValue] = React.useState('');

  /**
   * Обработчик сохранения данных.
   */
  const handleSave = () => {
    if (onSave) {
      onSave(inputValue || '');
    }
    setInputValue('');
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        {message && <p>{message}</p>}
        {inputVisible && !notification && (
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder={inputPlaceholder}
          />
        )}
        {children}
        <div className="modal__buttons">
          {notification ? (
            <Button type="accent" onClick={onClose}>
              OK
            </Button>
          ) : (
            <>
              <Button type="regular" onClick={onClose}>
                {textNo}
              </Button>
              <Button type="accent" onClick={handleSave}>
                {textYes}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
