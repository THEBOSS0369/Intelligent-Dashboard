// src/components/DataTable.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { DataTableProps } from '@/types';

export default function DataTable({ data, currentPage, onPageChange }: DataTableProps) {
  const rowsPerPage = 100;
  const visibleRows = 20;
  const totalPages = Math.ceil(data.length / rowsPerPage);
  
  const paginatedData = useMemo(() => {
    const startIndex = currentPage * rowsPerPage;
    return data.slice(startIndex, startIndex + rowsPerPage);
  }, [data, currentPage, rowsPerPage]);

  const [scrollTop, setScrollTop] = useState(0);
  const rowHeight = 40;
  
  const visibleStartIndex = Math.floor(scrollTop / rowHeight);
  const visibleEndIndex = Math.min(visibleStartIndex + visibleRows, paginatedData.length);
  const visibleData = paginatedData.slice(visibleStartIndex, visibleEndIndex);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div className="card">
      <div className="p-4 border-b border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg flex items-center gap-2">
        <span role="img" aria-label="table">📊</span>
        <h2 className="text-lg font-semibold text-indigo-700">Data Table</h2>
        <span className="ml-auto text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">{data.length} rows</span>
      </div>
      <p className="text-sm text-black px-4 pt-2 pb-1">
        Showing {data.length} total records (Page {currentPage + 1} of {totalPages})
      </p>
      <div className="overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 border-b border-indigo-200">
          <div className="grid grid-cols-5 gap-4 p-3 font-semibold text-sm text-indigo-800">
            <div>Number</div>
            <div>Mod 3</div>
            <div>Mod 4</div>
            <div>Mod 5</div>
            <div>Mod 6</div>
          </div>
        </div>
        <div
          className="relative overflow-auto"
          style={{ height: `${visibleRows * rowHeight}px` }}
          onScroll={handleScroll}
        >
          <div style={{ height: `${paginatedData.length * rowHeight}px` }}>
            <div 
              style={{ 
                transform: `translateY(${visibleStartIndex * rowHeight}px)`,
                position: 'absolute',
                width: '100%'
              }}
            >
              {visibleData.map((row, index) => (
                <div
                  key={visibleStartIndex + index}
                  className="grid grid-cols-5 gap-4 p-3 border-b border-gray-100 hover:bg-gradient-to-r hover:from-pink-50 hover:to-indigo-50 transition-colors duration-200"
                  style={{ height: `${rowHeight}px` }}
                >
                  <div className="text-sm text-indigo-900 font-medium">{row.number}</div>
                  <div className="text-sm text-purple-700">{row.mod3}</div>
                  <div className="text-sm text-pink-700">{row.mod4}</div>
                  <div className="text-sm text-blue-700">{row.mod5}</div>
                  <div className="text-sm text-indigo-700">{row.mod6}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <div className="p-4 border-t border-indigo-200 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 rounded-b-lg">
        <button
          className="btn-primary text-xs"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <div className="flex items-center gap-2">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = currentPage < 3 ? i : currentPage - 2 + i;
            if (pageNum >= totalPages) return null;
            return (
              <button
                key={pageNum}
                className={`px-3 py-1 text-sm rounded font-semibold ${
                  currentPage === pageNum 
                    ? 'bg-gradient-to-r from-pink-500 to-indigo-500 text-white shadow' 
                    : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                }`}
                onClick={() => onPageChange(pageNum)}
              >
                {pageNum + 1}
              </button>
            );
          })}
        </div>
        <button
          className="btn-primary text-xs"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
