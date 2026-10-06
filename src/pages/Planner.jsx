import React, { useState } from 'react';
import { Sparkles, Calendar, Compass, CheckSquare, Square, RotateCcw, MapPin } from 'lucide-react';
import { DESTINATIONS } from '../data/destinationsData';
import { generateStructuredItinerary } from '../services/geminiService';
import ItineraryCard from '../components/ItineraryCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import './Planner.css';

const INTEREST_OPTIONS = [
  { id: 'Food', label: 'Culinary & Street Food' },
  { id: 'History', label: 'History & Architecture' },
  { id: 'Nature', label: 'Nature & Scenic Parks' },
  { id: 'Adventure', label: 'Adventure & Outdoors' },
  { id: 'Shopping', label: 'Shopping & Local Markets' },
  { id: 'Photography', label: 'Photography Spots' },
  { id: 'Nightlife', label: 'Nightlife & Lounges' }
];

export default function Planner() {
  const [destination, setDestination] = useState('Paris');
  const [customCity, setCustomCity] = useState('');
  const [useCustomCity, setUseCustomCity] = useState(false);
  const [days, setDays] = useState(3);
  const [selectedInterests, setSelectedInterests] = useState(['Food', 'History', 'Nature']);

  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleInterest = (interestId) => {
    if (selectedInterests.includes(interestId)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interestId));
    } else {
      setSelectedInterests([...selectedInterests, interestId]);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    const targetCity = useCustomCity && customCity.trim() ? customCity.trim() : destination;
    
    if (!targetCity) return;

    setLoading(true);
    setError(null);
    setItinerary(null);

    try {
      const data = await generateStructuredItinerary(targetCity, days, selectedInterests);
      setItinerary(data);
    } catch (err) {
      console.error("Itinerary Generation Error:", err);
      setError("Failed to generate itinerary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="planner-page section-padding animate-fade-in">
      <div className="container">
        {/* Page Header */}
        <div className="planner-header text-center">
          <span className="badge badge-cyan mb-2">
            <Sparkles size={14} /> Gemini AI Itinerary Studio
          </span>
          <h1 className="section-title">
            AI Travel <span className="text-gradient">Planner Engine</span>
          </h1>
          <p className="section-subtitle">
            Configure your destination, duration, and preferences to build a structured, day-by-day morning, afternoon, and evening travel itinerary.
          </p>
        </div>

        {/* Input Form Box */}
        <div className="planner-form-card glass-panel">
          <form onSubmit={handleGenerate} className="planner-form">
            {/* Step 1: Destination Selection */}
            <div className="form-group">
              <label className="form-label">
                <MapPin size={16} className="label-icon" /> 1. Select Target Destination
              </label>
              
              {!useCustomCity ? (
                <div className="select-row">
                  <select 
                    value={destination} 
                    onChange={(e) => setDestination(e.target.value)}
                    className="form-select"
                  >
                    {DESTINATIONS.map(d => (
                      <option key={d.id} value={d.name}>{d.name}, {d.country}</option>
                    ))}
                  </select>
                  <button 
                    type="button" 
                    onClick={() => setUseCustomCity(true)}
                    className="toggle-custom-btn"
                  >
                    Type Custom City
                  </button>
                </div>
              ) : (
                <div className="select-row">
                  <input 
                    type="text" 
                    placeholder="Enter any city name (e.g. Barcelona, Kyoto, Cape Town)..."
                    value={customCity}
                    onChange={(e) => setCustomCity(e.target.value)}
                    className="form-input"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setUseCustomCity(false)}
                    className="toggle-custom-btn"
                  >
                    Select Preset
                  </button>
                </div>
              )}
            </div>

            {/* Step 2: Trip Duration */}
            <div className="form-group">
              <label className="form-label">
                <Calendar size={16} className="label-icon" /> 2. Trip Duration (Days): <strong>{days} Days</strong>
              </label>
              <div className="days-range-row">
                <input 
                  type="range" 
                  min="1" 
                  max="7" 
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value, 10))}
                  className="days-slider"
                />
                <div className="days-ticks">
                  {[1, 2, 3, 4, 5, 6, 7].map(d => (
                    <span 
                      key={d} 
                      onClick={() => setDays(d)}
                      className={`day-tick ${days === d ? 'tick-active' : ''}`}
                    >
                      {d}D
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Travel Interests */}
            <div className="form-group">
              <label className="form-label">
                <Compass size={16} className="label-icon" /> 3. Select Travel Interests & Style
              </label>
              <div className="interests-grid">
                {INTEREST_OPTIONS.map(option => {
                  const isChecked = selectedInterests.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => toggleInterest(option.id)}
                      className={`interest-card ${isChecked ? 'interest-selected' : ''}`}
                    >
                      {isChecked ? <CheckSquare size={16} className="text-cyan" /> : <Square size={16} />}
                      <span>{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-submit-row">
              <button 
                type="submit" 
                className="btn-primary generate-submit-btn"
                disabled={loading}
              >
                <Sparkles size={20} /> {loading ? "Crafting Your AI Itinerary..." : "Generate My Itinerary"}
              </button>
            </div>
          </form>
        </div>

        {/* Results / Output Area */}
        <div className="mt-5">
          {loading && <LoadingSkeleton type="itinerary" />}

          {error && (
            <div className="error-banner glass-panel">
              <p>{error}</p>
              <button onClick={handleGenerate} className="btn-secondary btn-sm mt-2">
                <RotateCcw size={14} /> Retry Generation
              </button>
            </div>
          )}

          {itinerary && !loading && (
            <ItineraryCard itineraryData={itinerary} />
          )}
        </div>
      </div>
    </div>
  );
}
