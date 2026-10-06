import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, Calendar, Clock, DollarSign, Globe, CloudSun, Landmark, Bot, Sparkles, ArrowLeft } from 'lucide-react';
import { DESTINATIONS } from '../data/destinationsData';
import { fetchDynamicImage } from '../services/unsplashService';
import { fetchWeatherByCity } from '../services/weatherService';
import FamousPlaceCard from '../components/FamousPlaceCard';
import WeatherWidget from '../components/WeatherWidget';
import ChatbotWidget from '../components/ChatbotWidget';
import { generateStructuredItinerary } from '../services/geminiService';
import ItineraryCard from '../components/ItineraryCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import './DestinationDetails.css';

export default function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find destination from dataset or fallback to first
  const destination = DESTINATIONS.find(d => d.id === id) || DESTINATIONS[0];

  const [heroImage, setHeroImage] = useState(destination.heroImage);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  // Quick Itinerary State
  const [itinerary, setItinerary] = useState(null);
  const [itineraryLoading, setItineraryLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    // 1. Fetch Dynamic Hero Image
    const loadHeroImage = async () => {
      const dynamicUrl = await fetchDynamicImage(
        `${destination.name} ${destination.country} landscape`,
        destination.heroImage
      );
      if (isMounted) setHeroImage(dynamicUrl);
    };

    // 2. Fetch Live Weather for Destination
    const loadWeather = async () => {
      setWeatherLoading(true);
      const data = await fetchWeatherByCity(destination.name);
      if (isMounted) {
        setWeatherData(data);
        setWeatherLoading(false);
      }
    };

    loadHeroImage();
    loadWeather();

    return () => { isMounted = false; };
  }, [destination]);

  // Quick Itinerary Generator
  const handleGenerateQuickItinerary = async () => {
    setItineraryLoading(true);
    const data = await generateStructuredItinerary(destination.name, 3, ['Sightseeing', 'Culture', 'Food']);
    setItinerary(data);
    setItineraryLoading(false);
  };

  return (
    <div className="destination-details-page animate-fade-in">
      {/* Hero Banner Section */}
      <div className="details-hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="details-hero-overlay"></div>
        <div className="container details-hero-container">
          <Link to="/explore" className="back-link-btn">
            <ArrowLeft size={16} /> Back to Explore
          </Link>

          <div className="details-hero-badges">
            <span className="badge badge-cyan">{destination.category}</span>
            <span className="badge badge-amber">
              <Star size={12} fill="#f59e0b" /> {destination.rating} Rating
            </span>
          </div>

          <h1 className="details-hero-title">{destination.name}</h1>
          <span className="details-hero-country">
            <MapPin size={18} /> {destination.country} • {destination.region}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container section-padding">
        {/* Quick Info Grid Cards */}
        <div className="overview-metrics-grid">
          <div className="metric-card glass-panel">
            <Calendar size={22} className="metric-icon metric-cyan" />
            <div>
              <span className="metric-title">Best Time to Visit</span>
              <p className="metric-desc">{destination.bestTime}</p>
            </div>
          </div>

          <div className="metric-card glass-panel">
            <Clock size={22} className="metric-icon metric-amber" />
            <div>
              <span className="metric-title">Recommended Stay</span>
              <p className="metric-desc">{destination.recommendedDays}</p>
            </div>
          </div>

          <div className="metric-card glass-panel">
            <DollarSign size={22} className="metric-icon metric-emerald" />
            <div>
              <span className="metric-title">Currency</span>
              <p className="metric-desc">{destination.currency}</p>
            </div>
          </div>

          <div className="metric-card glass-panel">
            <Globe size={22} className="metric-icon metric-purple" />
            <div>
              <span className="metric-title">Official Language</span>
              <p className="metric-desc">{destination.language}</p>
            </div>
          </div>
        </div>

        {/* Description & Weather Layout */}
        <div className="details-split-layout mt-5">
          <div className="details-main-info glass-panel">
            <h2 className="content-heading">About {destination.name}</h2>
            <p className="description-text">{destination.fullDescription}</p>

            <div className="quick-tip-box">
              <strong>💡 WanderSphere Insider Tip:</strong> Reserve tickets for top famous attractions early to bypass long queues. Utilize local transit options for an authentic city experience!
            </div>
          </div>

          {/* Live Weather Box */}
          <div className="details-weather-column">
            <h3 className="content-subheading">
              <CloudSun size={20} className="icon-accent" /> Live Local Weather
            </h3>
            <WeatherWidget 
              weatherData={weatherData} 
              loading={weatherLoading} 
              onRefresh={async () => {
                setWeatherLoading(true);
                const data = await fetchWeatherByCity(destination.name);
                setWeatherData(data);
                setWeatherLoading(false);
              }}
            />
          </div>
        </div>

        {/* Famous Places Showcase Section */}
        <section className="mt-6">
          <div className="section-header-block">
            <span className="badge badge-amber mb-2">
              <Landmark size={14} /> Top Attractions
            </span>
            <h2 className="content-heading">Famous Tourist Places in {destination.name}</h2>
            <p className="section-subtitle text-left">
              Explore iconic landmarks, world-renowned museums, historic architecture, and vibrant urban hotspots.
            </p>
          </div>

          <div className="grid-cards mt-4">
            {destination.famousPlaces.map((place) => (
              <FamousPlaceCard key={place.id} place={place} cityName={destination.name} />
            ))}
          </div>
        </section>

        {/* Interactive AI Chatbot Section */}
        <section className="mt-6">
          <div className="section-header-block">
            <span className="badge badge-purple mb-2">
              <Bot size={14} /> AI Assistant
            </span>
            <h2 className="content-heading">Ask WanderSphere AI about {destination.name}</h2>
            <p className="section-subtitle text-left">
              Have questions about duration, budget, local etiquette, or food? Chat with our Google Gemini-powered travel concierge.
            </p>
          </div>

          <div className="mt-4">
            <ChatbotWidget destinationContext={destination} />
          </div>
        </section>

        {/* Quick Itinerary Generator Section */}
        <section className="mt-6">
          <div className="itinerary-banner-box glass-panel">
            <div className="banner-text-side">
              <span className="badge badge-cyan mb-2">
                <Sparkles size={14} /> AI Itinerary Engine
              </span>
              <h2 className="banner-heading text-left">
                Generate a 3-Day Plan for {destination.name}
              </h2>
              <p className="banner-subtext text-left">
                Click below to instantly generate a day-by-day morning, afternoon, and evening schedule parsed into beautiful interactive cards.
              </p>
              <button 
                onClick={handleGenerateQuickItinerary} 
                className="btn-primary mt-2"
                disabled={itineraryLoading}
              >
                <Sparkles size={18} /> {itineraryLoading ? "Generating AI Plan..." : "Generate 3-Day Itinerary"}
              </button>
            </div>
          </div>

          {/* Render Itinerary Results */}
          <div className="mt-4">
            {itineraryLoading && <LoadingSkeleton type="itinerary" />}
            {itinerary && !itineraryLoading && <ItineraryCard itineraryData={itinerary} />}
          </div>
        </section>
      </div>
    </div>
  );
}
