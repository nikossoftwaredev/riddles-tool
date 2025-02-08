/* eslint-disable prefer-destructuring */
import { useState, useCallback, useMemo } from "react";
import {
  Stack,
  TextField,
  InputAdornment,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  colors,
  Grid,
  Paper
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import NumbersIcon from "@mui/icons-material/Numbers";

const CountWords = () => {
  const [text, setText] = useState("");
  const [indexes, setIndexes] = useState("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setText(value);
  }, []);

  const parsedText = text.replace(/\s+/g, " ").replace(/"|,|'/g, "");
  const words = parsedText.split(" ");

  const wordIndexes = indexes
    .split(" ")
    .map(i => Number(i))
    .filter(i => i > 0 && i <= words.length);

  const fullText = words.join("");

  return (
    <Stack alignItems='center' sx={{ height: "100%" }}>
      <TextField
        sx={{ my: 2 }}
        fullWidth
        multiline
        rows={4}
        size='small'
        value={text}
        onChange={handleChange}
        id='outlined-basic'
        label='Text'
        variant='outlined'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <ClearIcon onClick={() => setText("")} />
            </InputAdornment>
          )
        }}
      />
      <TextField
        fullWidth
        size='small'
        value={indexes}
        onChange={e => setIndexes(e.target.value)}
        id='outlined-basic'
        label='Indexes'
        variant='outlined'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <ClearIcon onClick={() => setIndexes("")} />
            </InputAdornment>
          )
        }}
      />
      <Paper sx={{ width: "90%", p: 2, m: 1 }}>
        <strong>Enumerate words</strong>
        {wordIndexes.map(i => {
          const word = words[i - 1];
          return (
            <Grid key={i} container direction='row'>
              <Grid item xs={2}>
                {i}:
              </Grid>
              <Grid item xs={10}>
                <strong>{word}</strong>
              </Grid>
            </Grid>
          );
        })}
      </Paper>
      <Paper sx={{ width: "90%", p: 2, m: 1 }}>
        <strong>Enumerate letters</strong>
        {wordIndexes.map(i => {
          const letter = fullText[i - 1];
          return (
            <Grid key={i} container direction='row'>
              <Grid item xs={2}>
                {i}:
              </Grid>
              <Grid item xs={10}>
                <strong>{letter}</strong>
              </Grid>
            </Grid>
          );
        })}
      </Paper>
    </Stack>
  );
};

export default CountWords;
