import { IDataSet, LocationInfo } from "types/search";
import { MOSCHATO_STREETS } from "./moschato-streets";
import { NIKAIA_STREETS } from "./nikaia-streets";
import { ODONIMIO } from "./odonimio";
import { RENTIS_STREETS } from "./rentis-streets";

export const areaDataSets: Record<IDataSet, LocationInfo[]> = {
  ΜΟΣΧΑΤΟ: MOSCHATO_STREETS,
  ΝΙΚΑΙΑ: NIKAIA_STREETS,
  ΡΕΝΤΗΣ: RENTIS_STREETS,
  ΟΔΟΝΥΜΙΟ: ODONIMIO,
  ΟΛΑ: [...MOSCHATO_STREETS, ...NIKAIA_STREETS, ...RENTIS_STREETS].sort((a, b) =>
    a.street.localeCompare(b.street)
  )
};
