import { useEffect, useState } from 'react';
import axios from 'axios';
import { SessionData } from '../interfaces/IHooks';

/**
 * Хук для получения данных сеанса по идентификатору.
 *
 * @param {number} sessionId - Идентификатор сеанса.
 * @returns {SessionData | null} Данные сеанса или null, если данные не загружены.
 */
const useSessionData = (sessionId: number) => {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/session?sessionId=${sessionId}`);
        setSessionData(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке данных сеанса:', error);
      }
    };

    fetchData();
  }, [sessionId]);

  return sessionData;
};

export default useSessionData;
