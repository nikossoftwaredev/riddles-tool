import { useCallback, useMemo, useRef, useState } from "react";
import { Button, colors, Divider, ListItem, ListItemIcon, Stack, Typography } from "@mui/material";

import DirectionsIcon from "@mui/icons-material/Directions";
import wcmatch from "wildcard-match";
import { toGreek } from "greek-utils";
import { ISearchFilters, LocationInfo } from "types/search";
import { areaDataSets } from "data/general";
import { highlightStringMatch } from "utils/test";
import OptimizedList from "components/OptimizedList";
import SearchFilters from "components/SearchFilters";

const defaultFilters: ISearchFilters = {
  searchTerm: "",
  characters: 0,
  searchMode: "search",
  dataset: "ΟΛΑ"
};

const showInMapClicked = (term: string) => {
  window.open(`https://maps.google.com?q=${term}`);
};

const threshold = 50;

const MyList = ({
  items,
  searchTerm
}: {
  items: LocationInfo[];
  searchTerm: string;
}): JSX.Element => (
  <>
    {items.map(({ street, town }) => {
      const fullStreet = `${street} ${town}`;
      return (
        <ListItem
          key={fullStreet}
          style={{ borderBottom: "1px solid black" }}
          onClick={() => showInMapClicked(fullStreet)}
          sx={{
            cursor: "pointer",
            "&:hover": { backgroundColor: colors.blue[600] }
          }}
        >
          <Typography>
            <span
              dangerouslySetInnerHTML={{
                __html: highlightStringMatch(fullStreet, searchTerm)
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
  </>
);

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

    let term = searchFilters.searchTerm.toLowerCase();
    term = toGreek(term, "?");

    if (searchFilters.characters > 0) {
      filteredStreets = filteredStreets.filter(
        ({ street }) => street.length === searchFilters.characters
      );
    }

    if (searchFilters.searchMode === "anagram") {
      filteredStreets = filteredStreets.filter(
        ({ street }) =>
          street.toLowerCase().split("").sort().join("") === term.split("").sort().join("")
      );
    } else if (term.match(/\?|\*/g)) {
      const isMatch = wcmatch(term);

      filteredStreets = filteredStreets.filter(({ street }) => isMatch(street.toLowerCase()));
    } else if (term) {
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
    <>
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
          style={{ maxHeight: "450px" }}
          hasMore={displayInfo.length <= locationInfo.length}
          loadMore={loadMore}
          items={displayInfo}
          renderItems={items => <MyList items={items} searchTerm={searchFilters.searchTerm} />}
        />
      ) : (
        <Typography align='left' sx={{ mt: 2 }}>
          🧠 Something went wrong... <br />
          😭 No results found
        </Typography>
      )}
    </>
  );
};

export default SearchPage;
