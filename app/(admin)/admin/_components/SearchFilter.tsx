"use client";

import { Search, ChevronDown, Filter } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
}

interface SearchFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  searchPlaceholder?: string;
  filterValue: string;
  onFilterChange: (value: string) => void;
  filterOptions: FilterOption[];
  showFilterButton?: boolean;
}

export default function SearchFilter({
  searchValue,
  onSearchChange,
  onSearch,
  onKeyDown,
  searchPlaceholder = "검색...",
  filterValue,
  onFilterChange,
  filterOptions,
  showFilterButton = true,
}: SearchFilterProps) {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex flex-col sm:items-center sm:flex-row gap-4">
        {/* 검색 입력 */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={onKeyDown}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* 검색 버튼 */}
        <button
          onClick={onSearch}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Search className="w-5 h-5 mr-2" />
          <span>검색</span>
        </button>

        {/* 필터 셀렉트 */}
        <div className="relative">
          <select
            value={filterValue}
            onChange={(e) => onFilterChange(e.target.value)}
            className="appearance-none w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>

        {/* 필터 버튼 */}
        {showFilterButton && (
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5 mr-2 text-gray-600" />
            <span className="text-gray-700">필터</span>
          </button>
        )}
      </div>
    </div>
  );
}
