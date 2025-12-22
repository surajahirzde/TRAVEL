import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-sliding background images (no buttons)
  const backgroundImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      title: "Your Journey Across the Sea Begins Here",
      subtitle: "Premium ferry services connecting you to your destination with comfort, safety, and style"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1513326738677-b964603b136d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      title: "Luxury Sea Travel Experience",
      subtitle: "Experience the ocean like never before with our premium fleet"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      title: "Seamless Coastal Connections",
      subtitle: "Reliable ferry services connecting major coastal destinations"
    }
  ];

  // Mobile view ke liye compact data
  const mobileFeatures = [
    {
      id: 1,
      icon: "⚡",
      title: "Quick Booking",
      desc: "Book in 2 minutes"
    },
    {
      id: 2,
      icon: "🛡️",
      title: "Safety First",
      desc: "Top priority"
    },
    {
      id: 3,
      icon: "💰",
      title: "Best Prices",
      desc: "Guaranteed low fares"
    },
    {
      id: 4,
      icon: "📱",
      title: "Easy Process",
      desc: "Simple steps"
    }
  ];

  // Auto slide images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // 5 seconds per slide

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handleBooking = () => {
    navigate('/booking');
  };

  const handleSchedule = () => {
    navigate('/schedule');
  };

  return (
    <div className="home-container">
      
      {/* Hero Section with Auto-sliding Images */}
      <section className="hero-section">
        <div className="hero-background">
          {backgroundImages.map((image, index) => (
            <div 
              key={image.id}
              className={`hero-bg-image ${index === currentImageIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image.url})` }}
            />
          ))}
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">{backgroundImages[currentImageIndex].title}</h1>
          <p className="hero-subtitle">{backgroundImages[currentImageIndex].subtitle}</p>
          
          <div className="hero-buttons">
            <button className="btn-primary" onClick={handleBooking}>
              Book Your Trip
            </button>
            <button className="btn-secondary" onClick={handleSchedule}>
              View Schedule
            </button>
          </div>

          {/* By Rinder */}
          <div className="brand-tag">
            <span className="brand-by">By</span>
            <span className="brand-name">Ferry</span>
          </div>
        </div>

        {/* Mobile-only Features Grid */}
        <div className="mobile-features-grid">
          {mobileFeatures.map(feature => (
            <div key={feature.id} className="mobile-feature">
              <div className="mobile-feature-icon">{feature.icon}</div>
              <div className="mobile-feature-text">
                <h4>{feature.title}</h4>
                <p>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Book Us Section (Mobile Optimized) */}
      <section className="why-book-section">
        <h2 className="section-title">Why Book With Us?</h2>
        
        <div className="why-book-grid">
          <div className="why-book-card">
            <div className="why-book-icon">🚢</div>
            <h3>Modern Fleet</h3>
            <p>Newest ferries with latest safety features and comfortable seating.</p>
          </div>
          
          <div className="why-book-card">
            <div className="why-book-icon">⏱️</div>
            <h3>On-Time Service</h3>
            <p>95% on-time departure rate with real-time tracking.</p>
          </div>
          
          <div className="why-book-card">
            <div className="why-book-icon">⭐</div>
            <h3>Premium Experience</h3>
            <p>Luxury amenities and professional crew for your comfort.</p>
          </div>
        </div>
      </section>

      {/* Combined Safety & Policies Section (Mobile Compact) */}
      <section className="safety-policies-section">
        <h2 className="section-title">Safety & Guidelines</h2>
        
        <div className="safety-policies-grid">
          <div className="policy-category">
            <h3>🛡️ Safety First</h3>
            <ul className="policy-list">
              <li>Certified life jackets for all</li>
              <li>24/7 GPS tracking</li>
              <li>Medical staff on board</li>
              <li>Regular safety drills</li>
            </ul>
          </div>
          
          <div className="policy-category">
            <h3>📋 Policies</h3>
            <ul className="policy-list">
              <li>Flexible cancellation</li>
              <li>Easy rescheduling</li>
              <li>Transparent pricing</li>
              <li>Child safety policies</li>
            </ul>
          </div>
          
          <div className="policy-category">
            <h3>📝 Guidelines</h3>
            <ul className="policy-list">
              <li>Check-in 60 mins before</li>
              <li>Valid ID required</li>
              <li>Baggage limits apply</li>
              <li>Follow crew instructions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Quick Contact/Booking CTA */}
      <section className="quick-cta-section">
        <div className="quick-cta-content">
          <h2>Ready to Sail?</h2>
          <p>Book now for the best sea travel experience</p>
          <button className="btn-primary btn-large" onClick={handleBooking}>
            Book Your Journey
          </button>
        </div>
      </section>

    </div>
  );
};

export default Home;