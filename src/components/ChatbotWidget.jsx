import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Sparkles, AlertCircle, RefreshCw, HelpCircle } from 'lucide-react';
import { chatWithTravelAI } from '../services/geminiService';
import './ChatbotWidget.css';

export default function ChatbotWidget({ destinationContext }) {
  const destName = destinationContext?.name || 'this destination';
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hello! I'm your WanderSphere AI Concierge. Ask me anything about ${destName}! What would you like to know?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Suggested Quick Prompts
  const suggestedPrompts = [
    `How many days should I spend in ${destName}?`,
    `What are the best local dishes to try in ${destName}?`,
    `What is the best time of year to visit ${destName}?`,
    `What are the top must-visit attractions in ${destName}?`
  ];

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (customPrompt = null) => {
    const promptToSend = customPrompt || input;
    if (!promptToSend.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: promptToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!customPrompt) setInput('');
    setLoading(true);

    try {
      const aiResponseText = await chatWithTravelAI(promptToSend.trim(), destinationContext);
      
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: "I encountered an error retrieving answers. Please check your network or try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-card glass-panel">
      {/* Header */}
      <div className="chatbot-header">
        <div className="bot-title-group">
          <div className="bot-avatar">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="bot-name">WanderSphere AI Concierge</h3>
            <span className="bot-status">
              <span className="status-dot"></span> Active Assistant for {destName}
            </span>
          </div>
        </div>
        <span className="badge badge-purple">
          <Sparkles size={12} /> Gemini Powered
        </span>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="suggested-prompts-bar">
        <span className="prompts-label">
          <HelpCircle size={14} /> Quick Questions:
        </span>
        <div className="prompts-scroll">
          {suggestedPrompts.map((prompt, idx) => (
            <button 
              key={idx} 
              onClick={() => handleSend(prompt)}
              className="prompt-chip"
              disabled={loading}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Message History Container */}
      <div className="chat-messages-container">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message-row ${msg.sender === 'user' ? 'row-user' : 'row-bot'}`}>
            <div className={`message-avatar ${msg.sender === 'user' ? 'avatar-user' : 'avatar-bot'}`}>
              {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            
            <div className={`message-bubble ${msg.sender === 'user' ? 'bubble-user' : 'bubble-bot'} ${msg.isError ? 'bubble-error' : ''}`}>
              <p className="message-text">{msg.text}</p>
              <span className="message-time">{msg.timestamp}</span>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {loading && (
          <div className="chat-message-row row-bot">
            <div className="message-avatar avatar-bot">
              <Bot size={16} />
            </div>
            <div className="message-bubble bubble-bot typing-bubble">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="typing-text">AI is crafting response...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="chat-input-form">
        <input 
          type="text" 
          placeholder={`Ask anything about ${destName}...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button type="submit" className="chat-send-btn" disabled={!input.trim() || loading}>
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
