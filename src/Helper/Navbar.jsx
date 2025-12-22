import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Add search logic here
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Schedules', path: '/schedules' },
    { name: 'Book Ticket', path: '/booking' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="navbar-container">
      <div className="navbar-wrapper">
        
        {/* Logo and Brand Name */}
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo-link">
            <div className="navbar-logo-icon">🚢</div>
            <div className="navbar-brand-text">
              <span className="navbar-brand-primary">Travel</span>
              <span className="navbar-brand-secondary">Ferry</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="navbar-desktop-nav">
          <ul className="navbar-links-list">
            {navLinks.map((link) => (
              <li key={link.name} className="navbar-link-item">
                <Link 
                  to={link.path} 
                  className="navbar-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Merchant Profile Section */}
        <div className="navbar-profile-section">
          <div className="navbar-merchant-info">
            <span className="navbar-merchant-label">Merchant ID:</span>
            <span className="navbar-merchant-id">MF789456123</span>
          </div>
          
          <button className="navbar-profile-button">
            <div className="navbar-profile-avatar">
              <span className="navbar-avatar-initials">MF</span>
            </div>
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="navbar-mobile-menu-btn"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`navbar-menu-icon ${isMenuOpen ? 'open' : ''}`}>
              <span className="navbar-menu-line"></span>
              <span className="navbar-menu-line"></span>
              <span className="navbar-menu-line"></span>
            </span>
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      <div className={`navbar-mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="navbar-mobile-menu-header">
          <div className="navbar-mobile-profile">
            <div className="navbar-mobile-avatar">MF</div>
            <div className="navbar-mobile-profile-info">
              <span className="navbar-mobile-merchant">Merchant ID: MF789456123</span>
            </div>
          </div>
        </div>
        
        <ul className="navbar-mobile-links">
          {navLinks.map((link) => (
            <li key={link.name} className="navbar-mobile-link-item">
              <Link 
                to={link.path} 
                className="navbar-mobile-link"
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;