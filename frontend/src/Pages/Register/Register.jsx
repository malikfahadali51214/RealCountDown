import React, { useEffect } from 'react';
import Header from '../../Components/Header/Header';
import RegisterComponent from '../../Components/Register/Register';
import Footer from '../../Components/Footer/Footer';

const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <RegisterComponent />
      <Footer />
    </>
  );
};

export default Register;
