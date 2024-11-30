import React, { useState } from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import emailjs from 'emailjs-com'; // Ensure emailjs-com is installed
import { toast, ToastContainer } from 'react-toastify'; // Ensure react-toastify is installed
import Box from '@mui/material/Box';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import Contact from '../../Assets/contact.svg'; // Adjust path according to your project structure
import './HelpDeskForm.css'; // Import the CSS file
import Navbar from './Navbar'; 

const defaultTheme = createTheme();

const HelpDesk = () => {
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
        console.error(error.text);
        toast.error('An error occurred, please try again.');
        setLoading(false);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          padding: '20px',
        }}
      >

    <div className="containercontact">
      <div className="image">
        <img src={Contact} alt="Contact Us" />
      </div>
      <form onSubmit={sendEmail}>
        <h1>Contact Us</h1>
        <input type="text" id="firstName" name="from_name" placeholder="Name" required />
        <input type="email" id="email" name="email" placeholder="Email" required />
        <textarea id="message" name="message" placeholder="Message" required></textarea>
        <input type="submit" value={loading ? 'Sending...' : 'Send'} id="button" disabled={loading} />
      </form>
      <ToastContainer />
    </div>
    </Box>
      </Box>
    </ThemeProvider>

  );
};

export default HelpDesk;
