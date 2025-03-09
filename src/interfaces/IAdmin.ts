/**
 * Интерфейс для сеанса.
 */
export interface SessionType {
  id?: string; // id может быть необязательным для новых сеансов и строковым для временных идентификаторов
  hall_id: number;
  movie_id: number;
  time: string; // Формат времени: "hh:mm:ss"
  date: string; // Дата в формате "YYYY-MM-DD"
  seats_status: string; // Состояние мест в формате JSON
  status: string; // Статус сеанса
}

export interface SessionListProps {
  halls: { id: number; name: string }[];
  sessions: SessionType[];
  movies: MovieType[];
  colors: string[];
  onDragStartSession: (
    e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    session: SessionType,
  ) => void;
  onDrag: (e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, hallId: number) => void;
  onDeleteSession: (id: string) => void;
}

/**
 * Интерфейс, описывающий зал.
 */
export interface Hall {
  id: number;
  name: string;
}

/**
 * Интерфейс для фильма.
 */
export interface MovieType {
  id: number;
  title: string;
  duration: number;
  poster: string;
}

export interface MovieListProps {
  movies: MovieType[];
  colors: string[];
  onDragStart: (e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, movie: MovieType) => void;
  onDragEnd: () => void;
}

export interface MovieProps {
  movie: MovieType;
  color: string;
  onDragStart: (e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, movie: MovieType) => void;
  onDragEnd: () => void;
}
