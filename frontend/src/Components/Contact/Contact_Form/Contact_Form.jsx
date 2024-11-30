import React, { useState } from 'react';
import './Contact_Form.css';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contact from '../../../Assets/contact.svg';

const Contact_Form = () => {
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm('service_sd9mvo7', 'template_12hlfag', e.target, 'PY7KH2frPc65w-wFP')
      .then((result) => {
        console.log(result.text);
        toast.success('Message Sent Successfully!');
        e.target.reset();
        setLoading(false);
      }, (error) => {
        console.error(error.text); // Log error to console for debugging
        toast.error('An error occurred, please try again.');
        setLoading(false);
      });
  };

  return (
    <div className='containercontact'>
      <div className="image">
        <img src={Contact} alt="Contact Us" />
      </div>
      <form onSubmit={sendEmail}>
        <h1>Contact Us</h1>
        <input type="text" id="firstName" name="from_name" placeholder="Name" required />
        <input type="email" id="email" name="email" placeholder="Email" required />
        <textarea id="message" name="message" placeholder='Message' required></textarea>
        <input type="submit" value={loading ? 'Sending...' : 'Send'} id="button" />
      </form>
    </div>
  );
};

export default Contact_Form;
