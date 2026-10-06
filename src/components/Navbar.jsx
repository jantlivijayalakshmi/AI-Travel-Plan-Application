import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Compass, MapPin, Sparkles, CloudSun, Bot, Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`navbar-header ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          <div className="logo-icon-wrapper">
            <Compass className="logo-icon" />
          </div>
          <span className="logo-text">
            Wander<span className="logo-accent">Sphere</span>
          </span>
          <span className="logo-badge">AI</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
            Home
          </NavLink>
          <NavLink to="/explore" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Explore
          </NavLink>
          <NavLink to="/planner" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Sparkles className="nav-icon-sm" /> AI Planner
          </NavLink>
          <NavLink to="/weather" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <CloudSun className="nav-icon-sm" /> Live Weather
          </NavLink>
          <NavLink to="/chat" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Bot className="nav-icon-sm" /> AI Concierge
          </NavLink>
        </nav>

        {/* CTA Button & Mobile Toggle */}
        <div className="navbar-actions">
          <Link to="/planner" className="btn-primary navbar-cta">
            <Sparkles size={16} /> Plan My Trip
          </Link>

          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'drawer-open' : ''}`}>
        <div className="mobile-drawer-content">
          <NavLink to="/" className="mobile-nav-link" end>
            Home
          </NavLink>
          <NavLink to="/explore" className="mobile-nav-link">
            Explore Destinations
          </NavLink>
          <NavLink to="/planner" className="mobile-nav-link">
            <Sparkles size={18} /> AI Itinerary Planner
          </NavLink>
          <NavLink to="/weather" className="mobile-nav-link">
            <CloudSun size={18} /> Live Weather & Location
          </NavLink>
          <NavLink to="/chat" className="mobile-nav-link">
            <Bot size={18} /> AI Travel Chatbot
          </NavLink>
          <div className="mobile-drawer-footer">
            <Link to="/planner" className="btn-primary w-full center">
              <Sparkles size={16} /> Start Planning Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
