import { useMemo, useState } from 'react';
import { Stack, TextField, Typography } from '@mui/material';

import { greekLetters, englishLetters } from 'data/letters';

const LettersToNum = () => {
  const [letters, setLetters] = useState('');

  const greekNumbers = useMemo(() => {
    const numberArray = letters
      .split(/ |/)
      .map((letter: string) => greekLetters.indexOf(letter) + 1)
      .join(' ')
      .toUpperCase();
    return numberArray;
  }, [letters]);

  const englishNumbers = useMemo(() => {
    const numberArray = letters
      .split(/ |/)
      .map((letter: string) => englishLetters.indexOf(letter) + 1)
      .join(' ')
      .toUpperCase();

    return numberArray;
  }, [letters]);

  return (
    <Stack gap={2} height='100%'>
      <Stack style={{ height: '50%' }} gap={1}>
        <TextField
          fullWidth
          size='small'
          value={letters}
          onChange={e => setLetters(e.target.value)}
          id='outlined-basic'
          label='Letters...'
          variant='outlined'
        />
        <Stack direction='row' alignItems='center' gap={1}>
          <img height='16px' src='assets/gr.svg' alt='gr' />
          <Typography>{greekNumbers}</Typography>
        </Stack>
        <Stack direction='row' alignItems='center' gap={1}>
          <img height='16px' width='25px' src='assets/en.svg' alt='en' />
          <Typography>{englishNumbers}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LettersToNum;
