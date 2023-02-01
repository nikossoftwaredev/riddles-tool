import { useState, useRef } from 'react';
import { Button, Stack, Typography, Grid } from '@mui/material';
import SpaceBarIcon from '@mui/icons-material/SpaceBar';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import MinimizeIcon from '@mui/icons-material/Minimize';
import BackspaceIcon from '@mui/icons-material/Backspace';
import morse from 'morse';
import ClearIcon from '@mui/icons-material/Clear';
import CopyText from 'components/CopyText';

const MorsePage = () => {
  const [morseText, setMorseText] = useState('');
  const audio = useRef<HTMLAudioElement>();

  const onMorseClick = (mode: '.' | '-' | ' ') => () => {
    setMorseText(prev => `${prev}${mode}`);
    if (mode !== ' ') {
      audio.current?.pause();
      audio.current = new Audio(`assets/${mode === '.' ? 'dot' : 'dash'}.mp3`);
      audio.current?.play();
    }
  };

  return (
    <Stack gap={2} sx={{ height: '100%', width: '100%' }} direction='column' alignItems='center'>
      <Typography align='center' variant='h5'>
        {morseText || 'Type Morse...'}
      </Typography>
      <CopyText text={morse.decode(morseText)} />
      <Grid container spacing={2} justifyItems='stretch'>
        <Grid item xs={6}>
          <Button
            sx={{ backgroundColor: 'black', width: '100%' }}
            variant='contained'
            onClick={onMorseClick('.')}
          >
            <FiberManualRecordIcon />
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            sx={{ backgroundColor: 'black', width: '100%' }}
            variant='contained'
            onClick={onMorseClick('-')}
          >
            <MinimizeIcon />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button sx={{ width: '100%' }} variant='contained' onClick={onMorseClick(' ')}>
            <SpaceBarIcon />
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant='contained'
            color='error'
            sx={{ width: '100%' }}
            disabled={morseText.length === 0}
            onClick={() => {
              setMorseText('');
            }}
            aria-label='delete'
          >
            <ClearIcon />
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant='contained'
            color='error'
            sx={{ width: '100%' }}
            disabled={morseText.length === 0}
            onClick={() => {
              setMorseText(prev => prev.slice(0, -1));
            }}
            aria-label='delete'
          >
            <BackspaceIcon />
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default MorsePage;
