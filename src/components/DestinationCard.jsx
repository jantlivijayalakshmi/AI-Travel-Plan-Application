import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Calendar, ArrowRight } from 'lucide-react';
import { fetchDynamicImage } from '../services/unsplashService';
import './DestinationCard.css';

export default function DestinationCard({ destination }) {
  const [imageUrl, setImageUrl] = useState(destination.heroImage);
  const [imgLoading, setImgLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadImage = async () => {
      const dynamicUrl = await fetchDynamicImage(
        `${destination.name} ${destination.country}`, 
        destination.heroImage
      );
      if (isMounted) {
        setImageUrl(dynamicUrl);
        setImgLoading(false);
      }
    };
    loadImage();
    return () => { isMounted = false; };
  }, [destination]);

  return (
    <div className="destination-card glass-card">
      {/* Image Container */}
      <div className="card-image-wrapper">
        <img 
          src={imageUrl} 
          alt={`${destination.name}, ${destination.country}`}
          className={`card-image ${imgLoading ? 'img-blur' : ''}`}
          loading="lazy"
        />
        <div className="card-overlay"></div>
        
        {/* Category Pill */}
        <span className="badge badge-cyan card-category-badge">
          {destination.category}
        </span>

        {/* Rating Badge */}
        <div className="card-rating-badge">
          <Star size={14} className="star-icon" /> {destination.rating}
        </div>
      </div>

      {/* Card Content */}
      <div className="card-body">
        <div className="card-header-info">
          <h3 className="card-title">{destination.name}</h3>
          <span className="card-country">
            <MapPin size={14} /> {destination.country}
          </span>
        </div>

        <p className="card-desc">{destination.shortDescription}</p>

        <div className="card-meta">
          <span className="card-meta-item">
            <Calendar size={14} /> {destination.bestTime}
          </span>
        </div>

        {/* Action Button */}
        <div className="card-footer-action">
          <Link to={`/destination/${destination.id}`} className="btn-primary card-btn">
            Explore Destination <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
