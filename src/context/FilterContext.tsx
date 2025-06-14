// src/context/FilterContext.tsx

'use client';

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { FilterContextType, FilterState, DataRow, FilterProviderProps } from '@/types';
import Papa from 'papaparse';

const FilterContext = createContext<FilterContextType | null>(null);

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within FilterProvider');
  }
  return context;
};

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [data, setData] = useState<DataRow[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    mod3: [],
    mod4: [],
    mod5: [],
    mod6: [],
  });

  useEffect(() => {
    // Helper to parse a CSV file and return a promise of DataRow[]
    const parseCSV = (url: string): Promise<DataRow[]> => {
      return fetch(url)
        .then(res => res.text())
        .then(csvText => {
          const parsed = Papa.parse<DataRow>(csvText, { header: true, skipEmptyLines: true });
          return parsed.data
            .filter(row => row.number !== undefined && row.mod3 !== undefined && row.mod4 !== undefined && row.mod5 !== undefined)
            .map((row: Partial<DataRow>) => ({
              number: Number(row.number),
              mod3: Number(row.mod3),
              mod4: Number(row.mod4),
              mod5: Number(row.mod5),
              mod6: row.mod6 !== undefined ? Number(row.mod6) : undefined,
            }));
        });
    };

    parseCSV('/dataset_small.csv').then((small) => {
      setData(small);
    });
  }, []);

  const filteredData = useMemo(() => {
    let result = data;
    Object.entries(filters).forEach(([column, selectedValues]) => {
      if (selectedValues.length > 0) {
        result = result.filter(row => 
          selectedValues.includes(row[column as keyof DataRow] as number)
        );
      }
    });
    return result;
  }, [data, filters]);

  const contextValue: FilterContextType = {
    filters,
    setFilters,
    data,
    filteredData,
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};
