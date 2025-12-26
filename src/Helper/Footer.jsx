import React from 'react';
import '../Helper/styles/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-main">
        {/* Logo & Description */}
        <div className="footer-top">
          <div className="footer-logo">
            <span className="logo-icon">⚓</span>
            <h3>TravelOnWeb</h3>
          </div>
          <p className="footer-description">
            Your trusted partner for premium transportation services across India.
          </p>
        </div>

        {/* Links Grid */}
        <div className="footer-links-grid">
          <div className="links-column">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
            </ul>
          </div>

          <div className="links-column">
            <h4>Legal</h4>
            <ul>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/refund">Refund Policy</Link></li>
            </ul>
          </div>

          <div className="links-column">
            <h4>Contact</h4>
            <ul>
              <li>
                <span className="contact-icon">📞</span>
                <a href="tel:+919211336188">+91 92113 36188</a>
              </li>
              <li>
                <span className="contact-icon">📧</span>
                <a href="mailto:transportonweb@188gmail.com">travelonweb@188gmail.com</a>
              </li>
              <li>
                <span className="contact-icon">🏢</span>
                <span>SCO-4, Second Floor, Dayal Bagh Market, Sector-39, Surajkund, Faridabad-121009 Haryana India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">
            © {currentYear} TravelOnWeb Pvt Ltd. All rights reserved.
          </p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Twitter">t</a>
            <a href="#" aria-label="Instagram">ig</a>
            <a href="https://wa.me/919211336188" aria-label="WhatsApp">w</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;