import React, { useState } from 'react';
import { Navigation, Search, MapPin, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import './LocationSelector.css';

export default function LocationSelector({ onLocationDetected, onCitySearch, loading }) {
  const [geoState, setGeoState] = useState({
    loading: false,
    error: null,
    coords: null
  });
  const [cityInput, setCityInput] = useState('');

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGeoState({
        loading: false,
        error: "Geolocation is not supported by your browser.",
        coords: null
      });
      return;
    }

    setGeoState({ loading: true, error: null, coords: null });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        };
        setGeoState({
          loading: false,
          error: null,
          coords
        });
        if (onLocationDetected) {
          onLocationDetected(coords);
        }
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location.";
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage = "Location permission denied. Please allow location access or search manually.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage = "Location information is unavailable.";
        } else if (error.code === error.TIMEOUT) {
          errorMessage = "The request to get user location timed out.";
        }

        setGeoState({
          loading: false,
          error: errorMessage,
          coords: null
        });
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (cityInput.trim() && onCitySearch) {
      onCitySearch(cityInput.trim());
    }
  };

  return (
    <div className="location-selector-box glass-panel">
      <div className="selector-grid">
        {/* Geolocation Section */}
        <div className="geo-section">
          <button 
            onClick={handleGetCurrentLocation} 
            className="btn-primary geo-btn"
            disabled={geoState.loading || loading}
          >
            {geoState.loading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Detecting Location...
              </>
            ) : (
              <>
                <Navigation size={18} /> Use My Current Location
              </>
            )}
          </button>

          {geoState.coords && (
            <div className="geo-success-badge">
              <CheckCircle2 size={16} /> 
              <span>Coords: {geoState.coords.lat.toFixed(4)}°, {geoState.coords.lon.toFixed(4)}°</span>
            </div>
          )}

          {geoState.error && (
            <div className="geo-error-badge">
              <AlertCircle size={16} /> <span>{geoState.error}</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="selector-divider">
          <span>OR</span>
        </div>

        {/* Manual City Search Section */}
        <form onSubmit={handleSearchSubmit} className="city-search-form">
          <div className="city-input-wrapper">
            <MapPin size={18} className="input-pin-icon" />
            <input 
              type="text" 
              placeholder="Search any city (e.g. Sydney, Cairo, Toronto)..."
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
            />
            <button type="submit" className="city-search-btn" title="Search City">
              <Search size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
