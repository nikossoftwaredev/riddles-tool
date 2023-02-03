import { useState } from "react";
import { Stack, Grid, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import PerfectScrollbar from "react-perfect-scrollbar";
import BackspaceIcon from "@mui/icons-material/Backspace";
import CopyText from "components/CopyText";
import { pigPenInfo } from "data/letters";

const PigPenPage = () => {
  const [text, setText] = useState("");

  const onClick = (letter: string) => () => {
    setText(prev => `${prev}${letter}`);
  };

  return (
    <Stack gap={2} sx={{ height: "100%", width: "100%" }} direction='column' alignItems='center'>
      <Grid sx={{ mt: 1 }} container spacing={2} justifyItems='stretch'>
        <Grid item xs={6}>
          <Button
            variant='contained'
            color='error'
            sx={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px"
            }}
            disabled={text.length === 0}
            onClick={() => {
              setText("");
            }}
            aria-label='delete'
          >
            Clear
            <ClearIcon fontSize='small' />
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant='contained'
            sx={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px"
            }}
            disabled={text.length === 0}
            onClick={() => {
              setText(prev => prev.slice(0, -1));
            }}
            aria-label='delete'
          >
            Delete
            <BackspaceIcon fontSize='small' />
          </Button>
        </Grid>
      </Grid>

      <CopyText text={text || "Type pigpen"} />
      <PerfectScrollbar>
        <Grid container spacing={5} justifyItems='stretch' sx={{ flexGrow: 1 }}>
          {pigPenInfo.map(info => {
            const { letter, sides, dotStyle, transform } = info;
            const buttonStyle = sides.reduce((acc, side) => {
              return {
                ...acc,
                [`border${side}`]: "5px solid black",
                transform
              };
            }, {});

            return (
              <Grid key={letter} item xs={4}>
                <button
                  className='pig-pen'
                  style={buttonStyle}
                  onClick={onClick(letter)}
                  type='button'
                >
                  {dotStyle && <span className={`${letter} dot`} style={dotStyle} />}
                </button>
              </Grid>
            );
          })}
        </Grid>
      </PerfectScrollbar>
    </Stack>
  );
};

export default PigPenPage;
