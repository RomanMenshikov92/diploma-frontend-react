import React, { useState, useEffect } from 'react';
import ConfStepWrapper from './ConfStepWrapper/ConfStepWrapper';
import Button from '../Button/Button';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useHalls } from '../../contexts/HallsContext';
import Modal from '../Modal/Modal';
import HallSelector from './HallSelector/HallSelector';

/**
 * Компонент для конфигурации залов.
 *
 * @returns {React.FC} Компонент конфигурации залов.
 */
const ConfigureHalls: React.FC = () => {
  const { halls } = useHalls();
  const [selectedHallId, setSelectedHallId] = useState<number | null>(null);
  const [rows, setRows] = useState(0);
  const [seatsPerRow, setSeatsPerRow] = useState(0);
  const [seats, setSeats] = useState<string[][]>([]);
  const [initialSeats, setInitialSeats] = useState<string[][]>([]);
  const { token } = useAuth();
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    if (halls.length > 0 && selectedHallId === null) {
      setSelectedHallId(halls[0].id);
    }
  }, [halls, selectedHallId]);

  useEffect(() => {
    if (selectedHallId !== null) {
      fetchHallConfiguration(selectedHallId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHallId]);

  /**
   * Получает конфигурацию зала.
   *
   * @param {number} hallId - Идентификатор зала.
   */
  const fetchHallConfiguration = async (hallId: number) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/halls/${hallId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const hallConfig = response.data.seats;

      // Преобразуем конфигурацию зала в двумерный массив
      const newSeats: string[][] = JSON.parse(JSON.stringify(hallConfig)); // Глубокая копия конфигурации зала

      setSeats(newSeats);
      setInitialSeats(JSON.parse(JSON.stringify(newSeats))); // Глубокая копия начального состояния
      setRows(newSeats.length);
      setSeatsPerRow(newSeats[0]?.length || 0);
    } catch (error) {
      console.error('Ошибка при получении конфигурации зала:', error);
    }
  };

  /**
   * Обработчик изменения количества рядов.
   *
   * @param {number} newRows - Новое количество рядов.
   */
  const handleRowsChange = (newRows: number) => {
    setRows(newRows);
    updateSeatsConfiguration(newRows, seatsPerRow);
  };

  /**
   * Обработчик изменения количества мест в ряду.
   *
   * @param {number} newSeatsPerRow - Новое количество мест в ряду.
   */
  const handleSeatsPerRowChange = (newSeatsPerRow: number) => {
    setSeatsPerRow(newSeatsPerRow);
    updateSeatsConfiguration(rows, newSeatsPerRow);
  };

  /**
   * Обновляет конфигурацию мест.
   *
   * @param {number} newRows - Новое количество рядов.
   * @param {number} newSeatsPerRow - Новое количество мест в ряду.
   */
  const updateSeatsConfiguration = (newRows: number, newSeatsPerRow: number) => {
    const newSeats = Array.from({ length: newRows }, (_, rowIndex) =>
      Array.from({ length: newSeatsPerRow }, (_, seatIndex) => {
        if (seats[rowIndex] && seats[rowIndex][seatIndex] !== undefined) {
          return seats[rowIndex][seatIndex];
        }
        return 'standart';
      }),
    );
    setSeats(newSeats);
  };

  /**
   * Обработчик клика по креслу.
   *
   * @param {number} rowIndex - Индекс ряда.
   * @param {number} seatIndex - Индекс места.
   */
  const handleChairClick = (rowIndex: number, seatIndex: number) => {
    const updatedSeats = seats.map((row, rIndex) =>
      row.map((seat, sIndex) => {
        if (rIndex === rowIndex && sIndex === seatIndex) {
          switch (seat) {
            case 'standart':
              return 'vip';
            case 'vip':
              return 'disabled';
            case 'disabled':
              return 'standart';
            default:
              return 'standart';
          }
        }
        return seat;
      }),
    );
    setSeats(updatedSeats);
  };

  /**
   * Обработчик сохранения конфигурации зала.
   */
  const handleSave = async () => {
    if (selectedHallId === null) {
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/halls/${selectedHallId}/config`,
        {
          seats: JSON.stringify(seats),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setNotificationMessage('Конфигурация зала успешно сохранена.');
      setNotificationModalVisible(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setNotificationMessage(error.response.data.message);
      } else {
        setNotificationMessage('Ошибка при сохранении конфигурации зала.');
      }
      setNotificationModalVisible(true);
      console.error('Ошибка при сохранении конфигурации зала:', error);
    }
  };

  /**
   * Обработчик отмены изменений конфигурации зала.
   */
  const handleCancel = () => {
    setSeats(JSON.parse(JSON.stringify(initialSeats))); // Восстанавливаем глубокую копию начального состояния
  };

  return (
    <ConfStepWrapper title="Конфигурация залов">
      <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
      <HallSelector
        halls={halls}
        selectedHallId={selectedHallId}
        setSelectedHallId={setSelectedHallId}
        name="sales-hall"
      />
      <p className="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в ряду:</p>
      <div className="conf-step__legend">
        <label className="conf-step__label">
          Рядов, шт
          <input
            type="number"
            className="conf-step__input"
            value={rows}
            onChange={e => handleRowsChange(Number(e.target.value))}
            placeholder="10"
          />
        </label>
        <span className="multiplier">x</span>
        <label className="conf-step__label">
          Мест, шт
          <input
            type="number"
            className="conf-step__input"
            value={seatsPerRow}
            onChange={e => handleSeatsPerRowChange(Number(e.target.value))}
            placeholder="8"
          />
        </label>
      </div>
      <p className="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
      <div className="conf-step__legend">
        <div className="conf-step__chair-text">
          <span>
            <span className="conf-step__chair conf-step__chair_standart"></span> — обычные кресла
          </span>
          <span>
            <span className="conf-step__chair conf-step__chair_vip"></span> — VIP кресла
          </span>
          <span>
            <span className="conf-step__chair conf-step__chair_disabled"></span> — заблокированные (нет кресла)
          </span>
        </div>
        <p className="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
      </div>
      <div className="conf-step__hall">
        <div className="conf-step__hall-wrapper">
          {seats.map((row, rowIndex) => (
            <div key={rowIndex} className="conf-step__row">
              {row.map((seat, seatIndex) => (
                <span
                  key={seatIndex}
                  className={`conf-step__chair conf-step__chair_${seat}`}
                  onClick={() => handleChairClick(rowIndex, seatIndex)}
                ></span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <fieldset className="conf-step__buttons">
        <Button type="regular" onClick={handleCancel}>
          Отмена
        </Button>
        <Button type="accent" onClick={handleSave}>
          Сохранить
        </Button>
      </fieldset>
      <Modal
        show={notificationModalVisible}
        onClose={() => setNotificationModalVisible(false)}
        title="Уведомление"
        message={notificationMessage}
        inputVisible={false}
        notification={true}
      />
    </ConfStepWrapper>
  );
};

export default ConfigureHalls;
