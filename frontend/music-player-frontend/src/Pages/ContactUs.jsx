import React, { useState } from 'react';
import '../CSS files/ContactUs.css'


const ContactUs = () => {
  const [message, setMessage] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message!');
    setMessage('');
  };

  return (
    <div className="contact-page">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Your message..."
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ContactUs;