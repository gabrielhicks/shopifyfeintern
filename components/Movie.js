import React, { useState } from 'react';
import { Button, Box } from '@chakra-ui/react';
import { Nominations } from './Nominations';

export default function Movie({ movie, clickHandler, buttonIcon, disabled }) {
  function handleClick(e) {
    clickHandler(movie);
  }

  return (
    <Box bg='white' maxW='sm' borderWidth='1px'>
      <>
        <p>{movie.Title}</p>
        <p>{movie.Year}</p>
        <Button onClick={handleClick} isDisabled={disabled} colorScheme='blue'>
          {buttonIcon}
        </Button>
      </>
    </Box>
  );
}
