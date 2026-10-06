import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Compass, CloudSun, MapPin, ShieldCheck, Zap, ArrowRight, Star, Globe } from 'lucide-react';
import Hero from '../components/Hero';
import DestinationCard from '../components/DestinationCard';
import WeatherWidget from '../components/WeatherWidget';
import { DESTINATIONS } from '../data/destinationsData';
import { fetchWeatherByCity } from '../services/weatherService';
import './Home.css';

export default function Home() {
  const [featuredWeather, setFeaturedWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  // Fetch initial quick snapshot weather for Paris or current focus
  useEffect(() => {
    let isMounted = true;
    const loadQuickWeather = async () => {
      setWeatherLoading(true);
      const data = await fetchWeatherByCity('Paris');
      if (isMounted) {
        setFeaturedWeather(data);
        setWeatherLoading(false);
      }
    };
    loadQuickWeather();
    return () => { isMounted = false; };
  }, []);

  const featuredDestinations = DESTINATIONS.slice(0, 6);

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <Hero />

      {/* Quick Live Weather Snapshot Bar */}
      <section className="section-padding snapshot-section">
        <div className="container">
          <div className="snapshot-card glass-panel">
            <div className="snapshot-left">
              <span className="badge badge-cyan mb-2">
                <CloudSun size={14} /> Live Global Snapshot
              </span>
              <h2 className="snapshot-title">
                Real-Time Weather Intelligence
              </h2>
              <p className="snapshot-desc">
                Stay updated with live atmospheric metrics, temperatures, humidity, and wind conditions before booking your dream getaway.
              </p>
              <Link to="/weather" className="btn-secondary snapshot-btn">
                Check Any Location Weather <ArrowRight size={16} />
              </Link>
            </div>

            <div className="snapshot-right">
              <WeatherWidget 
                weatherData={featuredWeather} 
                loading={weatherLoading} 
                onRefresh={async () => {
                  setWeatherLoading(true);
                  const data = await fetchWeatherByCity('Paris');
                  setFeaturedWeather(data);
                  setWeatherLoading(false);
                }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section id="featured-destinations" className="section-padding">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="badge badge-amber mb-2">
                <Compass size={14} /> Popular Destinations
              </span>
              <h2 className="section-title text-left">
                Explore World-Famous Gateways
              </h2>
              <p className="section-subtitle text-left">
                Handpicked global cities featuring rich culture, luxury resorts, ancient monuments, and pristine beaches.
              </p>
            </div>

            <Link to="/explore" className="btn-primary view-all-btn">
              View All Destinations <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-cards mt-4">
            {featuredDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose WanderSphere - Features Showcase */}
      <section className="section-padding why-us-section">
        <div className="container">
          <span className="badge badge-purple mb-2 center-badge">
            <Zap size={14} /> Next-Gen Technology
          </span>
          <h2 className="section-title">
            Why Travelers Choose <span className="text-gradient">WanderSphere</span>
          </h2>
          <p className="section-subtitle">
            Combining cutting-edge artificial intelligence, real-time weather analytics, and high-definition imagery into one seamless experience.
          </p>

          <div className="features-grid">
            <div className="feature-card glass-card">
              <div className="feature-icon-wrapper bg-cyan">
                <Sparkles size={24} />
              </div>
              <h3 className="feature-title">AI Itinerary Generator</h3>
              <p className="feature-desc">
                Generates structured Day-by-Day travel plans tailored to your specific trip duration, budget, and travel interests in seconds.
              </p>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon-wrapper bg-amber">
                <CloudSun size={24} />
              </div>
              <h3 className="feature-title">Live Weather & Geolocation</h3>
              <p className="feature-desc">
                Seamlessly detects your current location via browser Geolocation and fetches real-time OpenWeather satellite data.
              </p>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon-wrapper bg-purple">
                <Globe size={24} />
              </div>
              <h3 className="feature-title">Dynamic Imagery</h3>
              <p className="feature-desc">
                Integrates Unsplash photography services to stream high-resolution landmark and city imagery dynamically as you search.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick AI Planner Banner */}
      <section className="section-padding banner-section">
        <div className="container">
          <div className="planner-banner glass-panel">
            <div className="banner-content">
              <span className="badge badge-cyan mb-2">
                <Sparkles size={14} /> Instant Travel Concierge
              </span>
              <h2 className="banner-heading">
                Ready to plan your next extraordinary vacation?
              </h2>
              <p className="banner-subtext">
                Let Google Gemini AI craft your customized schedule with morning, afternoon, and evening recommendations.
              </p>
              <Link to="/planner" className="btn-primary banner-btn">
                <Sparkles size={18} /> Generate Free AI Itinerary
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
