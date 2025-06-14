// src/components/DashboardContent.tsx

'use client';

import React from 'react';
import { useFilterContext } from '@/context/FilterContext';
import DataTable from './DataTable';
import { DashboardContentProps } from '@/types';

export default function DashboardContent({ 
  currentPage, 
  onPageChange 
}: DashboardContentProps) {
  const { filteredData } = useFilterContext();

  return (
    <DataTable 
      data={filteredData}
      currentPage={currentPage}
      onPageChange={onPageChange}
    />
  );
}
