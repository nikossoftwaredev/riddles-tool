import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SearchPage from "../pages/SearchPage";
import LettersNumbersPage from "../pages/LettersNumbersPage";
import MorsePage from "../pages/MorsePage";
import PigPenPage from "../pages/PigPenPage";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Paper, Stack } from "@mui/material";
import { Box } from "@mui/system";

const tabsConfig = [
  {
    tabName: "search",
    tabContent: <SearchPage />,
  },
  {
    tabName: "numberLetters",
    tabContent: <LettersNumbersPage />,
  },
  {
    tabName: "morse",
    tabContent: <MorsePage />,
  },
  {
    tabName: "pig-pen",
    tabContent: <PigPenPage />,
  },
];

const RiddleTabs = () => {
  const navigate = useNavigate();

  const { tabName = "search" } = useParams();

  const tabIndex = useMemo(
    () => tabsConfig.findIndex((tab) => tab.tabName === tabName),
    [tabName]
  );

  return (
    <Stack
      gap={2}
      sx={{ height: "90vh", width: "350px" }}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box sx={{ height: "90%", p: 1, overflow: "auto" }}>
        {tabsConfig[tabIndex].tabContent}
      </Box>
      <Paper sx={{ flexGrow: 1 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={tabIndex}
          onChange={(e, newValue) =>
            navigate(`/${tabsConfig[newValue].tabName}`)
          }
        >
          <BottomNavigationAction label="Search" id="search" />
          <BottomNavigationAction label="Numbers-Letters" id="numberLetters" />
          <BottomNavigationAction label="Morse" id="morse" />
          <BottomNavigationAction label="Pig Pen" id="pig-pen" />
        </BottomNavigation>
      </Paper>
    </Stack>
  );
};

export default RiddleTabs;
