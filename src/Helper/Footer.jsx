import React from 'react';
import '../Helper/styles/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      {/* Main Footer */}
      <div className="footer-main">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">⚓</span>
              <h3 className="logo-text">TravelFerry</h3>
            </div>
            <p className="footer-description">
              Your trusted partner for premium ferry services across India's beautiful coastlines. 
              Experience safe, comfortable, and memorable sea journeys.
            </p>
            <div className="footer-contact-info">
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div className="contact-details">
                  <span className="contact-label">Call Us</span>
                  <a href="tel:+919911336188" className="contact-value">+91 99113 36188</a>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div className="contact-details">
                  <span className="contact-label">Email Us</span>
                  <a href="mailto:support@travelonweb.com" className="contact-value">support@travelonweb.com</a>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🏢</span>
                <div className="contact-details">
                  <span className="contact-label">Visit Us</span>
                  <span className="contact-value">Gateway of India, Mumbai</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">🏠 Home</Link></li>
              <li><Link to="/book-ticket">🎫 Book Ticket</Link></li>
              <li><Link to="/routes">🗺️ Ferry Routes</Link></li>
              <li><Link to="/schedules">⏰ Schedules</Link></li>
              <li><Link to="/ferries">🛳️ Our Ferries</Link></li>
              <li><Link to="/offers">🎁 Special Offers</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h4 className="footer-heading">Our Services</h4>
            <ul className="footer-links">
              <li><span>🚤 Catamaran Ferries</span></li>
              <li><span>🛳️ Cruise Ferries</span></li>
              <li><span>⚡ Speed Boats</span></li>
              <li><span>🛥️ Luxury Yachts</span></li>
              <li><span>🏝️ Island Hopping</span></li>
              <li><span>🚛 Vehicle Ferries</span></li>
            </ul>
          </div>

          {/* Popular Routes */}
        
        </div>

    
    
      </div>

    
    </footer>
  );
};

export default Footer;