import React, { useState, useEffect } from 'react';
import { CloudSun, Navigation, MapPin, Compass, ShieldCheck } from 'lucide-react';
import LocationSelector from '../components/LocationSelector';
import WeatherWidget from '../components/WeatherWidget';
import { fetchWeatherByCity, fetchWeatherByCoords } from '../services/weatherService';
import './WeatherPage.css';

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load default city (Paris) on mount
  useEffect(() => {
    let isMounted = true;
    const loadInitial = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeatherByCity('Paris');
        if (isMounted) setWeatherData(data);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadInitial();
    return () => { isMounted = false; };
  }, []);

  const handleLocationDetected = async (coords) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherByCoords(coords.lat, coords.lon);
      setWeatherData(data);
    } catch (err) {
      setError("Failed to fetch weather for your coordinates.");
    } finally {
      setLoading(false);
    }
  };

  const handleCitySearch = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherByCity(cityName);
      setWeatherData(data);
    } catch (err) {
      setError(`Failed to fetch weather for "${cityName}".`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-page section-padding animate-fade-in">
      <div className="container">
        {/* Header */}
        <div className="weather-page-header text-center">
          <span className="badge badge-cyan mb-2">
            <CloudSun size={14} /> OpenWeather Live Intelligence
          </span>
          <h1 className="section-title">
            Location Awareness & <span className="text-gradient">Live Weather</span>
          </h1>
          <p className="section-subtitle">
            Grant browser location permissions or search any global city to fetch real-time temperatures, humidity, wind conditions, and weather metrics.
          </p>
        </div>

        {/* Location Selector Component */}
        <LocationSelector 
          onLocationDetected={handleLocationDetected}
          onCitySearch={handleCitySearch}
          loading={loading}
        />

        {/* Live Weather Display */}
        <div className="weather-display-container">
          <WeatherWidget 
            weatherData={weatherData} 
            loading={loading} 
            error={error}
            onRefresh={() => {
              if (weatherData?.city) {
                handleCitySearch(weatherData.city);
              }
            }} 
          />
        </div>

        {/* Quick Travel Weather Tips */}
        <div className="weather-tips-grid mt-5">
          <div className="tip-card glass-panel">
            <Navigation className="tip-icon text-cyan" size={24} />
            <h4 className="tip-title">Browser Geolocation</h4>
            <p className="tip-desc">
              Your exact latitude and longitude are calculated via GPS/Wi-Fi positioning for high-accuracy local temperature updates.
            </p>
          </div>

          <div className="tip-card glass-panel">
            <CloudSun className="tip-icon text-amber" size={24} />
            <h4 className="tip-title">Atmospheric Metrics</h4>
            <p className="tip-desc">
              Monitor humidity levels and real-time wind speeds to pack appropriate clothing and schedule outdoor sightseeing.
            </p>
          </div>

          <div className="tip-card glass-panel">
            <ShieldCheck className="tip-icon text-emerald" size={24} />
            <h4 className="tip-title">Privacy Guaranteed</h4>
            <p className="tip-desc">
              Your location coordinates are processed client-side only for weather retrieval and are never saved or stored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
