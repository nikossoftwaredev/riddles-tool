import { useCallback, useMemo, useRef, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

import wcmatch from "wildcard-match";
import { toGreek } from "greek-utils";
import { ISearchFilters, LocationInfo } from "types/search";
import { areaDataSets } from "data/general";
import OptimizedList from "components/OptimizedList";
import SearchFilters from "components/SearchFilters";
import StreetList from "components/StreetList";

const defaultFilters: ISearchFilters = {
  searchTerm: "",
  characters: 0,
  searchMode: "search",
  dataset: "ΝΙΚΑΙΑ"
};

const threshold = 50;

const SearchPage = () => {
  const [searchFilters, setSearchFilters] = useState(defaultFilters);

  // Infinity Scrolling logic
  const x = useRef(0);
  const [displayInfo, setDisplayInfo] = useState<LocationInfo[]>([]);

  const handleChange = useCallback((value: any, dataField: string) => {
    setSearchFilters(prev => ({
      ...prev,
      [dataField]: value
    }));
  }, []);

  const locationInfo: LocationInfo[] = useMemo(() => {
    let filteredStreets = areaDataSets[searchFilters.dataset];

    let term = searchFilters.searchTerm.toLocaleUpperCase();
    term = toGreek(term, "?");

    if (searchFilters.characters > 0) {
      filteredStreets = filteredStreets.filter(
        ({ street }) => street.length === searchFilters.characters
      );
    }

    if (searchFilters.searchMode === "anagram") {
      filteredStreets = filteredStreets.filter(
        ({ street }) => street.split("").sort().join("") === term.split("").sort().join("")
      );
    } else if (term.match(/\?|\*/g)) {
      const isMatch = wcmatch(term);

      filteredStreets = filteredStreets.filter(({ street }) => isMatch(street));
    } else if (term) {
      const tempFilteredStreets = [...filteredStreets];
      filteredStreets = filteredStreets.filter(({ street }) => street.startsWith(term));

      if (filteredStreets.length === 0) filteredStreets = [...tempFilteredStreets];

      filteredStreets = filteredStreets.filter(({ street }) => {
        const rgx = new RegExp(term, "ig");
        return rgx.test(street);
      });
    }

    const uniqueStreets = [...new Set(filteredStreets)];

    x.current = 0;
    setDisplayInfo(uniqueStreets.slice(0, threshold));

    return uniqueStreets;
  }, [searchFilters]);

  const loadMore = useCallback(() => {
    x.current += threshold;
    setDisplayInfo(locationInfo.slice(0, x.current));
  }, [locationInfo]);

  return (
    <Stack alignItems='center' sx={{ height: "100%" }}>
      <Stack gap={2} alignItems='center'>
        <SearchFilters searchFilters={searchFilters} handleChange={handleChange} />
        <Button
          style={{ width: "160px", marginBottom: "8px" }}
          variant='contained'
          color='primary'
          onClick={() => setSearchFilters(defaultFilters)}
        >
          Clear Filters
        </Button>
      </Stack>
      {displayInfo.length > 0 ? (
        <OptimizedList
          style={{ flex: 1 }}
          hasMore={displayInfo.length <= locationInfo.length}
          loadMore={loadMore}
          items={displayInfo}
          renderItems={items => (
            <StreetList
              items={items}
              searchTerm={searchFilters.searchTerm}
              dataset={searchFilters.dataset}
            />
          )}
        />
      ) : (
        <Typography align='left' sx={{ mt: 2, flex: 1 }}>
          🧠 Something went wrong... <br />
          😭 No results found
        </Typography>
      )}
    </Stack>
  );
};

export default SearchPage;
