import React, { useState, useEffect } from 'react';
import { MapPin, Tag } from 'lucide-react';
import { fetchDynamicImage } from '../services/unsplashService';
import './FamousPlaceCard.css';

export default function FamousPlaceCard({ place, cityName }) {
  const [imageUrl, setImageUrl] = useState(place.image);

  useEffect(() => {
    let isMounted = true;
    const loadImage = async () => {
      const dynamicUrl = await fetchDynamicImage(
        `${place.name} ${cityName || ''}`, 
        place.image
      );
      if (isMounted) setImageUrl(dynamicUrl);
    };
    loadImage();
    return () => { isMounted = false; };
  }, [place, cityName]);

  return (
    <div className="place-card glass-card">
      <div className="place-image-container">
        <img src={imageUrl} alt={place.name} className="place-image" loading="lazy" />
        <span className="badge badge-amber place-category">
          <Tag size={12} /> {place.category}
        </span>
      </div>

      <div className="place-content">
        <h4 className="place-title">{place.name}</h4>
        <p className="place-desc">{place.description}</p>
        
        <div className="place-location">
          <MapPin size={14} className="location-icon" />
          <span>{place.location}</span>
        </div>
      </div>
    </div>
  );
}
