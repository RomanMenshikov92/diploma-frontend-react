import { SessionType } from './IAdmin';

export interface Hall {
  id: number;
  name: string;
  seats: string[][];
  price_regular: number;
  price_vip: number;
}

export interface HallsContextType {
  halls: Hall[];
  sessions: SessionType[];
  setSessions: React.Dispatch<React.SetStateAction<SessionType[]>>;
  addHall: (name: string) => Promise<void>;
  deleteHall: (id: number) => Promise<void>;
  updateHallPrices: (id: number, regularPrice: number, vipPrice: number) => Promise<void>;
  updateSessionStatus: (hallId: number, status: string) => Promise<string>;
  fetchSessions: (date: Date) => Promise<void>;
}

/**
 * Интерфейс для контекста аутентификации.
 */
export interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}
