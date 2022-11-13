import { useCallback, useMemo, useState } from "react";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { MOSCHATO_STREETS } from "../data/moschato-streets";
import DirectionsIcon from "@mui/icons-material/Directions";
import SearchFilters from "../components/Filters";
import wcmatch from "wildcard-match";
import PerfectScrollbar from "react-perfect-scrollbar";
import { toGreek } from "greek-utils";

const defaultFilters = {
  searchTerm: "",
  characters: 0,
  searchMode: "search",
};

const showInMapClicked = (term: string) => {
  window.open(`https://maps.google.com?q=ΜΟΣΧΑΤΟ ${term}`);
};

const SearchPage = () => {
  const [searchFilters, setSearchFilters] = useState(defaultFilters);

  const handleChange = useCallback((value: any, dataField: string) => {
    setSearchFilters((prev) => ({
      ...prev,
      [dataField]: value,
    }));
  }, []);

  const streets = useMemo(() => {
    let filteredStreets = MOSCHATO_STREETS;
    let term = searchFilters.searchTerm.toLowerCase();
    term = toGreek(term);
    term = term.replaceAll(";", "?");

    if (searchFilters.searchMode === "anagram") {
      return filteredStreets.filter((word) => {
        return (
          word.toLowerCase().split("").sort().join("") ===
          term.split("").sort().join("")
        );
      });
    }

    if (searchFilters.searchMode === "contains") {
      return filteredStreets.filter((word) => {
        return term.split("").every((t) => word.toLowerCase().includes(t));
      });
    }

    if (searchFilters.characters > 0) {
      filteredStreets = filteredStreets.filter(
        (street) => street.length === searchFilters.characters
      );
    }

    if (term.match(/\?|\*/g)) {
      const isMatch = wcmatch(term);

      filteredStreets = filteredStreets.filter((street) =>
        isMatch(street.toLowerCase())
      );
    } else if (term) {
      filteredStreets = filteredStreets.filter((street) =>
        street.toLowerCase().startsWith(term)
      );

      if (filteredStreets.length === 0) {
        filteredStreets = MOSCHATO_STREETS.filter((street) =>
          street.toLowerCase().includes(term)
        );
      }
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
        {streets.length > 0 ? (
          <List style={{ maxHeight: "200px", flexGrow: 1 }}>
            {streets.map((street) => (
              <ListItem
                key={street}
                style={{ borderBottom: "1px solid black" }}
              >
                <ListItemText primary={street} />
                <Divider />
                <ListItemIcon onClick={() => showInMapClicked(street)}>
                  <DirectionsIcon />
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography align="center">
            🧠 Something wrong 🤓... No results found 😭
          </Typography>
        )}
      </PerfectScrollbar>
    </>
  );
};

export default SearchPage;
