import React, { useState } from 'react';
import { Calendar, Sun, SunMedium, Moon, Sparkles, MapPin, Tag, Check, Copy, Share2 } from 'lucide-react';
import './ItineraryCard.css';

export default function ItineraryCard({ itineraryData }) {
  const [copied, setCopied] = useState(false);

  if (!itineraryData || !itineraryData.daysList || itineraryData.daysList.length === 0) {
    return null;
  }

  const handleCopyItinerary = () => {
    let copyText = `WanderSphere AI Travel Plan: ${itineraryData.destination} (${itineraryData.days} Days)\n\n`;
    itineraryData.daysList.forEach(day => {
      copyText += `--- ${day.title} ---\n`;
      copyText += `[Morning] ${day.morning.time}: ${day.morning.activity}\n${day.morning.description}\n`;
      copyText += `[Afternoon] ${day.afternoon.time}: ${day.afternoon.activity}\n${day.afternoon.description}\n`;
      copyText += `[Evening] ${day.evening.time}: ${day.evening.activity}\n${day.evening.description}\n\n`;
    });

    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="itinerary-wrapper animate-fade-in">
      {/* Header Bar */}
      <div className="itinerary-header-bar glass-panel">
        <div className="itinerary-title-group">
          <div className="itinerary-icon-badge">
            <Sparkles size={22} />
          </div>
          <div>
            <h2 className="itinerary-main-title">
              {itineraryData.days}-Day Personalized Itinerary for <span className="text-gradient">{itineraryData.destination}</span>
            </h2>
            <p className="itinerary-sub-info">
              Tailored based on interests: {itineraryData.interests?.join(", ") || "Sightseeing & Culture"}
            </p>
          </div>
        </div>

        <div className="itinerary-actions">
          <button onClick={handleCopyItinerary} className="btn-secondary btn-sm">
            {copied ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
            {copied ? "Copied to Clipboard!" : "Copy Itinerary"}
          </button>
        </div>
      </div>

      {/* Days Grid / List */}
      <div className="itinerary-days-container">
        {itineraryData.daysList.map((day) => (
          <div key={day.dayNumber} className="day-card glass-panel">
            {/* Day Header */}
            <div className="day-card-header">
              <div className="day-badge">
                <Calendar size={16} /> DAY {day.dayNumber}
              </div>
              <h3 className="day-card-title">{day.title}</h3>
            </div>

            {/* Time Slot Sections */}
            <div className="time-slots-grid">
              {/* Morning Slot */}
              <div className="time-slot-card morning-slot">
                <div className="slot-header">
                  <span className="slot-badge morning-badge">
                    <Sun size={15} /> Morning
                  </span>
                  <span className="slot-time">{day.morning.time}</span>
                </div>
                <h4 className="slot-activity">{day.morning.activity}</h4>
                <p className="slot-desc">{day.morning.description}</p>
              </div>

              {/* Afternoon Slot */}
              <div className="time-slot-card afternoon-slot">
                <div className="slot-header">
                  <span className="slot-badge afternoon-badge">
                    <SunMedium size={15} /> Afternoon
                  </span>
                  <span className="slot-time">{day.afternoon.time}</span>
                </div>
                <h4 className="slot-activity">{day.afternoon.activity}</h4>
                <p className="slot-desc">{day.afternoon.description}</p>
              </div>

              {/* Evening Slot */}
              <div className="time-slot-card evening-slot">
                <div className="slot-header">
                  <span className="slot-badge evening-badge">
                    <Moon size={15} /> Evening
                  </span>
                  <span className="slot-time">{day.evening.time}</span>
                </div>
                <h4 className="slot-activity">{day.evening.activity}</h4>
                <p className="slot-desc">{day.evening.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
