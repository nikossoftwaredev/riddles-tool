import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Stack, Box, Tabs, Tab, Typography, colors } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import SearchIcon from "@mui/icons-material/Search";
import SavingsIcon from "@mui/icons-material/Savings";
import LettersNumbersPage from "pages/LettersNumbersPage";
import SearchPage from "pages/SearchPage";
import PigPenPage from "pages/PigPenPage";
import MorsePage from "pages/MorsePage";
import MendeleevPage from "pages/MendeleevPage";
import { makeStyles, withStyles } from "@mui/styles";
import TabScrollButton from "@mui/material/TabScrollButton";
import CaesarsPage from "pages/CaesarsPage";
import TextAnalyzePage from "pages/TextAnalyzePage";
import AbcIcon from "@mui/icons-material/Abc";
import IconWrapper from "./IconWrapper";

const tabsConfig = [
  {
    id: "search",
    label: "Search",
    icon: <SearchIcon />,
    tabContent: <SearchPage />
  },
  {
    id: "Letters-Numbers",
    label: "A-Z_0-9",
    icon: <CompareArrowsIcon />,
    tabContent: <LettersNumbersPage />
  },
  {
    id: "caesars",
    label: "caesars",
    tabContent: <CaesarsPage />,
    icon: <IconWrapper src='assets/caesars.svg' style={{ marginBottom: "6px" }} />
  },
  {
    id: "mendeleev",
    label: "mendeleev",
    tabContent: <MendeleevPage />,
    icon: <IconWrapper src='assets/pt.svg' style={{ marginBottom: "6px" }} />
  },
  {
    id: "text-analyze",
    label: "Text Analyze",
    tabContent: <TextAnalyzePage />,
    icon: <AbcIcon />
  },
  {
    id: "morse",
    label: "Morse",
    icon: <MoreHorizIcon />,
    tabContent: <MorsePage />
  },
  {
    id: "pig-pen",
    label: "Pig pen",
    icon: <SavingsIcon />,
    tabContent: <PigPenPage />
  }
];

const CustomTabScrollButton = withStyles(() => ({
  root: {
    width: 28,
    overflow: "hidden",
    transition: "width 0.5s",
    "&.Mui-disabled": {
      width: 0
    }
  }
}))(TabScrollButton);

const useStyles = makeStyles(() => ({
  root: {
    height: 70,
    width: "99%"
  },
  tab: {
    height: 70
  }
}));

const RiddleTabs = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const { tabName = "search" } = useParams();

  const tabIndex = useMemo(() => {
    const foundIndex = tabsConfig.findIndex(tab => tab.id === tabName);

    return Math.max(foundIndex, 0);
  }, [tabName]);

  const height = useMemo(() => {
    const vh = window.innerHeight * 0.01;

    return `calc(${vh}px * 100);`;
  }, []);

  return (
    <Stack
      gap={2}
      sx={{
        height,
        width: "350px",
        maxWidth: "100vw",
        position: "relative"
      }}
      direction='column'
      alignItems='center'
      justifyContent='center'
    >
      <Typography sx={{ position: "absolute", right: 1, top: 1, color: colors.grey[500] }}>
        v{process.env.VERSION}
      </Typography>
      <Box sx={{ flex: 1, overflow: "auto" }}>{tabsConfig[tabIndex].tabContent}</Box>
      <Tabs
        ScrollButtonComponent={CustomTabScrollButton}
        className={classes.root}
        value={tabIndex}
        onChange={(e, newValue) => navigate(`/${tabsConfig[newValue].id}`)}
        indicatorColor='secondary'
        textColor='inherit'
        variant='scrollable'
        aria-label='full width tabs example'
      >
        {tabsConfig.map(({ id, label, icon }) => (
          <Tab className={classes.tab} key={id} label={label} id={id} icon={icon} />
        ))}
      </Tabs>
    </Stack>
  );
};

export default RiddleTabs;
