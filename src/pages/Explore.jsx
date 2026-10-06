import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Compass, RotateCcw, MapPin, Tag } from 'lucide-react';
import DestinationCard from '../components/DestinationCard';
import { DESTINATIONS, CATEGORIES, REGIONS } from '../data/destinationsData';
import './Explore.css';

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');

  // Keep search query synced if query params change
  useEffect(() => {
    const q = searchParams.get('search');
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  // Real-time filtering logic
  const filteredDestinations = DESTINATIONS.filter((dest) => {
    const matchesSearch = 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = 
      selectedCategory === 'All' || dest.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesRegion = 
      selectedRegion === 'All' || dest.region.toLowerCase() === selectedRegion.toLowerCase();

    return matchesSearch && matchesCategory && matchesRegion;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedRegion('All');
    setSearchParams({});
  };

  return (
    <div className="explore-page section-padding animate-fade-in">
      <div className="container">
        {/* Page Header */}
        <div className="explore-header text-center">
          <span className="badge badge-cyan mb-2">
            <Compass size={14} /> Global Destination Index
          </span>
          <h1 className="section-title">
            Explore <span className="text-gradient">World Gateways</span>
          </h1>
          <p className="section-subtitle">
            Filter through premier global cities, cultural capitals, and island paradises to plan your next journey.
          </p>
        </div>

        {/* Filter & Controls Bar */}
        <div className="explore-controls-panel glass-panel">
          {/* Real-time Search Input */}
          <div className="search-bar-wrapper">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search by city, country, or keyword (e.g. Paris, Beach, Italy)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value) {
                  setSearchParams({ search: e.target.value });
                } else {
                  setSearchParams({});
                }
              }}
            />
            {searchQuery && (
              <button onClick={() => { setSearchQuery(''); setSearchParams({}); }} className="clear-search-btn">
                Clear
              </button>
            )}
          </div>

          {/* Region Chips */}
          <div className="filter-chips-row">
            <span className="filter-label">
              <MapPin size={14} /> Region:
            </span>
            <div className="chips-group">
              {REGIONS.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`chip-btn ${selectedRegion === region ? 'chip-active' : ''}`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Category Chips */}
          <div className="filter-chips-row">
            <span className="filter-label">
              <Tag size={14} /> Style:
            </span>
            <div className="chips-group">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`chip-btn ${selectedCategory === category ? 'chip-active' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Info Bar */}
        <div className="results-info-bar">
          <span className="results-count">
            Showing <strong>{filteredDestinations.length}</strong> of <strong>{DESTINATIONS.length}</strong> destinations
          </span>
          {(searchQuery || selectedCategory !== 'All' || selectedRegion !== 'All') && (
            <button onClick={handleResetFilters} className="reset-filters-btn">
              <RotateCcw size={14} /> Reset All Filters
            </button>
          )}
        </div>

        {/* Destination Cards Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid-cards">
            {filteredDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        ) : (
          <div className="no-results-box glass-panel">
            <Compass size={48} className="no-results-icon" />
            <h3>No Destinations Found</h3>
            <p>We couldn't find any destinations matching your search criteria. Try adjusting your search query or filters.</p>
            <button onClick={handleResetFilters} className="btn-primary mt-3">
              <RotateCcw size={16} /> Reset Search Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
