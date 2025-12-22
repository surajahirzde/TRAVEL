import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const slideIntervalRef = useRef(null);

  const slides = [
    {
      id: 1,
      title: "Luxury Yacht Experience",
      description: "Premium yacht services with 5-star amenities and ocean views",
      image: "🛥️",
      bgImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    },
    {
      id: 2,
      title: "Island Hopping Adventures",
      description: "Explore multiple islands with our special package deals",
      image: "🏝️",
      bgImage: "https://images.unsplash.com/photo-1513326738677-b964603b136d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    },
    {
      id: 3,
      title: "Coastal Ferry Journeys",
      description: "Comfortable ferry rides along scenic coastal routes",
      image: "🚢",
      bgImage: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    },
    {
      id: 4,
      title: "Speed Boat Tours",
      description: "Fast and thrilling speed boat adventures",
      image: "⚡",
      bgImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    },
    {
      id: 5,
      title: "Sunset Cruises",
      description: "Romantic sunset cruises with dinner packages",
      image: "🌅",
      bgImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    },
    {
      id: 6,
      title: "Cargo & Vehicle Ferries",
      description: "Reliable transport for vehicles and cargo",
      image: "🚛",
      bgImage: "https://images.unsplash.com/photo-1590691565924-90d0a14443a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    }
  ];

  const bookingCards = [
    {
      id: 1,
      title: "Quick Booking",
      icon: "⚡",
      description: "Book your ferry tickets in under 2 minutes",
      features: ["Instant confirmation", "Multiple payment options", "E-ticket available"]
    },
    {
      id: 2,
      title: "Best Prices",
      icon: "💰",
      description: "Guaranteed lowest fares with price match",
      features: ["No hidden charges", "Special discounts", "Group booking offers"]
    },
    {
      id: 3,
      title: "24/7 Support",
      icon: "🛟",
      description: "Round-the-clock customer assistance",
      features: ["Live chat support", "Phone assistance", "Email support"]
    }
  ];

  // Check if mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto slide functionality
  useEffect(() => {
    const startAutoSlide = () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
      
      slideIntervalRef.current = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
      }, 4000); // Change slide every 4 seconds
    };
    
    startAutoSlide();
    
    // Pause on hover
    const sliderContainer = document.querySelector('.home-slider-container');
    const pauseSlide = () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    };
    
    const resumeSlide = () => {
      startAutoSlide();
    };
    
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', pauseSlide);
      sliderContainer.addEventListener('mouseleave', resumeSlide);
    }
    
    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
      if (sliderContainer) {
        sliderContainer.removeEventListener('mouseenter', pauseSlide);
        sliderContainer.removeEventListener('mouseleave', resumeSlide);
      }
    };
  }, [slides.length]);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Navigation function
  const goToBooking = () => {
    navigate('/booking');
  };

  // Rest of the component remains the same...
  const safetyFeatures = [
    { id: 1, icon: "🛡️", title: "Life Jackets", description: "Certified life jackets for all passengers" },
    { id: 2, icon: "🧯", title: "Fire Safety", description: "Advanced fire detection and suppression systems" },
    { id: 3, icon: "👨‍⚕️", title: "Medical Aid", description: "Trained medical staff on board" },
    { id: 4, icon: "📡", title: "GPS Tracking", description: "Real-time location tracking" },
    { id: 5, icon: "🎥", title: "CCTV Surveillance", description: "24/7 security monitoring" },
    { id: 6, icon: "🚨", title: "Emergency Exits", description: "Multiple clearly marked emergency exits" }
  ];

  const policies = [
    {
      title: "Refund Policy",
      points: [
        "Full refund available 48 hours before departure",
        "50% refund between 24-48 hours before departure",
        "No refund within 24 hours of departure",
        "Weather-related cancellations: 100% refund or reschedule"
      ]
    },
    {
      title: "Booking Guidelines",
      points: [
        "Minimum age for booking: 18 years",
        "Valid ID proof required for all passengers",
        "Check-in opens 2 hours before departure",
        "Boarding closes 30 minutes before departure"
      ]
    },
    {
      title: "Travel Documents",
      points: [
        "Carry printed or mobile e-ticket",
        "Government issued photo ID",
        "Medical certificate if required",
        "Children's birth certificate for age proof"
      ]
    }
  ];

  return (
    <div className="home-main-container">
      
      {/* Hero Slider Section */}
      <section className="home-hero-section">
        <div className="home-slider-container">
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`home-slide ${index === activeSlide ? 'slide-active' : ''}`}
              style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${slide.bgImage})` }}
            >
              <div className="home-slide-content">
                <div className="home-slide-icon">{slide.image}</div>
                <h1 className="home-slide-title">{slide.title}</h1>
                <p className="home-slide-desc">{slide.description}</p>
                <button className="home-slide-button" onClick={goToBooking}>Book Now</button>
              </div>
            </div>
          ))}
          
          {/* Previous Button - Hidden on mobile */}
          {!isMobile && (
            <button 
              className="home-slider-prev"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              ←
            </button>
          )}
          
          {/* Next Button - Hidden on mobile */}
          {!isMobile && (
            <button 
              className="home-slider-next"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              →
            </button>
          )}
          
          {/* Slide Indicators - Hidden on mobile */}
          {!isMobile && (
            <div className="home-slider-indicators">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`home-slider-indicator ${index === activeSlide ? 'indicator-active' : ''}`}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
          
          {/* Mobile Slide Dots - Visible only on mobile */}
          {isMobile && (
            <div className="home-mobile-dots">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`home-mobile-dot ${index === activeSlide ? 'mobile-dot-active' : ''}`}
                  onClick={() => setActiveSlide(index)}
                />
              ))}
            </div>
          )}
          
        </div>
      </section>

      {/* Quick Booking Cards */}
      <section className="home-cards-section">
        <h2 className="home-section-title">Why Book With Us?</h2>
        <div className="home-cards-grid">
          {bookingCards.map((card) => (
            <div key={card.id} className="home-card">
              <div className="home-card-icon">{card.icon}</div>
              <h3 className="home-card-title">{card.title}</h3>
              <p className="home-card-desc">{card.description}</p>
              <ul className="home-card-features">
                {card.features.map((feature, idx) => (
                  <li key={idx} className="home-card-feature">
                    <span className="home-feature-tick">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="home-card-button" onClick={goToBooking}>Book Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* Safety Features */}
      <section className="home-safety-section">
        <h2 className="home-section-title">Safety First</h2>
        <p className="home-section-subtitle">Your safety is our top priority</p>
        <div className="home-safety-grid">
          {safetyFeatures.map((item) => (
            <div key={item.id} className="home-safety-card">
              <div className="home-safety-icon">{item.icon}</div>
              <h4 className="home-safety-title">{item.title}</h4>
              <p className="home-safety-desc">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="home-safety-cta">
          <button className="home-safety-button" onClick={goToBooking}>Book Safe Journey</button>
        </div>
      </section>

      {/* Policies Section */}
      <section className="home-policies-section">
        <h2 className="home-section-title">Important Policies & Guidelines</h2>
        <div className="home-policies-grid">
          {policies.map((policy, index) => (
            <div key={index} className="home-policy-card">
              <h3 className="home-policy-title">{policy.title}</h3>
              <ul className="home-policy-list">
                {policy.points.map((point, idx) => (
                  <li key={idx} className="home-policy-point">
                    <span className="home-policy-bullet">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="home-policies-cta">
          <button className="home-policies-button" onClick={goToBooking}>Start Booking</button>
        </div>
      </section>

      {/* Additional Information */}
      <section className="home-info-section">
        <div className="home-info-container">
          <div className="home-info-card">
            <h3 className="home-info-title">📋 Booking Checklist</h3>
            <ul className="home-info-list">
              <li>Select departure and arrival ports</li>
              <li>Choose travel date and time</li>
              <li>Select number of passengers</li>
              <li>Pick seat preference (if available)</li>
              <li>Add passenger details</li>
              <li>Make payment and receive e-ticket</li>
            </ul>
            <button className="home-info-button" onClick={goToBooking}>Start Checklist</button>
          </div>
          
          <div className="home-info-card">
            <h3 className="home-info-title">⏰ Operating Hours</h3>
            <ul className="home-info-list">
              <li>Booking support: 24/7</li>
              <li>Customer service: 6 AM - 12 AM</li>
              <li>Port offices: 5 AM - 11 PM</li>
              <li>Emergency contact: Always available</li>
            </ul>
            <button className="home-info-button" onClick={goToBooking}>Book Now</button>
          </div>
          
          <div className="home-info-card">
            <h3 className="home-info-title">ℹ️ Travel Tips</h3>
            <ul className="home-info-list">
              <li>Arrive at port 90 minutes before departure</li>
              <li>Carry essential medications</li>
              <li>Keep important documents handy</li>
              <li>Check weather updates before travel</li>
              <li>Download e-ticket for offline access</li>
            </ul>
            <button className="home-info-button" onClick={goToBooking}>Plan Your Trip</button>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="home-cta-section">
        <div className="home-cta-container">
          <h2 className="home-cta-title">Ready to Sail?</h2>
          <p className="home-cta-text">
            Book your ferry journey today and experience seamless travel across waters.
            For special group bookings or queries, contact our support team.
          </p>
          <div className="home-cta-buttons">
            <button className="home-cta-button home-cta-primary" onClick={goToBooking}>Book Your Ticket</button>
            <button className="home-cta-button home-cta-secondary">Contact Support</button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;