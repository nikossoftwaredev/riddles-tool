export type IDataSet = "ΡΕΝΤΗΣ" | "ΝΙΚΑΙΑ" | "ΜΟΣΧΑΤΟ" | "ΟΔΟΝΥΜΙΟ" | "ΟΛΑ";
export interface LocationInfo {
  town: "ΡΕΝΤΗΣ" | "ΝΙΚΑΙΑ" | "ΜΟΣΧΑΤΟ" | "ΟΔΟΝΥΜΙΟ";
  street: string;
}
export interface ISearchFilters {
  searchTerm: string;
  characters: number;
  searchMode: string;
  dataset: IDataSet;
}
