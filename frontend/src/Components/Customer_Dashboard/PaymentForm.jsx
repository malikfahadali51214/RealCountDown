// PaymentForm.js
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { toast } from 'react-toastify';
import PackageSelection from './PackageSelection'; // Import the new component
import './PaymentForm.css'; // Import your CSS file

const PaymentForm = ({ open, onClose, onPaymentSubmit }) => {
  const [number, SetNumber] = useState("");
  const [name, SetName] = useState("");
  const [date, SetDate] = useState("");
  const [cvc, SetCvc] = useState("");
  const [focus, SetFocus] = useState("");
  const [errors, setErrors] = useState({});
  const [flipped, setFlipped] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null); // State for selected package

  const handleSubmit = () => {
    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      // Display toast notifications for each error
      Object.values(errors).forEach(error => {
        toast.error(error);
      });
      return;
    }
    onPaymentSubmit(selectedPackage); // Pass the selected package ID to the submit function
    toast.success('Featured Successfully');
    setErrors({});
    onClose();
  };

  const validateFields = () => {
    const errors = {};
    
    // Card number validation (16 digits)
    const cardNumberPattern = /^\d{16}$/;
    if (!number) {
      errors.number = "Card number is required.";
    } else if (!cardNumberPattern.test(number)) {
      errors.number = "Card number must be 16 digits.";
    }

    // Card name validation (only alphabets and spaces, max 30 characters)
    const cardNamePattern = /^[a-zA-Z\s]+$/;
    if (!name) {
      errors.name = "Card name is required.";
    } else if (!cardNamePattern.test(name)) {
      errors.name = "Card name must contain only letters and spaces.";
    } else if (name.length > 30) {
      errors.name = "Card name must be 30 characters or less.";
    }

    // Expiration date validation (MM/YY format)
    const expiryPattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!date) {
      errors.date = "Expiration date is required.";
    } else if (!expiryPattern.test(date)) {
      errors.date = "Expiration date must be in MM/YY format.";
    } else if (date.length > 4) {  // Change this to 4
      errors.date = "Expiration date must be 4 characters or less.";
    }

    // CVV validation (3 digits)
    const cvcPattern = /^\d{3}$/;
    if (!cvc) {
      errors.cvc = "CVV is required.";
    } else if (!cvcPattern.test(cvc)) {
      errors.cvc = "CVV must be 3 digits.";
    }

    if (!selectedPackage) errors.package = "Please select a package."; // Validate package selection
    return errors;
};

  const toggleFlip = () => {
    setFlipped(!flipped);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <>
      {open && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-custom" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  style={{
 color: '#ffffff',
                    fontFamily: 'Georgia, serif',
                    fontSize: '1.80rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundImage: 'linear-gradient(to right, #2563eb, #06b6d4)',
                    borderRadius: '10px',
                    textAlign: 'center',
                    width: '100%',
                  }}
                >
                  Feature Your Property
                </h5>                
              </div>
              <div className="modal-body">
                <PackageSelection 
                  selectedPackage={selectedPackage} 
                  onPackageSelect={setSelectedPackage} 
                />
                <div className={`rccs__card ${flipped ? 'flip' : ''}`} style={{ position: ' relative' }}>
                  <div className="front">
                    <Cards
                      number={number}
                      name={name}
                      expiry={date}
                      cvc={cvc}
                      focused={focus}
                    />
                  </div>
                  <div className="back">
                    <h5>Back Side</h5>
                    <p>CVV: {cvc}</p>
                    <button onClick={toggleFlip}>Go to Front</button>
                  </div>

                  {/* Overlay Input Fields */}
                  <input
                    type="text"
                    style={{
                      position: 'absolute',
                      top: '52%',
                      left: '28%',
                      width: '80%',
                      color: 'transparent',
                      caretColor: 'white', background: 'none',
                      border: 'none',
                      outline: 'none',
                      fontSize: '1.5rem',
                    }}
                    value={number}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 16); // Allow only digits and limit to 16
                      SetNumber(value);
                    }}
                    onFocus={() => SetFocus('number')}
                  />
                  <input
                    type="text"
                    style={{
                      position: 'absolute',
                      top: '82%',
                      left: '28%',
                      width: '80%',
                      color: 'transparent',
                      caretColor: 'white',
                      background: 'none',
                      border: 'none',
                      outline: 'none',
                      fontSize: '1.5rem',
                    }}
                    value={name}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^a-zA-Z\s]/g, '').slice(0, 20); // Allow only letters and spaces, limit to 30
                      SetName(value);
                    }}
                    onFocus={() => SetFocus('name')}
                  />
                  <input
                    type="text"
                    style={{
                      position: 'absolute',
                      top: '84%',
                      left: '96.5%',
                      width: '40%',
                      color: 'transparent',
                      caretColor: 'white',
                      background: 'none',
                      border: 'none',
                      outline: 'none',
                      fontSize: '1.5rem',
                    }}
                    value={date}
                    onChange={(e) => {
                      // Allow only digits and a single slash, limit to 5 characters
                      const value = e.target.value
                        .replace(/[^0-9/]/g, '') // Allow only digits and slashes
                        .slice(0, 4); // Limit to 5 characters
                      SetDate(value);
                    }}
                    onFocus={() => SetFocus('expiry')}
                                      />
                  <input
                    type="text"
                    placeholder="CVV"
                    style={{
                      position: 'absolute',
                      top: '15%',
                      left: '100%',
                      width: '30%',
                      color: 'white', // Change text color to white
                      caretColor: 'white', // Keep caret color white for visibility
                      background: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background for visibility
                      border: '2px solid white', // White border
                      borderRadius: '5px', // Rounded corners
                      outline: 'none',
                      fontSize: '1.5rem',
                      padding: '10px', // Padding for better spacing
                      transition: 'border-color 0.3s, background 0.3s', // Smooth transition for effects
                    }}
                    value={cvc}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 3); // Allow only digits and limit to 3
                      SetCvc(value);
                    }}
                    onFocus={() => SetFocus('cvc')}
                    onBlur={() => {
                      // Optionally change border color back on blur
                      if (!cvc) {
                        e.target.style.borderColor = 'white'; // Reset border color if empty
                      }
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.2)'; // Change background on hover
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)'; // Reset background on leave
                    }}
                  />

                </div>

                <form className="form" style={{ display: 'none' }}>
                  <div className="row">
                    <div className="col-sm-11">
                      <label htmlFor="number">Card Number</label>
                      <input
                        type="text"
                        className="form-control"
                        value={number}
                        name="number"
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 16); // Allow only digits and limit to 16
                          SetNumber(value);
                        }}
                        onFocus={(e) => SetFocus(e.target.name)}
                      />
                      {errors.number && <div className="text-danger">{errors.number}</div>}
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-sm-11">
                      <label htmlFor="name">Card Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        name="name"
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^a-zA-Z\s]/g, '').slice(0, 30); // Allow only letters and spaces, limit to 30
                          SetName(value);
                        }}
                        onFocus={(e) => SetFocus(e.target.name)}
                      />
                      {errors.name && <div className="text-danger">{errors.name}</div>}
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-sm-6">
                      <label htmlFor="expiry">Expiration Date</label>
                      <input
                        type="text"
                        name="expiry"
                        className="form-control"
                        value={date}
                        onChange={(e) => {
                          const value = e.target.value.slice(0, 5); // Limit to 5 characters (MM/YY)
                          SetDate(value);
                        }}
                        onFocus={(e) => SetFocus(e.target.name)}
                      />
                      {errors.date && <div className="text-danger">{errors.date}</div>}
                    </div>
                    <div className="col-sm-5">
                      <label htmlFor="cvc">CVV</label>
                      <input
                        type="tel"
                        name="cvc"
                        className="form-control"
                        value={cvc}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 3); // Allow only digits and limit to 3
                          SetCvc(value);
                        }}
                        onFocus={(e) => SetFocus(e.target.name)}
                      />
                      {errors.cvc && <div className="text-danger">{errors.cvc}</div>}
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentForm;