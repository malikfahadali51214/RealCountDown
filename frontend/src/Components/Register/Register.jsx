import React, { useState, useEffect } from 'react';
import './Register.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState('customer');


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleFromURL = params.get('role');
    if (roleFromURL) {
      setRole(roleFromURL);
      setIsSignUp(true);
    }
  }, [location.search]);

  // Validation functions
  const validateName = (name) => {
    if (name.length < 3) return false; 
    return /^[A-Za-z\s]+$/.test(name); 
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,3}$/.test(email) && email === email.toLowerCase();
  
  const validateCnic = (cnic) => cnic.length === 13 && /^\d{13}$/.test(cnic);
  const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  const validatePasswordMatch = (password, confirmPassword) => password === confirmPassword;

  const handleSignUp = () => setIsSignUp(true);
  const handleSignIn = () => setIsSignUp(false);

  const handleInputChange = (setter, validator, fieldName) => (e) => {
    let value = e.target.value;

    if (fieldName === "email") {
      value = value.toLowerCase(); // Ensure email is in lowercase
    }

    setter(value);

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (validator) {
        const isValid = validator(value);
        if (!isValid) {
          newErrors[fieldName] = getErrorMessage(fieldName, value);
        } else {
          delete newErrors[fieldName];
        }
      }
      return newErrors;
    });
  };

  const handleCnicChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    setCnic(value);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (!validateCnic(value)) {
        newErrors.cnic = getErrorMessage("cnic");
      } else {
        delete newErrors.cnic;
      }
      return newErrors;
    });
  };

  const getErrorMessage = (fieldName, value) => {
    const messages = {
      name: value?.length < 3 ? "Name must be at least 3 characters long." : "Name must only contain alphabetic characters and spaces.",
      email: "Invalid email address. Please use a valid format and ensure it is lowercase.",
      cnic: "CNIC must be exactly 13 digits.",
      password: "Password must be at least 8 characters long and include uppercase, lowercase, digit, and special character.",
      confirmPassword: "Passwords do not match.",
      role: "Please select a role.",
    };
    return messages[fieldName] || "Invalid input.";
  };

  const validateForm = () => {
    const newErrors = {};
    if (isSignUp) {
      if (!name || !validateName(name)) newErrors.name = getErrorMessage("name", name);
      if (!validateEmail(email)) newErrors.email = getErrorMessage("email");
      if (!validateCnic(cnic)) newErrors.cnic = getErrorMessage("cnic");
      if (!validatePassword(password)) newErrors.password = getErrorMessage("password");
      if (!validatePasswordMatch(password, confirmPassword)) newErrors.confirmPassword = getErrorMessage("confirmPassword");
    } else {
      if (!validateEmail(email)) newErrors.email = getErrorMessage("email");
    }

    if (!role) newErrors.role = getErrorMessage("role");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    const url = isSignUp ? 'http://localhost:3000/api/public/register' : 'http://localhost:3000/api/public/login';
    const payload = isSignUp ? { name, email, cnic, password, role } : { email, password, role };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        if (isSignUp) {
          setIsSignUp(false);
        } else {
          const { token, user } = data;
          if (user && user._id) {
            sessionStorage.setItem("loggedInUser ", user._id);
          }
          localStorage.setItem('token', token);
          navigate(`/${role}-dashboard`);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(`${isSignUp ? 'Sign Up' : 'Sign In'} Error: ${error.message}`);
    }
  };

  return (
    <div className="wrapper">
      <div className={`container ${isSignUp ? "active" : ""}`}>
        {/* Sign Up Form */}
        <div className="form-container sign-up">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <span>or use your email for registration</span>
            {isSignUp && (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={handleInputChange(setName, validateName, "name")}
                  style={{ borderColor: errors.name ? "red" : "" }}
                />
                {errors.name && <small className="error-message">{errors.name}</small>}
              </>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleInputChange(setEmail, validateEmail, "email")}
              style={{ borderColor: errors.email ? "red" : "" }}
            />
            {errors.email && <small className="error-message">{errors.email}</small>}
            <input
              type="text"
              placeholder="CNIC"
              value={cnic}
              onChange={handleCnicChange}
              maxLength={13}
              style={{ borderColor: errors.cnic ? "red" : "" }}
            />
            {errors.cnic && <small className="error-message">{errors.cnic}</small>}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleInputChange(setPassword, validatePassword, "password")}
              style={{ borderColor: errors.password ? "red" : "" }}
            />
            {errors.password && <small className="error-message">{errors.password}</small>}
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleInputChange(setConfirmPassword, (value) => validatePasswordMatch(password, value), "confirmPassword")}
              style={{ borderColor: errors.confirmPassword ? "red" : "" }}
            />
            {errors.confirmPassword && <small className="error-message">{errors.confirmPassword}</small>}
            <div className="role-toggle">
  <label htmlFor="customer" className={`role-label ${role === 'customer' ? 'active' : ''}`}>
    Customer
  </label>
  
  <div className="toggle-switch" onClick={() => setRole(role === 'customer' ? 'agent' : 'customer')}>
    <span className={`toggle-circle ${role === 'customer' ? 'customer' : 'agent'}`}></span>
  </div>
  
  <label htmlFor="agent" className={`role-label ${role === 'agent' ? 'active' : ''}`}>
    Agent
  </label>
</div>

            {errors.role && <small className="error-message">{errors.role}</small>}
            <button type="submit" disabled={Object.keys(errors).length > 0}>Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in">
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <span>or use your email and password</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleInputChange(setEmail, validateEmail, "email")}
              style={{ borderColor: errors.email ? "red" : "" }}
            />
            {errors.email && <small className="error-message">{errors.email}</small>}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleInputChange(setPassword)}
            />
            <div className="role-toggle">
  <label htmlFor="customer" className={`role-label ${role === 'customer' ? 'active' : ''}`}>
    Customer
  </label>
  
  <div className="toggle-switch" onClick={() => setRole(role === 'customer' ? 'agent' : 'customer')}>
    <span className={`toggle-circle ${role === 'customer' ? 'customer' : 'agent'}`}></span>
  </div>
  
  <label htmlFor="agent" className={`role-label ${role === 'agent' ? 'active' : ''}`}>
    Agent
  </label>
</div>


            {errors.role && <small className="error-message">{errors.role}</small>}
            <button type="submit">Sign In</button>
          </form>
        </div>

        {/* Toggle Panel */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left" onClick={handleSignIn}>
              <h1>Welcome Back!</h1>
              <p>To sign in, use your personal details</p>
              <button onClick={handleSignIn}>Sign In</button>
            </div>
            <div className="toggle-panel toggle-right" onClick={handleSignUp}>
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details</p>
              <button onClick={handleSignUp}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;