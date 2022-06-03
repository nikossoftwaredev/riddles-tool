import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import SearchPage from "./SearchPage";
import Num2LettersPage from "./Num2LettersPage";

const tabsConfig = [
  {
    tabName: "search",
    tabContent: <SearchPage />,
  },
  {
    tabName: "num2letters",
    tabContent: <Num2LettersPage />,
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
    <>
      <Tabs
        value={tabIndex}
        onChange={(e, newValue) => navigate(`/${tabsConfig[newValue].tabName}`)}
        aria-label="basic tabs example"
      >
        <Tab label="Search" id="search" />
        <Tab label="Num to letters" id="num2letters" />
      </Tabs>
      {tabsConfig[tabIndex].tabContent}
    </>
  );
};

export default RiddleTabs;
