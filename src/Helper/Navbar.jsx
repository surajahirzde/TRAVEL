import React, { useState } from 'react';
import './styles/Navbar.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Add your search logic here
    }
  };

  return (
    <header className="nav-main-container">
      <div className="nav-content-wrapper">
        
        {/* Logo Section */}
        <div className="nav-logo-section">
          <a href="/" className="nav-logo-link">
            <div className="nav-logo-icon">⚓</div>
            <div className="nav-logo-texts">
              <span className="nav-logo-primary">Ferry</span>
              <span className="nav-logo-secondary">Bookings</span>
            </div>
          </a>
          <div className="nav-merchant-id">
            <span className="nav-merchant-label">Merchant ID:</span>
            <span className="nav-merchant-value">FB789456123</span>
          </div>
        </div>

        {/* Search Box Section */}
        <div className="nav-search-section">
          <form className="nav-search-form" onSubmit={handleSearch}>
            <div className="nav-search-input-wrapper">
              <input
                type="text"
                className="nav-search-input"
                placeholder="Search ferries, routes, or ports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search"
              />
              <button type="submit" className="nav-search-button" aria-label="Search">
                <span className="nav-search-icon">🔍</span>
              </button>
            </div>
          </form>
        </div>

        {/* User Profile Section */}
        <div className="nav-profile-section">
          <button className="nav-profile-button" aria-label="User profile">
            <div className="nav-profile-avatar">
              <span className="nav-avatar-text">JD</span>
            </div>
            <div className="nav-profile-info">
              <span className="nav-profile-name">John Doe</span>
              <span className="nav-profile-role">Merchant Account</span>
            </div>
            <div className="nav-profile-dropdown">▼</div>
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;