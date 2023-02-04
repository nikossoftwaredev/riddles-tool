import { useState, useMemo, useCallback, useEffect } from "react";
import {
  Stack,
  TextField,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  IconButton,
  tableCellClasses,
  debounce
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { englishLetters, greekLetters } from "data/letters";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconWrapper from "components/IconWrapper";
import { toGreek, toGreeklish } from "greek-utils";
import PerfectScrollbar from "react-perfect-scrollbar";
import { styled } from "@mui/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
    color: "whitesmoke"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  },
  height: 24
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

const CaesarsPage = () => {
  const [text, setText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const [language, setLanguage] = useState("en");

  const letters = useMemo(() => (language === "gr" ? greekLetters : englishLetters), [language]);

  const handleDebounceTextChange = useCallback(
    debounce((newText: string) => {
      setDebouncedText(newText);
    }, 300),
    []
  );

  const shiftedTexts = useMemo(() => {
    const allShifts = [];

    for (let i = 0; i < letters.length; i++) {
      const shiftedText = debouncedText
        .toLocaleLowerCase()
        .split("")
        .map(letter => {
          if (letter === " ") return " ";

          const letterIndex = letters.findIndex(l => l === letter);
          const newIndex = (letterIndex + i) % letters.length;

          return letters[newIndex];
        })
        .join("");

      allShifts.push(shiftedText);
    }

    return allShifts;
  }, [debouncedText, letters]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const onlyLettersRegex = /^[a-zA-Zα-ωΑ-Ω ]+$/;
      const isText = onlyLettersRegex.test(toGreeklish(value));
      if (!isText && value) return;

      const finalText = language === "en" ? toGreeklish(value) : toGreek(value);
      setText(finalText);
      handleDebounceTextChange(finalText);
    },
    [language, handleDebounceTextChange]
  );

  const onLanguageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setLanguage(value);
    setText(prev => (value === "en" ? toGreeklish(prev) : toGreek(prev)));
  }, []);

  return (
    <Stack alignItems='center' sx={{ height: "100%" }}>
      <Stack alignItems='center'>
        <FormControl fullWidth>
          <RadioGroup
            row
            sx={{ alignItems: "center", justifyContent: "center" }}
            aria-labelledby='demo-radio-buttons-group-label'
            value={language}
            name='radio-buttons-group'
            onChange={onLanguageChange}
          >
            <FormControlLabel value='gr' control={<Radio />} label='Greek' />
            <FormControlLabel value='en' control={<Radio />} label='English' />
          </RadioGroup>
        </FormControl>
        <TextField
          fullWidth
          size='small'
          value={text}
          onChange={handleChange}
          id='outlined-basic'
          label={`Text(${language})`}
          variant='outlined'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <ClearIcon onClick={() => setText("")} />
              </InputAdornment>
            )
          }}
        />
      </Stack>
      <PerfectScrollbar style={{ width: "100%", flex: 1, marginTop: "8px" }}>
        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Shift(n)</StyledTableCell>
                <StyledTableCell sx={{ display: "flex", gap: 1 }}>
                  <IconWrapper src={`assets/${language}.svg`} /> Text
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {shiftedTexts.map((shiftedText, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <StyledTableRow key={index} sx={{ overflow: "auto" }}>
                  <StyledTableCell>+{index}</StyledTableCell>
                  <StyledTableCell>
                    <Stack
                      alignItems='center'
                      justifyContent='center'
                      direction='row'
                      sx={{ overflow: "auto", maxWidth: "100vh" }}
                    >
                      {shiftedText}
                      <IconButton onClick={() => navigator.clipboard.writeText(shiftedText)}>
                        <ContentCopyIcon fontSize='small' sx={{ marginLeft: "auto" }} />
                      </IconButton>
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PerfectScrollbar>
    </Stack>
  );
};

export default CaesarsPage;
