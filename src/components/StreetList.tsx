/* eslint-disable react/no-danger */
import { colors, Divider, ListItem, ListItemIcon, Typography } from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";
import { ISearchFilters, LocationInfo } from "types/search";
import { getHighlightedText } from "utils/text";

export const showInMapClicked = (term: string, town: string, query?: string) => {
  const mapTown = town === "ΟΔΟΝΥΜΙΟ" ? "ΝΙΚΑΙΑ" : town;
  const searchTerm = query ? `${query} ${mapTown}` : `${term.split(" ")[0]} ${mapTown}`;
  window.open(`https://maps.google.com?q=${searchTerm}`);
};

const StreetList = ({
  items,
  searchTerm,
  dataset
}: {
  items: LocationInfo[];
  searchTerm: ISearchFilters["searchTerm"];
  dataset: ISearchFilters["dataset"];
}): JSX.Element => (
  <>
    {items.map(({ street, town, query }) => {
      const fullStreet = `${street} ${town}`;
      return (
        <ListItem
          key={fullStreet}
          style={{ borderBottom: "1px solid black" }}
          onClick={() => showInMapClicked(fullStreet, town, query)}
          sx={{
            cursor: "pointer",
            "&:hover": { backgroundColor: colors.blue[600] }
          }}
        >
          <Typography>
            <span
              dangerouslySetInnerHTML={{
                __html: `${getHighlightedText(street, searchTerm)} ${
                  dataset === "ΟΛΑ" ? `<span style="color:${colors.grey[600]}">${town}</span>` : ""
                }`
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

export default StreetList;
