// src/components/FilterPanel.tsx

'use client';

import React, { useCallback } from 'react';
import { useFilterContext } from '@/context/FilterContext';
import MultiSelectDropdown from './MultiSelectDropdown';
import { DataRow } from '@/types';

export default function FilterPanel() {
  const { filters, setFilters, data, filteredData } = useFilterContext();

  const getAvailableOptions = useCallback((column: string): number[] => {
    // Get data filtered by all OTHER filters (exclude current column)
    const otherFilters = Object.entries(filters).filter(([key]) => key !== column);
    
    let dataToConsider = data;
    
    // Apply all other filters
    otherFilters.forEach(([filterColumn, selectedValues]) => {
      if (selectedValues.length > 0) {
        dataToConsider = dataToConsider.filter(row => 
          selectedValues.includes(row[filterColumn as keyof DataRow] as number)
        );
      }
    });

    // Get unique values for current column
    const uniqueValues = Array.from(
      new Set(dataToConsider.map(row => row[column as keyof DataRow] as number))
    ).sort((a, b) => a - b);

    return uniqueValues;
  }, [data, filters]);

  const handleFilterChange = useCallback((column: string, values: number[]) => {
    setFilters({
      ...filters,
      [column]: values,
    });
  }, [filters, setFilters]);

  const columns = ['mod3', 'mod4', 'mod5', 'mod6'];
  const columnLabels = {
    mod3: 'Mod 3',
    mod4: 'Mod 4', 
    mod5: 'Mod 5',
    mod6: 'Mod 6',
  };

  return (
    <div className="filter-panel p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center gap-2">
        <span role='img' aria-label='filter'>🎛️</span> Filters
      </h2>
      <div className="space-y-4">
        {columns.map((column) => (
          <div key={column}>
            <label className="block text-sm font-medium mb-2">
              {columnLabels[column as keyof typeof columnLabels]}
            </label>
            <MultiSelectDropdown
              column={column}
              options={getAvailableOptions(column)}
              selectedValues={filters[column] || []}
              onSelectionChange={handleFilterChange}
              label={columnLabels[column as keyof typeof columnLabels]}
            />
          </div>
        ))}
      </div>
      
      <div className="result-box">
        <div className="text-stone-700">Total Records: {data.length}</div>
        <div className="text-stone-700">Filtered Records: {filteredData.length}</div>
      </div>
    </div>
  );
}
