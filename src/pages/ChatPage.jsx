import React, { useState } from 'react';
import { Bot, Sparkles, MapPin } from 'lucide-react';
import ChatbotWidget from '../components/ChatbotWidget';
import { DESTINATIONS } from '../data/destinationsData';
import './ChatPage.css';

export default function ChatPage() {
  const [selectedDestId, setSelectedDestId] = useState('paris');

  const selectedDestination = DESTINATIONS.find(d => d.id === selectedDestId) || DESTINATIONS[0];

  return (
    <div className="chat-page section-padding animate-fade-in">
      <div className="container">
        {/* Header */}
        <div className="chat-page-header text-center">
          <span className="badge badge-purple mb-2">
            <Bot size={14} /> AI Travel Assistant
          </span>
          <h1 className="section-title">
            WanderSphere <span className="text-gradient">AI Concierge</span>
          </h1>
          <p className="section-subtitle">
            Get instant answers regarding best travel times, packing recommendations, budget tips, local cuisine, and must-see hidden gems.
          </p>
        </div>

        {/* Destination Context Selector Bar */}
        <div className="dest-selector-bar glass-panel mb-4">
          <span className="selector-label">
            <MapPin size={16} className="text-cyan" /> Focus Destination Context:
          </span>
          <select 
            value={selectedDestId} 
            onChange={(e) => setSelectedDestId(e.target.value)}
            className="dest-select-input"
          >
            {DESTINATIONS.map(d => (
              <option key={d.id} value={d.id}>
                {d.name}, {d.country} ({d.category})
              </option>
            ))}
          </select>
        </div>

        {/* Chatbot Interface */}
        <div className="chat-container-box">
          <ChatbotWidget destinationContext={selectedDestination} />
        </div>
      </div>
    </div>
  );
}
