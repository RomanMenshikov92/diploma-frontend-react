import { Hall, MovieType, SessionType } from './IAdmin';

/**
 * Интерфейс для пропсов компонента Placeholder.
 */
export interface PlaceholderProps {
  text: string;
}

/**
 * Интерфейс для пропсов компонента Nav.
 */
export interface NavProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

/**
 * Интерфейс, представляющий сеанс кино.
 */
export interface Session {
  session_id: number;
  hall: string;
  time: string;
  price_regular: number;
  price_vip: number;
}

/**
 * Интерфейс, представляющий фильм.
 */
export interface Movie {
  id: number;
  title: string;
  synopsis: string;
  duration: string;
  origin: string;
  poster: string;
  sessions: Session[];
}

/**
 * Интерфейс, представляющий свойства компонента Movie.
 */
export interface MovieProps {
  movie: Movie;
}

export interface MovieListProps {
  movies: Movie[];
}

/**
 * Интерфейс для свойств компонента Modal.
 */
export interface ModalProps {
  show: boolean;
  onClose: () => void;
  onSave?: (inputValue: string) => void;
  title: string;
  message?: string;
  inputPlaceholder?: string;
  inputVisible?: boolean;
  notification?: boolean;
  children?: React.ReactNode;
  textNo?: string;
  textYes?: string;
}

/**
 * Интерфейс для свойств компонента Calendar.
 */
export interface CalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

/**
 * Интерфейс для свойств компонента Button.
 */
export interface ButtonProps {
  type: 'regular' | 'accent' | 'trash';
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export interface SessionProps {
  session: SessionType;
  movie: MovieType;
  color: string;
  onDragStart: (e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, session: SessionType) => void;
  onDrag: (e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
  onDelete: (id: string) => void;
}

export interface ConfStepWrapperProps {
  title: string;
  children: React.ReactNode;
}

/**
 * Свойства компонента HallSelector.
 */
export interface HallSelectorProps {
  halls: Hall[];
  selectedHallId: number | null;
  setSelectedHallId: (id: number) => void;
  name: string;
}

export interface MovieModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (movie: { title: string; duration: number; origin: string; poster: string; synopsis: string }) => void;
}
