/**
 * Интерфейс данных сеанса.
 */
export interface SessionData {
  movie: {
    id: number;
    title: string;
    synopsis: string;
    duration: string;
    origin: string;
    poster: string;
  };
  hall: string;
  time: string;
  date: string;
  seats: string[][];
  prices: {
    standart: number;
    vip: number;
  };
  soldTickets: { seat_row: number; seat_column: number }[];
}
