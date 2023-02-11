import { sanitizeDiacritics } from "greek-utils";
import { LocationInfo } from "types/search";

export const ODONIMIO: LocationInfo[] = [
  { street: "Αν", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "κρατάτε", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "στα", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "χέρια", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "σας", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "αυτό", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "εδώ", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "το", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "«εγχειρίδιο»", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "σημαί", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "απόφαση", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "να", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "ψάξετε", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "για", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "τον", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Κρυμμένο", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Θησαυρό", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "συνοδοιπόρους", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "σας", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "συλλέξατε", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "τις", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "πρώτες", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "πληρ", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "ένα", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "ταξίδι", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "15", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "ημερών", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "προς", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "μεγάλο", town: "ΟΔΟΝΥΜΙΟ" }
].map(
  (s): LocationInfo => ({
    town: s.town as LocationInfo["town"],
    street: sanitizeDiacritics(s.street.toUpperCase())
  })
);
