// src/components/MultiSelectDropdown.tsx

'use client';

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { MultiSelectDropdownProps } from '@/types';

export default function MultiSelectDropdown({
  column,
  options,
  selectedValues,
  onSelectionChange,
  label,
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handleClick(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  const filteredOptions = useMemo(() => {
    return options
      .filter(option => option !== undefined && option !== null)
      .filter(option => option.toString().includes(searchTerm.toLowerCase()));
  }, [options, searchTerm]);

  const handleToggleOption = useCallback((value: number) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onSelectionChange(column, newValues);
  }, [selectedValues, onSelectionChange, column]);

  const handleSelectAll = useCallback(() => {
    onSelectionChange(column, options);
  }, [column, options, onSelectionChange]);

  const handleClearAll = useCallback(() => {
    onSelectionChange(column, []);
  }, [column, onSelectionChange]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="w-full min-h-[40px] p-2 border border-gray-300 rounded-md bg-white text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-medium"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-stone-700 font-medium">
          {selectedValues.length === 0
            ? `All ${label}`
            : selectedValues.length <= 3
              ? selectedValues.join(', ')
              : `${selectedValues.length} selected`}
        </span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden text-black">
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <Search size={16} className="absolute left-2 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-8 pr-2 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-black bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="p-2 border-b border-gray-200 flex gap-2">
            <button
              className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleSelectAll}
            >
              Select All
            </button>
            <button
              className="text-xs px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={handleClearAll}
            >
              Clear All
            </button>
          </div>

          <div className="max-h-40 overflow-y-auto">
            {filteredOptions.map((option) => (
              <label
                key={option}
                className="flex items-center p-2 hover:bg-gray-50 cursor-pointer text-black"
              >
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedValues.includes(option)}
                  onChange={() => handleToggleOption(option)}
                />
                <span className="text-sm text-black">{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
