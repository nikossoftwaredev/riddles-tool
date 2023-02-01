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
import SearchIcon from "@mui/icons-material/Search";
import SavingsIcon from "@mui/icons-material/Savings";
import IconWrapper from "./IconWrapper";

const tabsConfig = [
  {
    id: "search",
    tabContent: <SearchPage />,
    icon: <SearchIcon />,
  },
  {
    id: "Letters-Numbers",
    tabContent: <LettersNumbersPage />,
    label: "A-Z_0-9",
  },
  {
    id: "mendeleev",
    tabContent: <MendeleevPage />,
    icon: <IconWrapper src="assets/pt.svg" />,
  },
  {
    id: "morse",
    tabContent: <MorsePage />,
    label: "Morse",
  },
  {
    id: "pig-pen",
    tabContent: <PigPenPage />,
    icon: <SavingsIcon />,
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
      sx={{ height: "100vh", maxHeight: "100vh", width: "350px" }}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box sx={{ height: "90%", overflow: "auto" }}>
        {tabsConfig[tabIndex].tabContent}
      </Box>
      <Paper sx={{ flexGrow: 1 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={tabIndex}
          onChange={(e, newValue) => navigate(`/${tabsConfig[newValue].id}`)}
        >
          {tabsConfig.map(({ id, label, icon }) => (
            <BottomNavigationAction
              key={id}
              label={label}
              id={id}
              icon={icon}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Stack>
  );
};

export default RiddleTabs;
