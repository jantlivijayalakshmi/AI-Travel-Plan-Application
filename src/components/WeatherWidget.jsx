import React from 'react';
import { CloudSun, Droplets, Wind, Thermometer, MapPin, RefreshCw, AlertCircle } from 'lucide-react';
import './WeatherWidget.css';

export default function WeatherWidget({ weatherData, loading, error, onRefresh }) {
  if (loading) {
    return (
      <div className="weather-widget glass-panel skeleton-container">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-temp"></div>
        <div className="skeleton-grid">
          <div className="skeleton skeleton-box"></div>
          <div className="skeleton skeleton-box"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-widget glass-panel error-panel">
        <AlertCircle size={28} className="error-icon" />
        <p className="error-message">{error}</p>
        {onRefresh && (
          <button onClick={onRefresh} className="btn-secondary btn-sm">
            <RefreshCw size={14} /> Try Again
          </button>
        )}
      </div>
    );
  }

  if (!weatherData) return null;

  return (
    <div className="weather-widget glass-panel animate-fade-in">
      {/* Header */}
      <div className="weather-header">
        <div className="weather-location">
          <MapPin size={18} className="location-pin" />
          <span className="weather-city">{weatherData.city}</span>
          {weatherData.country && <span className="weather-country">, {weatherData.country}</span>}
        </div>
        {onRefresh && (
          <button onClick={onRefresh} className="refresh-btn" title="Refresh Weather">
            <RefreshCw size={15} />
          </button>
        )}
      </div>

      {/* Main Temperature Showcase */}
      <div className="weather-main-row">
        <div className="weather-temp-group">
          <span className="weather-temp-main">{weatherData.temp}°C</span>
          <span className="weather-condition-text">{weatherData.condition}</span>
          <span className="weather-desc-sub">{weatherData.description}</span>
        </div>

        <div className="weather-icon-group">
          {weatherData.iconUrl ? (
            <img src={weatherData.iconUrl} alt={weatherData.condition} className="weather-icon-img" />
          ) : (
            <CloudSun size={50} className="weather-icon-fallback" />
          )}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="weather-metrics-grid">
        <div className="metric-box">
          <Thermometer size={16} className="metric-icon metric-cyan" />
          <div className="metric-info">
            <span className="metric-label">Feels Like</span>
            <span className="metric-val">{weatherData.feelsLike}°C</span>
          </div>
        </div>

        <div className="metric-box">
          <Droplets size={16} className="metric-icon metric-blue" />
          <div className="metric-info">
            <span className="metric-label">Humidity</span>
            <span className="metric-val">{weatherData.humidity}%</span>
          </div>
        </div>

        <div className="metric-box">
          <Wind size={16} className="metric-icon metric-teal" />
          <div className="metric-info">
            <span className="metric-label">Wind Speed</span>
            <span className="metric-val">{weatherData.windSpeed} m/s</span>
          </div>
        </div>
      </div>

      {weatherData.isFallback && (
        <div className="fallback-note">
          ⚡ Demo mode: Add OpenWeather API key to .env for live satellite weather
        </div>
      )}
    </div>
  );
}
