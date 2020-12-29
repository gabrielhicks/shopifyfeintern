import React, { useState, useEffect } from 'react';
import { Button, GridItem, Box } from '@chakra-ui/react';
import Movie from './Movie';

export const SearchResults = ({
  movies,
  clickHandler,
  nominations,
  nomIds,
}) => {
  return (
    <>
      <GridItem
        overflow='scroll'
        rowSpan={1}
        colSpan={1}
        bg='lightgrey'
        h='48vh'>
        <>
          {movies.map((movie) => (
            <React.Fragment key={movie.imdbID}>
              <Movie
                buttonIcon='⮕'
                clickHandler={clickHandler}
                movie={movie}
                nominations={nominations}
                disabled={nomIds.has(movie.imdbID)}
              />
            </React.Fragment>
          ))}
        </>
      </GridItem>
    </>
  );
};
