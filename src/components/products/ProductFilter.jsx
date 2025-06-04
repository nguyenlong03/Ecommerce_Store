import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

const ProductFilter = ({ categories, priceRanges, onFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilterChange({ category, priceRange: selectedPriceRange });
  };

  const handlePriceRangeChange = (priceRange) => {
    setSelectedPriceRange(priceRange);
    onFilterChange({ category: selectedCategory, priceRange });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {/* Mobile filter toggle */}
      <div className="lg:hidden flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        <button 
          className="flex items-center text-gray-600 hover:text-blue-600"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-5 w-5 mr-1" />
          <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
        </button>
      </div>

      {/* Filter sections */}
      <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
        {/* Categories */}
        <div>
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('categories')}
          >
            <h4 className="text-base font-medium text-gray-900">Categories</h4>
            {expandedSections.categories ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </div>
          
          {expandedSections.categories && (
            <div className="mt-2 space-y-1">
              <div className="flex items-center">
                <input
                  id="category-all"
                  type="radio"
                  name="category"
                  value="all"
                  checked={selectedCategory === 'all'}
                  onChange={() => handleCategoryChange('all')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="category-all" className="ml-2 text-sm text-gray-700">
                  All Categories
                </label>
              </div>
              
              {categories.map((category) => (
                <div key={category.value} className="flex items-center">
                  <input
                    id={`category-${category.value}`}
                    type="radio"
                    name="category"
                    value={category.value}
                    checked={selectedCategory === category.value}
                    onChange={() => handleCategoryChange(category.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`category-${category.value}`} className="ml-2 text-sm text-gray-700">
                    {category.label}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Price Range */}
        <div>
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('price')}
          >
            <h4 className="text-base font-medium text-gray-900">Price Range</h4>
            {expandedSections.price ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </div>
          
          {expandedSections.price && (
            <div className="mt-2 space-y-1">
              <div className="flex items-center">
                <input
                  id="price-all"
                  type="radio"
                  name="price"
                  value="all"
                  checked={selectedPriceRange === 'all'}
                  onChange={() => handlePriceRangeChange('all')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="price-all" className="ml-2 text-sm text-gray-700">
                  All Prices
                </label>
              </div>
              
              {priceRanges.map((range) => (
                <div key={range.value} className="flex items-center">
                  <input
                    id={`price-${range.value}`}
                    type="radio"
                    name="price"
                    value={range.value}
                    checked={selectedPriceRange === range.value}
                    onChange={() => handlePriceRangeChange(range.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`price-${range.value}`} className="ml-2 text-sm text-gray-700">
                    {range.label}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;