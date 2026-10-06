import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Send, Heart, Globe2, ShieldCheck, Zap } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="footer-root">
      <div className="container footer-container">
        {/* Brand & Newsletter Column */}
        <div className="footer-col brand-col">
          <Link to="/" className="navbar-brand mb-3">
            <div className="logo-icon-wrapper">
              <Compass className="logo-icon" />
            </div>
            <span className="logo-text">
              Wander<span className="logo-accent">Sphere</span>
            </span>
          </Link>

          <p className="footer-desc">
            Explore the world without limits. Next-generation AI travel planning, real-time weather analytics, and immersive destination guides.
          </p>

          <form onSubmit={handleSubscribe} className="newsletter-form">
            <div className="newsletter-input-wrapper">
              <input 
                type="email" 
                placeholder="Enter your email for travel deals..." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-btn" title="Subscribe">
                <Send size={16} />
              </button>
            </div>
            {subscribed && (
              <span className="subscribe-success">
                ✓ Welcome aboard! You're subscribed to WanderSphere updates.
              </span>
            )}
          </form>
        </div>

        {/* Quick Links Column */}
        <div className="footer-col">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-links">
            <li><Link to="/">Home Overview</Link></li>
            <li><Link to="/explore">Explore Destinations</Link></li>
            <li><Link to="/planner">AI Itinerary Planner</Link></li>
            <li><Link to="/weather">Live Weather Hub</Link></li>
            <li><Link to="/chat">AI Travel Concierge</Link></li>
          </ul>
        </div>

        {/* Top Destinations Column */}
        <div className="footer-col">
          <h4 className="footer-heading">Top Destinations</h4>
          <ul className="footer-links">
            <li><Link to="/destination/paris">Paris, France</Link></li>
            <li><Link to="/destination/dubai">Dubai, UAE</Link></li>
            <li><Link to="/destination/bali">Bali, Indonesia</Link></li>
            <li><Link to="/destination/tokyo">Tokyo, Japan</Link></li>
            <li><Link to="/destination/london">London, UK</Link></li>
          </ul>
        </div>

        {/* Tech Stack & APIs Column */}
        <div className="footer-col">
          <h4 className="footer-heading">Powered By</h4>
          <ul className="footer-tech-list">
            <li><Globe2 size={16} className="tech-icon" /> OpenWeather API</li>
            <li><Sparkles size={16} className="tech-icon" /> Google Gemini AI</li>
            <li><Zap size={16} className="tech-icon" /> Unsplash Image API</li>
            <li><ShieldCheck size={16} className="tech-icon" /> Browser Geolocation</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p>© {new Date().getFullYear()} WanderSphere Inc. All rights reserved.</p>
          <p className="footer-credit">
            Crafted with <Heart size={14} className="heart-icon" /> for Front-End Developer Assessment
          </p>
        </div>
      </div>
    </footer>
  );
}
