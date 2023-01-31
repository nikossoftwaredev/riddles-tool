import { useCallback, useMemo, useState } from "react";
import {
  Button,
  colors,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";

import DirectionsIcon from "@mui/icons-material/Directions";
import SearchFilters from "../components/SearchFilters";
import wcmatch from "wildcard-match";
import PerfectScrollbar from "react-perfect-scrollbar";
import { toGreek } from "greek-utils";
import { ISearchFilters, LocationInfo } from "../types/search";
import { areaDataSets } from "../data/general";
import { highlightStringMatch } from "../utils/test";

const defaultFilters: ISearchFilters = {
  searchTerm: "",
  characters: 0,
  searchMode: "search",
  dataset: "ΟΛΑ",
};

const showInMapClicked = (term: string) => {
  window.open(`https://maps.google.com?q=${term}`);
};

const SearchPage = () => {
  const [searchFilters, setSearchFilters] = useState(defaultFilters);

  const handleChange = useCallback((value: any, dataField: string) => {
    setSearchFilters((prev) => ({
      ...prev,
      [dataField]: value,
    }));
  }, []);

  const locationInfo: LocationInfo[] = useMemo(() => {
    let filteredStreets = areaDataSets[searchFilters.dataset];

    let term = searchFilters.searchTerm.toLowerCase();
    term = toGreek(term, "?");

    if (searchFilters.characters > 0) {
      filteredStreets = filteredStreets.filter(
        ({ street }) => street.length === searchFilters.characters
      );
    }

    if (searchFilters.searchMode === "anagram") {
      return filteredStreets.filter(({ street }) => {
        return (
          street.toLowerCase().split("").sort().join("") ===
          term.split("").sort().join("")
        );
      });
    }

    if (term.match(/\?|\*/g)) {
      const isMatch = wcmatch(term);

      filteredStreets = filteredStreets.filter(({ street }) =>
        isMatch(street.toLowerCase())
      );
    } else if (term) {
      filteredStreets = filteredStreets.filter(({ street }) => {
        const rgx = new RegExp(term, "ig");
        return rgx.test(street);
      });
    }

    return filteredStreets;
  }, [searchFilters]);

  return (
    <>
      <Stack gap={2} alignItems="center">
        <SearchFilters
          searchFilters={searchFilters}
          handleChange={handleChange}
        />
        <Button
          style={{ width: "160px" }}
          variant="contained"
          color="primary"
          onClick={() => setSearchFilters(defaultFilters)}
        >
          Clear Filters
        </Button>
      </Stack>
      <PerfectScrollbar>
        {locationInfo.length > 0 ? (
          <List style={{ maxHeight: "200px", flexGrow: 1 }}>
            {locationInfo.map(({ street, town }) => {
              const fullStreet = `${street} ${town}`;
              return (
                <ListItem
                  key={fullStreet}
                  style={{ borderBottom: "1px solid black" }}
                  onClick={() => showInMapClicked(fullStreet)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: colors.blue[600] },
                  }}
                >
                  <Typography>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: highlightStringMatch(
                          fullStreet,
                          searchFilters.searchTerm
                        ),
                      }}
                    />
                  </Typography>
                  <Divider />
                  <ListItemIcon sx={{ ml: "auto" }}>
                    <DirectionsIcon />
                  </ListItemIcon>
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Typography align="left" sx={{ mt: 2 }}>
            🧠 Something went wrong... <br />
            😭 No results found
          </Typography>
        )}
      </PerfectScrollbar>
    </>
  );
};

export default SearchPage;
