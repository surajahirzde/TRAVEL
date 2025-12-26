import React, { useState } from 'react';
import '../Components/styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactInfo = [
    {
      icon: '📞',
      title: 'Call Us',
      details: ['+91 99113 36188', '+0129-2513672'],
      timing: 'Mon-Sat: 9:00 AM - 8:00 PM',
      color: '#3B82F6'
    },
    {
      icon: '📧',
      title: 'Email Us',
      details: ['travelonweb.gmail.com'],
      timing: 'Response within 2 hours',
      color: '#10B981'
    },
    {
      icon: '🏢',
      title: 'Visit Us',
      details: ['SCO-4, Second Floor, Dayal Bagh Market, Sector-39, Surajkund, Faridabad-121009 Haryana India'],
      timing: 'Mon-Fri: 10:00 AM - 6:00 PM',
      color: '#8B5CF6'
    },
    {
      icon: '🕒',
      title: '24/7 Support',
      details: ['Live Chat Support', 'Emergency Bookings'],
      timing: 'Round the clock assistance',
      color: '#F59E0B'
    }
  ];

  const faqs = [
    {
      question: 'How can I book a ferry ticket?',
      answer: 'You can book ferry tickets online through our website or mobile app. Simply select your route, choose ferry type, select seats, and make payment.'
    },
    {
      question: 'What are the cancellation policies?',
      answer: 'Cancellations made 24 hours before departure get 80% refund. Within 24 hours, 50% refund is applicable. No refund for no-shows.'
    },
    {
      question: 'How do I reschedule my booking?',
      answer: 'Rescheduling can be done through your dashboard up to 6 hours before departure. Contact support for urgent changes.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept UPI, Credit/Debit Cards, Net Banking, Wallets, and Cash at selected ports.'
    },
    {
      question: 'Are there any discounts for group bookings?',
      answer: 'Yes! Groups of 10+ passengers get 15% discount. Students and senior citizens get 10% off on selected routes.'
    },
    {
      question: 'What should I carry for boarding?',
      answer: 'Carry a printed ticket or e-ticket on your phone, valid photo ID proof (Aadhar/Passport), and arrive 45 minutes before departure.'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '', c1-00000072922071
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">Contact TravelFerry</h1>
          <p className="contact-hero-subtitle">
            Need help with ferry bookings? Have questions about routes or schedules? Our marine experts are here to assist you.
          </p>
          <div className="contact-hero-stats">
            <div className="stat-item">
              <span className="stat-number">99%</span>
              <span className="stat-label">On-time Departures</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Ferry Routes</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15min</span>
              <span className="stat-label">Avg Response Time</span>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-content">
        {/* Contact Information Cards */}
        <div className="contact-info-section">
          <h2 className="section-title">Ways to Reach Us</h2>
          <p className="section-subtitle">Multiple channels to connect with our marine support team</p>
          
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <div 
                key={index} 
                className="contact-info-card"
                style={{ '--card-color': info.color }}
              >
                <div className="contact-info-icon" style={{ backgroundColor: `${info.color}20` }}>
                  {info.icon}
                </div>
                <h3 className="contact-info-title">{info.title}</h3>
                <div className="contact-info-details">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="contact-info-text">{detail}</p>
                  ))}
                </div>
                <div className="contact-info-timing">
                  <span className="timing-icon">⏰</span>
                  <span>{info.timing}</span>
                </div>
                {info.title === 'Call Us' && (
                  <button className="call-now-btn">
                    <span>📞</span> Call Now
                  </button>
                )}
                {info.title === 'Email Us' && (
                  <button className="email-now-btn">
                    <span>📧</span> Email Now
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form & Map */}
        <div className="contact-form-section">
          <div className="contact-form-wrapper">
            <div className="contact-form-header">
              <h2 className="section-title">Send us a Message</h2>
              <p className="section-subtitle">Fill the form below and our team will assist you shortly</p>
            </div>
            
            <form onSubmit={handleSubmit} className="contact-form">
              {submitStatus === 'success' && (
                <div className="form-success">
                  ✅ Thank you! Your message has been sent. Our team will contact you within 2 hours.
                </div>
              )}
              
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    Full Name *
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter your full name"
                      required
                    />
                  </label>
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Email Address *
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="you@example.com"
                      required
                    />
                  </label>
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Phone Number *
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="+91 99113 36188"
                      pattern="[0-9]{10}"
                      required
                    />
                  </label>
                  <small className="input-hint">Enter 10-digit mobile number</small>
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Subject *
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="">Select inquiry type</option>
                      <option value="booking">Booking Assistance</option>
                      <option value="cancellation">Cancellation/Refund</option>
                      <option value="reschedule">Rescheduling</option>
                      <option value="routes">Route Information</option>
                      <option value="ferry">Ferry Details</option>
                      <option value="group">Group Booking</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </label>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  Your Message *
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Please describe your ferry booking inquiry in detail..."
                    rows="5"
                    required
                  />
                </label>
              </div>
              
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Sending Message...
                    </>
                  ) : 'Send Message'}
                </button>
                <p className="form-note">
                  * Required fields. We respect your privacy and will never share your information.
                </p>
              </div>
            </form>
          </div>
          
          {/* Map & Location */}
          <div className="contact-map-section">
            <div className="map-container">
              <div className="map-placeholder">
                <div className="map-marker">
                  <div className="marker-pin">📍</div>
                  <div className="marker-info">
                    <h4>TravelFerry Headquarters</h4>
                    <p>Gateway of India, Apollo Bandar</p>
                    <p>Mumbai, Maharashtra - 400001</p>
                    <p className="landmark">Landmark: Near Taj Mahal Palace Hotel</p>
                  </div>
                </div>
                <div className="map-overlay">
                  <button className="view-map-btn">
                    <span>🗺️</span> View on Google Maps
                  </button>
                </div>
              </div>
            </div>
            
            <div className="office-hours">
              <h3>Ferry Operations Hours</h3>
              <div className="hours-grid">
                <div className="hours-day">
                  <span>Monday - Friday</span>
                  <span>6:00 AM - 10:00 PM</span>
                </div>
                <div className="hours-day">
                  <span>Saturday</span>
                  <span>7:00 AM - 10:00 PM</span>
                </div>
                <div className="hours-day">
                  <span>Sunday</span>
                  <span>7:00 AM - 9:00 PM</span>
                </div>
                <div className="hours-day highlight">
                  <span>24/7 Booking Support</span>
                  <span>Always Available</span>
                </div>
              </div>
              
              <div className="port-contacts">
                <h4>Major Port Contacts:</h4>
                <div className="port-list">
                  <div className="port-item">
                    <span>Mumbai</span>
                    <span>+91 22 1234 5678</span>
                  </div>
                  <div className="port-item">
                    <span>Goa</span>
                    <span>+91 832 1234 567</span>
                  </div>
                  <div className="port-item">
                    <span>Kochi</span>
                    <span>+91 484 1234 567</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2 className="section-title">Ferry Booking FAQs</h2>
          <p className="section-subtitle">Quick answers to common ferry booking questions</p>
          
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-card">
                <div className="faq-question">
                  <span className="faq-icon">⚓</span>
                  <h4>{faq.question}</h4>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="faq-cta">
            <p>Still have questions about ferry bookings?</p>
            <button className="faq-contact-btn">
              <span>📞</span> Call Our Support: +91 99113 36188
            </button>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="social-section">
          <div className="social-content">
            <h3>Follow Our Voyages</h3>
            <p>Connect with us for ferry updates, travel tips, and special offers</p>
            
            <div className="social-links">
              <a href="#" className="social-link facebook">
                <span>📘</span> Facebook
              </a>
              <a href="#" className="social-link twitter">
                <span>🐦</span> Twitter
              </a>
              <a href="#" className="social-link instagram">
                <span>📸</span> Instagram
              </a>
              <a href="#" className="social-link youtube">
                <span>📺</span> YouTube
              </a>
              <a href="https://wa.me/919911336188" className="social-link whatsapp">
                <span>💬</span> WhatsApp
              </a>
            </div>
            
            <div className="app-download">
              <h4>Download Our App</h4>
              <div className="app-buttons">
                <button className="app-btn google-play">
                  <span>📱</span> Google Play
                </button>
                <button className="app-btn app-store">
                  <span>📱</span> App Store
                </button>
              </div>
            </div>
          </div>
          
          <div className="newsletter-section">
            <h3>Subscribe to Ferry Updates</h3>
            <p>Get route changes, special fares, and travel tips directly in your inbox</p>
            
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe</button>
            </div>
            <p className="newsletter-note">No spam. Ferry updates only. Unsubscribe anytime.</p>
            
            <div className="emergency-contact">
              <h4>🚨 Emergency Contact</h4>
              <p>For urgent ferry cancellations or emergencies:</p>
              <div className="emergency-number">
                <span>📞</span>
                <div>
                  <strong>+91 99113 36188</strong>
                  <small>Available 24/7</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;