import { useEffect, useState } from 'react';

import { api } from '../services/api';

import { Button } from './Button';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

import '../styles/sidebar.scss';

import { useMenu } from './../contexts/MenuContext';

export function SideBar() {

  const { genres, selectedGenreId, setInGenres, setInSelectedGenreId } = useMenu()

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setInGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    setInSelectedGenreId(id);
  }

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}