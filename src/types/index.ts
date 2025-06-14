// src/types/index.ts

export interface DataRow {
  number: number;
  mod3: number;
  mod4: number;
  mod5: number;
  mod6?: number;
}

export interface FilterState {
  [key: string]: number[];
}

export interface FilterContextType {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  data: DataRow[];
  filteredData: DataRow[];
}

export interface MultiSelectDropdownProps {
  column: string;
  options: number[];
  selectedValues: number[];
  onSelectionChange: (column: string, values: number[]) => void;
  label: string;
}

export interface DataTableProps {
  data: DataRow[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

export interface FilterProviderProps {
  children: React.ReactNode;
}

export interface DashboardContentProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}
