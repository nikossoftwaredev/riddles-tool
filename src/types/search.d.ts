export type IDataSet = "ΡΕΝΤΗΣ" | "ΝΙΚΑΙΑ" | "ΜΟΣΧΑΤΟ" | "ΟΛΑ";
export interface LocationInfo {
  town: "ΡΕΝΤΗΣ" | "ΝΙΚΑΙΑ" | "ΜΟΣΧΑΤΟ";
  street: string;
}
export interface ISearchFilters {
  searchTerm: string;
  characters: number;
  searchMode: string;
  dataset: IDataSet;
}
