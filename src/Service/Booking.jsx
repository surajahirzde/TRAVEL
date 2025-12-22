import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Booking.css';

const Booking = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Step 1: Journey Details
  const [journeyDetails, setJourneyDetails] = useState({
    fromPort: '',
    toPort: '',
    departureDate: '',
    returnDate: '',
    tripType: 'one-way',
    passengers: {
      adults: 1,
      children: 0,
      infants: 0
    }
  });

  // Step 2: Ferry Selection
  const [selectedFerry, setSelectedFerry] = useState(null);
  const [selectedClass, setSelectedClass] = useState('');
  const [showClasses, setShowClasses] = useState(false);

  // Step 3: Passenger Details
  const [passengerDetails, setPassengerDetails] = useState([
    {
      id: 1,
      fullName: '',
      age: '',
      gender: '',
      idType: 'aadhar',
      idNumber: ''
    }
  ]);

  // Step 4: Contact Details
  const [contactDetails, setContactDetails] = useState({
    email: '',
    phone: '',
    emergencyContact: '',
    specialRequests: ''
  });

  // Available ports
  const ports = [
    'Mumbai (Gateway of India)',
    'Goa (Panaji)',
    'Kochi (Willingdon Island)',
    'Chennai (Chennai Port)',
    'Visakhapatnam (Vizag Port)',
    'Port Blair (Andaman)',
    'Lakshadweep (Kavaratti)',
    'Alibaug (Mandwa)',
    'Elephanta Caves',
    'Murud-Janjira'
  ];

  // Available ferry types
  const ferryTypes = [
    {
      id: 1,
      name: 'SuperFast Express',
      type: 'Catamaran',
      duration: '2h 15m',
      departure: '08:00 AM',
      arrival: '10:15 AM',
      price: 1250,
      amenities: ['WiFi', 'AC', 'Snacks', 'TV'],
      rating: 4.5,
      image: '🚤'
    },
    {
      id: 2,
      name: 'Ocean Monarch',
      type: 'Cruise Ferry',
      duration: '3h 30m',
      departure: '10:30 AM',
      arrival: '02:00 PM',
      price: 1850,
      amenities: ['Restaurant', 'Bar', 'Cabins', 'Spa'],
      rating: 4.8,
      image: '🛳️'
    },
    {
      id: 3,
      name: 'Sea Hawk',
      type: 'Speed Boat',
      duration: '1h 45m',
      departure: '09:15 AM',
      arrival: '11:00 AM',
      price: 950,
      amenities: ['WiFi', 'Life Jackets', 'Water'],
      rating: 4.2,
      image: '⚡'
    },
    {
      id: 4,
      name: 'Royal Waves',
      type: 'Luxury Yacht',
      duration: '4h 00m',
      departure: '11:00 AM',
      arrival: '03:00 PM',
      price: 2500,
      amenities: ['Private Cabins', 'Gourmet Food', 'Sun Deck', 'Jacuzzi'],
      rating: 4.9,
      image: '🛥️'
    },
    {
      id: 5,
      name: 'Island Hopper',
      type: 'Tourist Ferry',
      duration: '5h 30m',
      departure: '07:00 AM',
      arrival: '12:30 PM',
      price: 1650,
      amenities: ['Guide', 'Lunch', 'Sightseeing'],
      rating: 4.4,
      image: '🏝️'
    },
    {
      id: 6,
      name: 'Cargo Express',
      type: 'Vehicle Ferry',
      duration: '6h 00m',
      departure: '06:00 AM',
      arrival: '12:00 PM',
      price: 2100,
      amenities: ['Vehicle Transport', 'Cafeteria', 'Rest Area'],
      rating: 4.3,
      image: '🚛'
    }
  ];

  const ferryClasses = [
    { id: 'economy', name: 'Silver Class', priceMultiplier: 1.0, features: ['Basic Seat', 'Water Bottle'] },
    { id: 'business', name: 'Premium Class', priceMultiplier: 1.5, features: ['Comfy Seat', 'Snacks', 'Priority Boarding'] },
    { id: 'first', name: 'Royal Class', priceMultiplier: 2.0, features: ['Luxury Seat', 'Gourmet Meal', 'Private Lounge', 'Spa Access'] }
  ];

  const seatLayout = [
    ['A1', 'A2', '', 'A3', 'A4', 'A5', '', 'A6', 'A7'],
    ['B1', 'B2', '', 'B3', 'B4', 'B5', '', 'B6', 'B7'],
    ['C1', 'C2', '', 'C3', 'C4', 'C5', '', 'C6', 'C7'],
    ['', '', '', 'WALK', 'WAY', '', '', '', ''],
    ['D1', 'D2', 'D3', '', 'D4', 'D5', 'D6', '', 'D7', 'D8'],
    ['E1', 'E2', 'E3', '', 'E4', 'E5', 'E6', '', 'E7', 'E8'],
    ['F1', 'F2', 'F3', '', 'F4', 'F5', 'F6', '', 'F7', 'F8']
  ];

  const bookedSeats = ['A1', 'B3', 'C5', 'D2', 'E7', 'F4'];

  const handleJourneyChange = (e) => {
    const { name, value } = e.target;
    setJourneyDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePassengerChange = (type, value) => {
    setJourneyDetails(prev => ({
      ...prev,
      passengers: {
        ...prev.passengers,
        [type]: parseInt(value) || 0
      }
    }));
  };

  const handleFerrySelect = (ferry) => {
    setSelectedFerry(ferry);
    setSelectedClass('');
    setShowClasses(true);
    
    // Scroll to classes section on mobile
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        document.querySelector('.booking-classes-section').scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };

  const handleSeatSelect = (seat) => {
    if (bookedSeats.includes(seat) || seat === '' || seat === 'WALK' || seat === 'WAY') return;
    
    setSelectedSeats(prev => {
      if (prev.includes(seat)) {
        return prev.filter(s => s !== seat);
      } else {
        if (prev.length < (journeyDetails.passengers.adults + journeyDetails.passengers.children)) {
          return [...prev, seat];
        }
        return prev;
      }
    });
  };

  const handlePassengerDetailChange = (index, field, value) => {
    const updatedPassengers = [...passengerDetails];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value
    };
    setPassengerDetails(updatedPassengers);
  };

  const addPassenger = () => {
    const totalPassengers = journeyDetails.passengers.adults + journeyDetails.passengers.children;
    if (passengerDetails.length < totalPassengers) {
      setPassengerDetails([
        ...passengerDetails,
        {
          id: passengerDetails.length + 1,
          fullName: '',
          age: '',
          gender: '',
          idType: 'aadhar',
          idNumber: ''
        }
      ]);
    }
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    if (!selectedFerry || !selectedClass) return 0;
    
    const basePrice = selectedFerry.price;
    const classObj = ferryClasses.find(c => c.id === selectedClass);
    const classMultiplier = classObj ? classObj.priceMultiplier : 1;
    
    const totalPassengers = journeyDetails.passengers.adults + journeyDetails.passengers.children;
    
    return basePrice * classMultiplier * totalPassengers;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && (!journeyDetails.fromPort || !journeyDetails.toPort || !journeyDetails.departureDate)) {
      alert('Please fill all journey details');
      return;
    }
    
    if (currentStep === 2 && !selectedFerry) {
      alert('Please select a ferry');
      return;
    }
    
    if (currentStep === 2 && !selectedClass) {
      alert('Please select a class');
      return;
    }
    
    if (currentStep === 3 && selectedSeats.length < (journeyDetails.passengers.adults + journeyDetails.passengers.children)) {
      alert(`Please select ${journeyDetails.passengers.adults + journeyDetails.passengers.children} seats`);
      return;
    }
    
    if (currentStep === 4) {
      for (let passenger of passengerDetails) {
        if (!passenger.fullName || !passenger.age || !passenger.gender) {
          alert('Please fill all passenger details');
          return;
        }
      }
    }
    
    if (currentStep === 5 && (!contactDetails.email || !contactDetails.phone)) {
      alert('Please fill contact details');
      return;
    }
    
    setCurrentStep(prev => Math.min(prev + 1, 7));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handlePayment = () => {
    setPaymentSuccess(true);
    setCurrentStep(7);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="booking-step-container">
            <div className="booking-step-mobile-header">
              <div className="booking-step-number">Step 1 of 7</div>
              <h2 className="booking-step-title">Select Your Journey</h2>
            </div>
            
            <div className="booking-form-grid">
              <div className="booking-form-group">
                <label className="booking-form-label">Trip Type</label>
                <div className="booking-trip-type">
                  <button
                    type="button"
                    className={`booking-trip-btn ${journeyDetails.tripType === 'one-way' ? 'trip-active' : ''}`}
                    onClick={() => setJourneyDetails(prev => ({...prev, tripType: 'one-way'}))}
                  >
                    One Way
                  </button>
                  <button
                    type="button"
                    className={`booking-trip-btn ${journeyDetails.tripType === 'round-trip' ? 'trip-active' : ''}`}
                    onClick={() => setJourneyDetails(prev => ({...prev, tripType: 'round-trip'}))}
                  >
                    Round Trip
                  </button>
                </div>
              </div>

              <div className="booking-form-group">
                <label className="booking-form-label">From Port</label>
                <select 
                  name="fromPort"
                  value={journeyDetails.fromPort}
                  onChange={handleJourneyChange}
                  className="booking-form-select"
                >
                  <option value="">Select departure port</option>
                  {ports.map(port => (
                    <option key={port} value={port}>{port}</option>
                  ))}
                </select>
              </div>

              <div className="booking-form-group">
                <label className="booking-form-label">To Port</label>
                <select 
                  name="toPort"
                  value={journeyDetails.toPort}
                  onChange={handleJourneyChange}
                  className="booking-form-select"
                >
                  <option value="">Select arrival port</option>
                  {ports
                    .filter(port => port !== journeyDetails.fromPort)
                    .map(port => (
                      <option key={port} value={port}>{port}</option>
                    ))
                  }
                </select>
              </div>

              <div className="booking-form-group">
                <label className="booking-form-label">Departure Date</label>
                <input
                  type="date"
                  name="departureDate"
                  value={journeyDetails.departureDate}
                  onChange={handleJourneyChange}
                  className="booking-form-input"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {journeyDetails.tripType === 'round-trip' && (
                <div className="booking-form-group">
                  <label className="booking-form-label">Return Date</label>
                  <input
                    type="date"
                    name="returnDate"
                    value={journeyDetails.returnDate}
                    onChange={handleJourneyChange}
                    className="booking-form-input"
                    min={journeyDetails.departureDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
              )}

              <div className="booking-form-group booking-passengers-group">
                <label className="booking-form-label">Passengers</label>
                <div className="booking-passenger-selector">
                  <div className="booking-passenger-type">
                    <span>Adults (12+)</span>
                    <div className="booking-passenger-controls">
                      <button 
                        type="button"
                        onClick={() => handlePassengerChange('adults', Math.max(1, journeyDetails.passengers.adults - 1))}
                        className="booking-passenger-btn"
                      >
                        −
                      </button>
                      <span className="booking-passenger-count">{journeyDetails.passengers.adults}</span>
                      <button 
                        type="button"
                        onClick={() => handlePassengerChange('adults', journeyDetails.passengers.adults + 1)}
                        className="booking-passenger-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="booking-passenger-type">
                    <span>Children (2-11)</span>
                    <div className="booking-passenger-controls">
                      <button 
                        type="button"
                        onClick={() => handlePassengerChange('children', Math.max(0, journeyDetails.passengers.children - 1))}
                        className="booking-passenger-btn"
                      >
                        −
                      </button>
                      <span className="booking-passenger-count">{journeyDetails.passengers.children}</span>
                      <button 
                        type="button"
                        onClick={() => handlePassengerChange('children', journeyDetails.passengers.children + 1)}
                        className="booking-passenger-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="booking-passenger-type">
                    <span>Infants (0-1)</span>
                    <div className="booking-passenger-controls">
                      <button 
                        type="button"
                        onClick={() => handlePassengerChange('infants', Math.max(0, journeyDetails.passengers.infants - 1))}
                        className="booking-passenger-btn"
                      >
                        −
                      </button>
                      <span className="booking-passenger-count">{journeyDetails.passengers.infants}</span>
                      <button 
                        type="button"
                        onClick={() => handlePassengerChange('infants', journeyDetails.passengers.infants + 1)}
                        className="booking-passenger-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="booking-step-container">
            <div className="booking-step-mobile-header">
              <div className="booking-step-number">Step 2 of 7</div>
              <h2 className="booking-step-title">Select Your Ferry</h2>
              <p className="booking-step-subtitle">Available ferries from {journeyDetails.fromPort} to {journeyDetails.toPort}</p>
            </div>
            
            <div className="booking-ferries-grid">
              {ferryTypes.map(ferry => (
                <div 
                  key={ferry.id}
                  className={`booking-ferry-card ${selectedFerry?.id === ferry.id ? 'ferry-selected' : ''}`}
                  onClick={() => handleFerrySelect(ferry)}
                >
                  <div className="booking-ferry-header">
                    <div className="booking-ferry-icon">{ferry.image}</div>
                    <div className="booking-ferry-badge">SuperFast</div>
                  </div>
                  
                  <div className="booking-ferry-content">
                    <h3 className="booking-ferry-name">{ferry.name}</h3>
                    <p className="booking-ferry-type">{ferry.type}</p>
                    
                    <div className="booking-ferry-schedule">
                      <div className="booking-schedule-item">
                        <span className="booking-schedule-label">Departure</span>
                        <span className="booking-schedule-value">{ferry.departure}</span>
                      </div>
                      <div className="booking-schedule-item">
                        <span className="booking-schedule-label">Duration</span>
                        <span className="booking-schedule-value">{ferry.duration}</span>
                      </div>
                      <div className="booking-schedule-item">
                        <span className="booking-schedule-label">Arrival</span>
                        <span className="booking-schedule-value">{ferry.arrival}</span>
                      </div>
                    </div>
                    
                    <div className="booking-ferry-amenities">
                      {ferry.amenities.map((amenity, idx) => (
                        <span key={idx} className="booking-amenity-tag">{amenity}</span>
                      ))}
                    </div>
                    
                    <div className="booking-ferry-footer">
                      <div className="booking-ferry-rating">
                        <span className="booking-rating-star">⭐</span>
                        <span>{ferry.rating}</span>
                      </div>
                      <div className="booking-ferry-price">
                        <span className="booking-price-amount">₹{ferry.price}</span>
                        <span className="booking-price-person">per person</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedFerry && showClasses && (
              <div className="booking-classes-section">
                <div className="booking-classes-header">
                  <h3 className="booking-classes-title">Select Class for {selectedFerry.name}</h3>
                  <button 
                    type="button" 
                    className="booking-classes-close"
                    onClick={() => setShowClasses(false)}
                  >
                    ×
                  </button>
                </div>
                <div className="booking-classes-grid">
                  {ferryClasses.map(cls => (
                    <div 
                      key={cls.id}
                      className={`booking-class-card ${selectedClass === cls.id ? 'class-selected' : ''}`}
                      onClick={() => setSelectedClass(cls.id)}
                    >
                      <div className="booking-class-card-header">
                        <h4 className="booking-class-name">{cls.name}</h4>
                        <div className="booking-class-price">
                          ₹{Math.round(selectedFerry.price * cls.priceMultiplier)}
                          <span className="booking-class-perperson">/person</span>
                        </div>
                      </div>
                      <ul className="booking-class-features">
                        {cls.features.map((feature, idx) => (
                          <li key={idx} className="booking-class-feature">
                            <span className="booking-class-check">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      {selectedClass === cls.id && (
                        <div className="booking-class-selected-badge">Selected</div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="booking-classes-action">
                  <button 
                    type="button" 
                    className="booking-classes-confirm"
                    onClick={() => {
                      setShowClasses(false);
                      document.querySelector('.booking-step-container').scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }}
                  >
                    Confirm Class Selection
                  </button>
                </div>
              </div>
            )}
            
            {selectedFerry && selectedClass && !showClasses && (
              <div className="booking-selected-summary">
                <div className="booking-selected-ferry">
                  <strong>Selected:</strong> {selectedFerry.name} - {ferryClasses.find(c => c.id === selectedClass)?.name}
                </div>
                <button 
                  type="button" 
                  className="booking-change-class"
                  onClick={() => setShowClasses(true)}
                >
                  Change Class
                </button>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="booking-step-container">
            <div className="booking-step-mobile-header">
              <div className="booking-step-number">Step 3 of 7</div>
              <h2 className="booking-step-title">Select Your Seats</h2>
              <p className="booking-step-subtitle">
                Select {journeyDetails.passengers.adults + journeyDetails.passengers.children} seat(s) for {selectedFerry?.name}
              </p>
            </div>
            
            <div className="booking-seat-container">
              <div className="booking-seat-screen">SCREEN THIS WAY</div>
              
              <div className="booking-seat-map">
                {seatLayout.map((row, rowIndex) => (
                  <div key={rowIndex} className="booking-seat-row">
                    {row.map((seat, seatIndex) => {
                      if (seat === 'WALK' || seat === 'WAY') {
                        return <div key={seatIndex} className="booking-walkway">{seat}</div>;
                      }
                      if (seat === '') {
                        return <div key={seatIndex} className="booking-seat-empty"></div>;
                      }
                      
                      const isBooked = bookedSeats.includes(seat);
                      const isSelected = selectedSeats.includes(seat);
                      
                      return (
                        <button
                          key={seatIndex}
                          type="button"
                          className={`booking-seat ${isBooked ? 'seat-booked' : ''} ${isSelected ? 'seat-selected' : ''}`}
                          onClick={() => handleSeatSelect(seat)}
                          disabled={isBooked}
                        >
                          {seat}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
              
              <div className="booking-seat-legend">
                <div className="booking-legend-item">
                  <div className="booking-legend-box legend-available"></div>
                  <span>Available</span>
                </div>
                <div className="booking-legend-item">
                  <div className="booking-legend-box legend-selected"></div>
                  <span>Selected ({selectedSeats.length})</span>
                </div>
                <div className="booking-legend-item">
                  <div className="booking-legend-box legend-booked"></div>
                  <span>Booked</span>
                </div>
                <div className="booking-legend-item">
                  <div className="booking-legend-box legend-walkway"></div>
                  <span>Walkway</span>
                </div>
              </div>
            </div>
            
            {selectedSeats.length > 0 && (
              <div className="booking-seats-summary">
                <div className="booking-seats-selected">
                  <strong>Selected Seats:</strong> {selectedSeats.join(', ')}
                </div>
                <div className="booking-seats-total">
                  <strong>Total:</strong> {selectedSeats.length} of {journeyDetails.passengers.adults + journeyDetails.passengers.children} seats selected
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="booking-step-container">
            <div className="booking-step-mobile-header">
              <div className="booking-step-number">Step 4 of 7</div>
              <h2 className="booking-step-title">Passenger Details</h2>
              <p className="booking-step-subtitle">
                Enter details for {journeyDetails.passengers.adults + journeyDetails.passengers.children} passenger(s)
              </p>
            </div>
            
            {passengerDetails.map((passenger, index) => (
              <div key={passenger.id} className="booking-passenger-form">
                <div className="booking-passenger-form-header">
                  <h3 className="booking-passenger-form-title">Passenger {index + 1}</h3>
                  {index > 0 && (
                    <button 
                      type="button" 
                      className="booking-remove-passenger"
                      onClick={() => {
                        const updated = [...passengerDetails];
                        updated.splice(index, 1);
                        setPassengerDetails(updated);
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="booking-form-grid">
                  <div className="booking-form-group">
                    <label className="booking-form-label">Full Name *</label>
                    <input
                      type="text"
                      value={passenger.fullName}
                      onChange={(e) => handlePassengerDetailChange(index, 'fullName', e.target.value)}
                      className="booking-form-input"
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  
                  <div className="booking-form-group">
                    <label className="booking-form-label">Age *</label>
                    <input
                      type="number"
                      value={passenger.age}
                      onChange={(e) => handlePassengerDetailChange(index, 'age', e.target.value)}
                      className="booking-form-input"
                      placeholder="Enter age"
                      min="2"
                      max="100"
                      required
                    />
                  </div>
                  
                  <div className="booking-form-group">
                    <label className="booking-form-label">Gender *</label>
                    <select
                      value={passenger.gender}
                      onChange={(e) => handlePassengerDetailChange(index, 'gender', e.target.value)}
                      className="booking-form-select"
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="booking-form-group">
                    <label className="booking-form-label">ID Type</label>
                    <select
                      value={passenger.idType}
                      onChange={(e) => handlePassengerDetailChange(index, 'idType', e.target.value)}
                      className="booking-form-select"
                    >
                      <option value="aadhar">Aadhar Card</option>
                      <option value="passport">Passport</option>
                      <option value="voter">Voter ID</option>
                      <option value="driving">Driving License</option>
                    </select>
                  </div>
                  
                  <div className="booking-form-group">
                    <label className="booking-form-label">ID Number</label>
                    <input
                      type="text"
                      value={passenger.idNumber}
                      onChange={(e) => handlePassengerDetailChange(index, 'idNumber', e.target.value)}
                      className="booking-form-input"
                      placeholder="Enter ID number"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            {passengerDetails.length < (journeyDetails.passengers.adults + journeyDetails.passengers.children) && (
              <button type="button" onClick={addPassenger} className="booking-add-passenger">
                + Add Passenger {passengerDetails.length + 1}
              </button>
            )}
          </div>
        );

      case 5:
        return (
          <div className="booking-step-container">
            <div className="booking-step-mobile-header">
              <div className="booking-step-number">Step 5 of 7</div>
              <h2 className="booking-step-title">Contact Details</h2>
              <p className="booking-step-subtitle">We'll send booking confirmation to these details</p>
            </div>
            
            <div className="booking-form-grid">
              <div className="booking-form-group">
                <label className="booking-form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={contactDetails.email}
                  onChange={handleContactChange}
                  className="booking-form-input"
                  placeholder="Enter email"
                  required
                />
              </div>
              
              <div className="booking-form-group">
                <label className="booking-form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={contactDetails.phone}
                  onChange={handleContactChange}
                  className="booking-form-input"
                  placeholder="Enter 10-digit mobile number"
                  required
                />
              </div>
              
              <div className="booking-form-group">
                <label className="booking-form-label">Emergency Contact</label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={contactDetails.emergencyContact}
                  onChange={handleContactChange}
                  className="booking-form-input"
                  placeholder="Emergency contact number"
                />
              </div>
              
              <div className="booking-form-group booking-full-width">
                <label className="booking-form-label">Special Requests</label>
                <textarea
                  name="specialRequests"
                  value={contactDetails.specialRequests}
                  onChange={handleContactChange}
                  className="booking-form-textarea"
                  placeholder="Any special requirements or requests..."
                  rows="3"
                />
              </div>
            </div>
          </div>
        );

      case 6:
        const total = calculateTotal();
        
        return (
          <div className="booking-step-container">
            <div className="booking-step-mobile-header">
              <div className="booking-step-number">Step 6 of 7</div>
              <h2 className="booking-step-title">Review Your Booking</h2>
              <p className="booking-step-subtitle">Please review all details before payment</p>
            </div>
            
            <div className="booking-review-container">
              <div className="booking-review-section">
                <h3 className="booking-review-title">Journey Details</h3>
                <div className="booking-review-content">
                  <div className="booking-review-row">
                    <span className="booking-review-label">Route</span>
                    <span className="booking-review-value">{journeyDetails.fromPort} → {journeyDetails.toPort}</span>
                  </div>
                  <div className="booking-review-row">
                    <span className="booking-review-label">Departure</span>
                    <span className="booking-review-value">{formatDate(journeyDetails.departureDate)}</span>
                  </div>
                  {journeyDetails.returnDate && (
                    <div className="booking-review-row">
                      <span className="booking-review-label">Return</span>
                      <span className="booking-review-value">{formatDate(journeyDetails.returnDate)}</span>
                    </div>
                  )}
                  <div className="booking-review-row">
                    <span className="booking-review-label">Passengers</span>
                    <span className="booking-review-value">
                      {journeyDetails.passengers.adults} Adults, {journeyDetails.passengers.children} Children, {journeyDetails.passengers.infants} Infants
                    </span>
                  </div>
                </div>
              </div>
              
              {selectedFerry && (
                <div className="booking-review-section">
                  <h3 className="booking-review-title">Ferry Details</h3>
                  <div className="booking-review-content">
                    <div className="booking-review-row">
                      <span className="booking-review-label">Ferry</span>
                      <span className="booking-review-value">{selectedFerry.name} ({selectedFerry.type})</span>
                    </div>
                    <div className="booking-review-row">
                      <span className="booking-review-label">Timing</span>
                      <span className="booking-review-value">{selectedFerry.departure} - {selectedFerry.arrival} ({selectedFerry.duration})</span>
                    </div>
                    <div className="booking-review-row">
                      <span className="booking-review-label">Class</span>
                      <span className="booking-review-value">
                        {ferryClasses.find(c => c.id === selectedClass)?.name || 'Not selected'}
                      </span>
                    </div>
                    <div className="booking-review-row">
                      <span className="booking-review-label">Seats</span>
                      <span className="booking-review-value">{selectedSeats.join(', ') || 'Not selected'}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="booking-review-section booking-price-summary">
                <h3 className="booking-review-title">Price Summary</h3>
                <div className="booking-review-content">
                  <div className="booking-review-row">
                    <span className="booking-review-label">Base Fare</span>
                    <span className="booking-review-value">₹{selectedFerry?.price || 0} × {journeyDetails.passengers.adults + journeyDetails.passengers.children}</span>
                  </div>
                  {selectedClass && (
                    <div className="booking-review-row">
                      <span className="booking-review-label">
                        {ferryClasses.find(c => c.id === selectedClass)?.name} Class
                      </span>
                      <span className="booking-review-value">
                        {ferryClasses.find(c => c.id === selectedClass)?.priceMultiplier}x multiplier
                      </span>
                    </div>
                  )}
                  <div className="booking-review-divider"></div>
                  <div className="booking-review-row booking-total-row">
                    <span className="booking-review-label">Total Amount</span>
                    <span className="booking-review-value booking-total-amount">₹{total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        if (paymentSuccess) {
          return (
            <div className="booking-step-container">
              <div className="booking-success-container">
                <div className="booking-success-icon">🎉</div>
                <h2 className="booking-success-title">Booking Successful!</h2>
                <p className="booking-success-message">
                  Your ferry booking has been confirmed. Booking details have been sent to {contactDetails.email}
                </p>
                
                <div className="booking-confirmation-details">
                  <div className="booking-confirmation-row">
                    <span>Booking ID:</span>
                    <strong>FB{Date.now().toString().slice(-8)}</strong>
                  </div>
                  <div className="booking-confirmation-row">
                    <span>Ferry:</span>
                    <span>{selectedFerry?.name}</span>
                  </div>
                  <div className="booking-confirmation-row">
                    <span>Departure:</span>
                    <span>{formatDate(journeyDetails.departureDate)} at {selectedFerry?.departure}</span>
                  </div>
                  <div className="booking-confirmation-row">
                    <span>Seats:</span>
                    <span>{selectedSeats.join(', ')}</span>
                  </div>
                  <div className="booking-confirmation-row">
                    <span>Total Paid:</span>
                    <strong>₹{calculateTotal()}</strong>
                  </div>
                </div>
                
                <div className="booking-success-actions">
                  <button 
                    type="button" 
                    className="booking-download-receipt"
                    onClick={() => alert('Receipt downloaded!')}
                  >
                    📥 Download Receipt
                  </button>
                  <button 
                    type="button" 
                    className="booking-print-ticket"
                    onClick={() => window.print()}
                  >
                    🖨️ Print Ticket
                  </button>
                  <button 
                    type="button" 
                    className="booking-new-booking"
                    onClick={() => navigate('/booking')}
                  >
                    🛳️ Book Another Ferry
                  </button>
                </div>
              </div>
            </div>
          );
        }
        
        return (
          <div className="booking-step-container">
            <div className="booking-step-mobile-header">
              <div className="booking-step-number">Step 7 of 7</div>
              <h2 className="booking-step-title">Complete Payment</h2>
              <p className="booking-step-subtitle">Secure payment gateway</p>
            </div>
            
            <div className="booking-payment-section">
              <div className="booking-payment-amount">
                <div className="booking-payment-label">Total Amount to Pay</div>
                <div className="booking-payment-total">₹{calculateTotal()}</div>
              </div>
              
              <div className="booking-payment-methods-section">
                <h3 className="booking-payment-title">Select Payment Method</h3>
                <div className="booking-payment-methods">
                  <div className="booking-payment-method">
                    <input 
                      type="radio" 
                      id="card" 
                      name="payment" 
                      defaultChecked 
                      className="booking-payment-radio"
                    />
                    <label htmlFor="card" className="booking-payment-method-label">
                      <span className="booking-payment-icon">💳</span>
                      <div className="booking-payment-method-info">
                        <span className="booking-payment-method-name">Credit/Debit Card</span>
                        <span className="booking-payment-method-desc">Pay using Visa, MasterCard, Rupay</span>
                      </div>
                    </label>
                  </div>
                  
                  <div className="booking-payment-method">
                    <input 
                      type="radio" 
                      id="netbanking" 
                      name="payment" 
                      className="booking-payment-radio"
                    />
                    <label htmlFor="netbanking" className="booking-payment-method-label">
                      <span className="booking-payment-icon">🏦</span>
                      <div className="booking-payment-method-info">
                        <span className="booking-payment-method-name">Net Banking</span>
                        <span className="booking-payment-method-desc">All major Indian banks</span>
                      </div>
                    </label>
                  </div>
                  
                  <div className="booking-payment-method">
                    <input 
                      type="radio" 
                      id="upi" 
                      name="payment" 
                      className="booking-payment-radio"
                    />
                    <label htmlFor="upi" className="booking-payment-method-label">
                      <span className="booking-payment-icon">📱</span>
                      <div className="booking-payment-method-info">
                        <span className="booking-payment-method-name">UPI</span>
                        <span className="booking-payment-method-desc">Google Pay, PhonePe, Paytm</span>
                      </div>
                    </label>
                  </div>
                  
                  <div className="booking-payment-method">
                    <input 
                      type="radio" 
                      id="wallet" 
                      name="payment" 
                      className="booking-payment-radio"
                    />
                    <label htmlFor="wallet" className="booking-payment-method-label">
                      <span className="booking-payment-icon">💰</span>
                      <div className="booking-payment-method-info">
                        <span className="booking-payment-method-name">Wallet</span>
                        <span className="booking-payment-method-desc">Paytm, Mobikwik, Amazon Pay</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="booking-payment-security">
                <div className="booking-payment-secure">
                  <span className="booking-payment-lock">🔒</span>
                  <span>Your payment is secured with 256-bit SSL encryption</span>
                </div>
              </div>
              
              <div className="booking-payment-action">
                <button type="button" onClick={handlePayment} className="booking-pay-now">
                  Pay ₹{calculateTotal()} & Confirm Booking
                </button>
                <p className="booking-payment-note">
                  By clicking "Pay & Confirm", you agree to our Terms & Conditions and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const steps = [
    { number: 1, title: 'Journey', icon: '📍' },
    { number: 2, title: 'Ferry', icon: '🛳️' },
    { number: 3, title: 'Seats', icon: '💺' },
    { number: 4, title: 'Passengers', icon: '👥' },
    { number: 5, title: 'Contact', icon: '📞' },
    { number: 6, title: 'Review', icon: '📝' },
    { number: 7, title: 'Payment', icon: '💰' }
  ];

  return (
    <div className="booking-page-container">
      <div className="booking-page-header">
        <h1 className="booking-main-title">Book Your Ferry</h1>
        <p className="booking-main-subtitle">Easy booking in 7 simple steps</p>
      </div>
      
      <div className="booking-progress-container">
        <div className="booking-progress-steps">
          {steps.map(step => (
            <div 
              key={step.number}
              className={`booking-progress-step ${currentStep >= step.number ? 'step-active' : ''} ${currentStep === step.number ? 'step-current' : ''}`}
            >
              <div className="booking-step-icon">{step.icon}</div>
              <div className="booking-step-info">
                <span className="booking-step-number">Step {step.number}</span>
                <span className="booking-step-name">{step.title}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="booking-progress-bar">
          <div 
            className="booking-progress-fill" 
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="booking-content-container">
        {renderStep()}
      </div>
      
      {currentStep < 7 && !paymentSuccess && (
        <div className="booking-navigation">
          {currentStep > 1 && (
            <button type="button" onClick={handlePrevStep} className="booking-nav-btn booking-nav-prev">
              ← Previous Step
            </button>
          )}
          
          <button type="button" onClick={handleNextStep} className="booking-nav-btn booking-nav-next">
            {currentStep === 6 ? 'Proceed to Payment →' : 'Next Step →'}
          </button>
        </div>
      )}
      
      {currentStep === 7 && paymentSuccess && (
        <div className="booking-success-navigation">
          <button 
            type="button" 
            onClick={() => navigate('/')}
            className="booking-nav-btn booking-nav-home"
          >
            ← Back to Home
          </button>
        </div>
      )}
      
      {currentStep < 7 && selectedFerry && (
        <div className="booking-sidebar">
          <div className="booking-sidebar-content">
            <h3 className="booking-sidebar-title">Booking Summary</h3>
            
            <div className="booking-sidebar-section">
              <h4 className="booking-sidebar-section-title">Journey</h4>
              <p className="booking-sidebar-text">
                {journeyDetails.fromPort} → {journeyDetails.toPort}
              </p>
              <p className="booking-sidebar-text">
                {formatDate(journeyDetails.departureDate)}
              </p>
            </div>
            
            {selectedFerry && (
              <div className="booking-sidebar-section">
                <h4 className="booking-sidebar-section-title">Ferry</h4>
                <p className="booking-sidebar-text">{selectedFerry.name}</p>
                <p className="booking-sidebar-text">
                  {selectedFerry.departure} - {selectedFerry.arrival}
                </p>
                {selectedClass && (
                  <p className="booking-sidebar-text">
                    Class: {ferryClasses.find(c => c.id === selectedClass)?.name}
                  </p>
                )}
              </div>
            )}
            
            {selectedSeats.length > 0 && (
              <div className="booking-sidebar-section">
                <h4 className="booking-sidebar-section-title">Seats</h4>
                <p className="booking-sidebar-text">{selectedSeats.join(', ')}</p>
              </div>
            )}
            
            <div className="booking-sidebar-section booking-sidebar-total">
              <h4 className="booking-sidebar-section-title">Total</h4>
              <p className="booking-sidebar-total-amount">₹{calculateTotal()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;