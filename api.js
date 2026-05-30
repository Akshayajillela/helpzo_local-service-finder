import React, { useState } from 'react';

const CATEGORIES = [
  { value: 'all', label: 'All Categories', icon: '🔍' },
  { value: 'plumber', label: 'Plumber', icon: '🔧' },
  { value: 'electrician', label: 'Electrician', icon: '⚡' },
  { value: 'carpenter', label: 'Carpenter', icon: '🪵' },
  { value: 'mechanic', label: 'Mechanic', icon: '🔩' },
  { value: 'painter', label: 'Painter', icon: '🎨' },
  { value: 'cleaner', label: 'Cleaner', icon: '🧹' },
  { value: 'gardener', label: 'Gardener', icon: '🌿' },
];

const SearchBar = ({ onSearch, initialValues = {} }) => {
  const [search, setSearch] = useState(initialValues.search || '');
  const [location, setLocation] = useState(initialValues.location || '');
  const [category, setCategory] = useState(initialValues.category || 'all');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ search, location, category });
  };

  const handleCategoryClick = (val) => {
    const newCat = val;
    setCategory(newCat);
    onSearch({ search, location, category: newCat });
  };

  return (
    <div className="w-full">
      {/* Main Search Form */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        {/* Location Input */}
        <div className="relative sm:w-52">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <input
            type="text"
            placeholder="Location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        {/* Submit */}
        <button type="submit" className="btn-primary flex items-center justify-center gap-2 sm:w-auto">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search
        </button>
      </form>

      {/* Category Chips */}
      <div className="flex flex-wrap gap-2 mt-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => handleCategoryClick(cat.value)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
              category === cat.value
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white border border-stone-200 text-stone-600 hover:border-brand-300 hover:text-brand-700'
            }`}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
export { CATEGORIES };
