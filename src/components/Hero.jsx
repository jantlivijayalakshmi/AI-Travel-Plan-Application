import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, MapPin, Compass, ArrowDown } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  const scrollToExplore = () => {
    const section = document.getElementById('featured-destinations');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/explore');
    }
  };

  return (
    <section className="hero-section">
      {/* Background Video / Media Overlay */}
      <div className="hero-video-wrapper">
        <video 
          className="hero-video"
          autoPlay 
          loop 
          muted 
          playsInline
          poster="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=80"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-top-view-of-waves-coming-to-a-beach-41584-large.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className="hero-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="container hero-content-container">
        <div className="hero-badge animate-fade-in">
          <Sparkles size={14} /> AI-Powered Next Gen Travel Platform
        </div>

        <h1 className="hero-title animate-fade-in">
          Explore the World <span className="text-gradient">Without Limits</span>
        </h1>

        <p className="hero-subtitle animate-fade-in">
          Unlock personalized AI itineraries, real-time weather insights, dynamic destination guides, and seamless trip planning tailored specifically for you.
        </p>

        {/* Quick Search Bar */}
        <form onSubmit={handleSearch} className="hero-search-box animate-fade-in">
          <div className="search-input-wrapper">
            <MapPin className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Where do you want to explore? (e.g., Paris, Tokyo, Bali)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary search-submit-btn">
            <Search size={18} /> Search
          </button>
        </form>

        {/* Action Buttons */}
        <div className="hero-actions animate-fade-in">
          <button onClick={scrollToExplore} className="btn-primary">
            <Compass size={18} /> Explore Destinations
          </button>
          <button onClick={() => navigate('/planner')} className="btn-secondary">
            <Sparkles size={18} /> Plan with AI
          </button>
        </div>

        {/* Live Metrics Showcase */}
        <div className="hero-stats animate-fade-in">
          <div className="stat-card">
            <span className="stat-value">50+</span>
            <span className="stat-label">Global Cities</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-card">
            <span className="stat-value">10k+</span>
            <span className="stat-label">AI Itineraries</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-card">
            <span className="stat-value">4.9★</span>
            <span className="stat-label">Traveler Rating</span>
          </div>
        </div>
      </div>

      {/* Smooth Scroll Indicator */}
      <button 
        onClick={scrollToExplore} 
        className="scroll-down-btn"
        aria-label="Scroll Down to Explore"
      >
        <ArrowDown size={20} />
      </button>
    </section>
  );
}
