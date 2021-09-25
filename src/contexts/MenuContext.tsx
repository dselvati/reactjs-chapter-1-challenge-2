import { createContext, ReactNode, useContext, useState } from 'react';

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

interface MenuContextData {
    genres: GenreResponseProps[],
    selectedGenreId: number,
    selectedGenre: GenreResponseProps,
    movies: MovieProps[],
    setInGenres: (genres: GenreResponseProps[]) => void,
    setInSelectedGenreId: (id: number) => void,
    setInSelectedGenre: (genre: GenreResponseProps) => void,
    setInMovies: (movies: MovieProps[]) => void
}

export const MenuContext = createContext({} as MenuContextData);


interface MenuContextProviderProps {
    children: ReactNode
}

export function MenuContextProvider({ children }: MenuContextProviderProps) {
    const [selectedGenreId, setSelectedGenreId] = useState(1);
    const [genres, setGenres] = useState<GenreResponseProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
    const [movies, setMovies] = useState<MovieProps[]>([]);


    function setInGenres(genres: GenreResponseProps[]) {
        setGenres(genres)
    }

    function setInSelectedGenreId(id: number) {
        setSelectedGenreId(id)
    }

    function setInSelectedGenre(genre: GenreResponseProps) {
        setSelectedGenre(genre)
    }

    function setInMovies(movies: MovieProps[]) {
        setMovies(movies)
    }

    return (
        <MenuContext.Provider
            value={{
                genres,
                selectedGenreId,
                selectedGenre,
                movies,
                setInGenres,
                setInSelectedGenreId,
                setInSelectedGenre,
                setInMovies
            }}>
            {children}
        </MenuContext.Provider>
    )
}

export const useMenu = () => {
    return useContext(MenuContext)
}