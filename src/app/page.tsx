// src/app/page.tsx

'use client';

import React, { useState } from 'react';
import { FilterProvider } from '@/context/FilterContext';
import { FilterPanel } from '@/components';
import DashboardContent from '@/components/DashboardContent';

export default function Page() {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <FilterProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-stone-600">
              Business Intelligence Dashboard
            </h1>
            <p className="text-gray-700 mt-3 text-lg">
              Advanced filtering system with real-time data interaction
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 animate-slide-in">
              <div className="glass p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <FilterPanel />
              </div>
            </div>
            
            <div className="lg:col-span-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="glass p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <DashboardContent 
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FilterProvider>
  );
}
