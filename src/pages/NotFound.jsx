import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="section-padding text-center animate-fade-in" style={{ paddingTop: '10rem', minHeight: '80vh' }}>
      <div className="container">
        <Compass size={64} style={{ color: 'var(--accent-cyan)', marginBottom: '1.5rem' }} />
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>404 - Page Not Found</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
          Looks like you've wandered into uncharted territory! The travel page you are looking for does not exist.
        </p>
        <Link to="/" className="btn-primary">
          <Home size={18} /> Return to Home
        </Link>
      </div>
    </div>
  );
}
