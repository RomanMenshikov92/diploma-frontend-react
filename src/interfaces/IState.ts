import { Movie } from './IProps';

/**
 * Интерфейс для состояния, передаваемого через навигацию.
 */
export interface State {
  sessionId: string;
  movie: Movie;
  hall: string;
  time: string;
  date: Date;
  seats: string[];
  totalCost: number;
}
