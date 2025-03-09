import React from 'react';
import Movie from '../Movie/Movie';
import Placeholder from '../Placeholder/Placeholder';
import './MovieList.sass';
import { MovieListProps } from '../../interfaces/IProps';

/**
 * Интерфейс, представляющий свойства компонента MovieList.
 */

/**
 * Компонент MovieList отображает список фильмов.
 *
 * @param movies Список фильмов для отображения.
 * @returns Компонент для отображения списка фильмов или плейсхолдера.
 */
const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <main className="main">
      {movies.length > 0 ? (
        // Если список фильмов не пустой, отображаем каждый фильм.
        movies.map(movie => <Movie key={movie.id} movie={movie} />)
      ) : (
        // Если список фильмов пустой, отображаем плейсхолдер с сообщением.
        <Placeholder text="К сожалению, на выбранную дату нет доступных фильмов." />
      )}
    </main>
  );
};

export default MovieList;
