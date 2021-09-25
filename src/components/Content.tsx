import { useEffect, useState } from 'react';

import { MovieCard } from './MovieCard';
import { Header } from './Header';

import { api } from '../services/api';

import '../styles/content.scss';
interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}
interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

import { useMenu } from './../contexts/MenuContext';

export function Content() {

  const { selectedGenreId, selectedGenre, setInSelectedGenre, movies, setInMovies } = useMenu()

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setInMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setInSelectedGenre(response.data);
    })
  }, [selectedGenreId]);


  return (
    <div className="container">
      <Header title={selectedGenre?.title} />
      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}