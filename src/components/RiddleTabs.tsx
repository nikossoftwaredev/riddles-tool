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
import MendeleevPage from "../pages/MendeleevPage";

const tabsConfig = [
  {
    id: "search",
    tabContent: <SearchPage />,
    label: "Search",
  },
  {
    id: "Letters-Numbers",
    tabContent: <LettersNumbersPage />,
    label: "Morse",
  },
  {
    id: "mendeleev",
    tabContent: <MendeleevPage />,
    label: "Mendeleev",
  },
  {
    id: "morse",
    tabContent: <MorsePage />,
    label: "Morse",
  },
  {
    id: "pig-pen",
    tabContent: <PigPenPage />,
    label: "Pig Pen",
  },
];

const RiddleTabs = () => {
  const navigate = useNavigate();

  const { tabName = "search" } = useParams();

  const tabIndex = useMemo(
    () => tabsConfig.findIndex((tab) => tab.id === tabName),
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
          onChange={(e, newValue) => navigate(`/${tabsConfig[newValue].id}`)}
        >
          {tabsConfig.map(({ id, label }) => (
            <BottomNavigationAction key={id} label={label} id={id} />
          ))}
        </BottomNavigation>
      </Paper>
    </Stack>
  );
};

export default RiddleTabs;
