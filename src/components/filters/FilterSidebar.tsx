"use client";

import { useState, useEffect } from "react"; // Added useEffect

interface FilterSidebarProps {
  onFilterChange: (filters: {
    priceRange?: { min?: number; max?: number };
    sortBy?: string; // e.g., 'price:asc', 'title:desc' - to match DummyJSON potential or be parsed
    searchQuery?: string;
  }) => void;
  // Removed initialFilters as filters are now applied on button click or search input change
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("default"); // 'default' means no specific sort order from sidebar
  const [searchQuery, setSearchQuery] = useState("");

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      // Apply search query along with other filters
      // This allows typing without firing a request on every keystroke
      // but still applies search when other filters are manually applied.
      // For instant search on type, the applyFilters call would be here.
      // For now, search is applied with the button or if other filters change.
      if (searchQuery.trim() !== "") {
        // If you want search to be instant, call handleApplyFilters here.
        // For now, it will be applied when the "Apply Filters" button is clicked.
      }
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]); // Removed onFilterChange from deps to avoid loop if it's not memoized

  const handleApplyFilters = () => {
    onFilterChange({
      priceRange: {
        min: minPrice ? parseFloat(minPrice) : undefined,
        max: maxPrice ? parseFloat(maxPrice) : undefined,
      },
      sortBy: sortBy === "default" ? undefined : sortBy,
      searchQuery: searchQuery.trim() || undefined,
    });
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Optionally, trigger apply filters immediately on search change, or wait for button
    // For now, we wait for the button or other filter interactions.
    // To make search instant (after debounce), you could call a version of handleApplyFilters here.
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    // Automatically apply filters when sort changes
    onFilterChange({
      priceRange: {
        min: minPrice ? parseFloat(minPrice) : undefined,
        max: maxPrice ? parseFloat(maxPrice) : undefined,
      },
      sortBy: e.target.value === "default" ? undefined : e.target.value,
      searchQuery: searchQuery.trim() || undefined,
    });
  };

  return (
    <aside className="md:top-16 md:sticky p-4 border-gray-200 dark:border-gray-800 md:border-r w-full md:w-1/4 md:h-[calc(100vh-4rem)] md:overflow-y-auto md:self-start">
      <h2 className="mb-4 font-semibold text-lg">Filters</h2>

      {/* Search Filter */}
      <div className="mb-6">
        <h3 className="mb-2 font-medium text-md">Search Products</h3>
        <input
          type="text"
          placeholder="Search by name, description..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="dark:bg-gray-700 p-2 border dark:border-gray-600 rounded-md w-full"
        />
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="mb-2 font-medium text-md">Price Range ($)</h3>
        <div className="flex items-center space-x-2 mb-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min="0"
            className="dark:bg-gray-700 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 p-2 border dark:border-gray-600 rounded-md w-full appearance-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min="0"
            className="dark:bg-gray-700 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 p-2 border dark:border-gray-600 rounded-md w-full appearance-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
      </div>

      {/* Sort By Filter */}
      <div className="mb-6">
        <h3 className="mb-2 font-medium text-md">Sort By</h3>
        <select
          value={sortBy}
          onChange={handleSortChange} // Updated to auto-apply
          className="dark:bg-gray-700 p-2 border dark:border-gray-600 rounded-md w-full"
        >
          <option value="default">Default (Relevance)</option>
          <option value="price:asc">Price: Low to High</option>
          <option value="price:desc">Price: High to Low</option>
          <option value="rating:desc">Rating: High to Low</option>
          <option value="title:asc">Title: A to Z</option>
          <option value="title:desc">Title: Z to A</option>
          {/* Add more DummyJSON compatible sort options if needed e.g. by discountPercentage */}
          {/* <option value="discountPercentage:desc">Discount: High to Low</option> */}
        </select>
      </div>

      <button
        onClick={handleApplyFilters}
        className="bg-blue-600 hover:bg-blue-700 p-2 rounded-md w-full text-white"
      >
        Apply Price & Search Filters
      </button>
    </aside>
  );
}
