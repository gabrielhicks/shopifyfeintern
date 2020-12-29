import React, { useState, useEffect } from 'react';
import { Grid, useColorMode, Input, GridItem, Button } from '@chakra-ui/react';
import { SearchResults } from './SearchResults';
import { Nominations } from './Nominations';

export const Main = (props) => {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [page, setPage] = useState(1);
  const { colorMode } = useColorMode();
  const color = { light: 'black', dark: 'black' };
  const titleColor = { light: 'black', dark: 'white' };

  const getMovieRequest = async (search) => {
    const url = `https://www.omdbapi.com/?s=${search}&type=movie&page=${page}&apikey=${process.env.NEXT_PUBLIC_OMDB_KEY}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    } else {
      setMovies([]);
    }
  };

  useEffect(() => {
    setPage(1);
    getMovieRequest(search);
  }, [search]);

  useEffect(() => {
    getMovieRequest(search);
  }, [page]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePageUp = (e) => {
    if (page >= 1 && page < 10) {
      let prevPage = page;
      setPage(prevPage + 1);
    } else {
      setPage(10);
    }
    getMovieRequest(search);
  };

  const handlePageDown = (e) => {
    if (page > 1 && page <= 10) {
      let prevPage = page;
      setPage(prevPage - 1);
    } else {
      setPage(1);
    }
    getMovieRequest(search);
  };

  const addNomination = (movie) => {
    if (nominations.length === 4) {
      alert('This is your fifth nomination!');
      setNominations([...nominations, movie]);
    } else if (nominations.length > 4) {
      alert('You already have five nominations!');
    } else {
      setNominations([...nominations, movie]);
    }
  };

  const removeNomination = (movie) => {
    let oldNoms = nominations;
    let newNoms = oldNoms.filter((nom) => nom.imdbID !== movie.imdbID);
    setNominations(newNoms);
  };

  return (
    <>
      <Grid
        spacing='1.5rem'
        width='100%'
        maxWidth='48rem'
        mt='10vh'
        px='1rem'
        templateRows='repeat(1, 1fr)'
        templateColumns='repeat(2, 1fr)'
        gap={4}
        color={color[colorMode]}
        {...props}>
        <GridItem
          color={titleColor[colorMode]}
          rowSpan={1}
          colSpan={2}
          h='10vh'>
          Movie title
          <Input
            onChange={handleSearch}
            value={search}
            bg='white'
            color='black'
            placeholder='Search OMDB'
          />
        </GridItem>
        <SearchResults
          key='Search Results'
          clickHandler={addNomination}
          nomIds={new Set(nominations.map((nomination) => nomination.imdbID))}
          movies={movies}
        />
        <Nominations
          key='Nominations'
          clickHandler={removeNomination}
          nominations={nominations}
        />
      </Grid>
      <Grid
        spacing='1.5rem'
        width='100%'
        maxWidth='48rem'
        mt='1vh'
        px='1rem'
        templateRows='repeat(1, 1fr)'
        templateColumns='repeat(2, 6.3rem)'
        color={color[colorMode]}
        {...props}>
        <GridItem rowSpan={1} colSpan={1}>
          <Button
            colorScheme='blue'
            isDisabled={page === 1}
            onClick={handlePageDown}>
            Previous
          </Button>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Button
            colorScheme='blue'
            isDisabled={movies.length < 10}
            onClick={handlePageUp}>
            Next Page
          </Button>
        </GridItem>
      </Grid>
    </>
  );
};
