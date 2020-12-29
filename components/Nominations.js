import React from 'react';
import { GridItem } from '@chakra-ui/react';
import Movie from './Movie';

export const Nominations = ({ nominations, clickHandler }) => (
  <GridItem
    key='Nominations'
    overflow='scroll'
    rowSpan={1}
    colSpan={1}
    bg='lightgrey'
    h='48vh'>
    <React.Fragment>
      {nominations.length < 0 ? (
        <p>Add more nominations!</p>
      ) : (
        <>
          {nominations.map((movie) => (
            <React.Fragment key={movie.imdbID}>
              <Movie
                disabled={false}
                buttonIcon='X'
                clickHandler={clickHandler}
                movie={movie}
              />
            </React.Fragment>
          ))}
        </>
      )}
    </React.Fragment>
  </GridItem>
);
