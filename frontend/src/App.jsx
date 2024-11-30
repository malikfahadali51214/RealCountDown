import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import Register from './Pages/Register/Register';
import Customer_Dashboard from './Components/Customer_Dashboard/Customer_Dashboard';
import Customer_Profile from './Components/Customer_Dashboard/Customer_Profile';
import Agent_Dashboard from './Components/Agent_Dashboard/Agent_Dashboard';
import AgentProfile from './Components/Agent_Dashboard/Agent_Profile';
import CountDownroom from './Components/Agent_Dashboard/countdown-room';
import ChatPage from './Components/Customer_Dashboard/ChatPage';
import PropertyRequirments from './Components/Customer_Dashboard/PropertyRequirments'; // Removed space
import PropertyManagment from './Components/Customer_Dashboard/PropertyManagment';
import ChangePasswordPage from './Components/Customer_Dashboard/ChangePasswordPage';
import ChangePassword from './Components/Agent_Dashboard/ChangePassword';
import ChatPageAgent from './Components/Agent_Dashboard/ChatPageAgent';
import PreviewProfile from './Components/Customer_Dashboard/PreviewProfile';
import PreviewProperty from './Components/Customer_Dashboard/PreviewProperty';
import ViewProperty from './Components/Agent_Dashboard/ViewProperty';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customer-dashboard" element={<Customer_Dashboard />} />
        <Route path="/customer-dashboard/propertyform" element={<PropertyRequirments />} />
        <Route path="/customer-dashboard/customer-profile" element={<Customer_Profile />} />
        <Route path="/customer-dashboard/change-password" element={<ChangePasswordPage />} />
        <Route path="/customer-dashboard/propertymanagment" element={<PropertyManagment />} />
        <Route path="/agent-dashboard" element={<Agent_Dashboard />} />
        <Route path="/agent-dashboard/countdown-room" element={<CountDownroom />} />
        <Route path="/customer-dashboard/PreviewProperty/:propertyId" element={<PreviewProperty />} />
        <Route path="/agent-dashboard/countdown-room/property/:propertyId" element={<ViewProperty />} />
        <Route path="/customer-dashboard/chat" element={<ChatPage />} />
        <Route path="/agent-dashboard/agent-profile" element={<AgentProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/agent-dashboard/change-password" element={<ChangePassword />} />
        <Route path="/agent-dashboard/chat" element={<ChatPageAgent />} />
        <Route path="/agent-dashboard/preview-profile" element={<PreviewProfile />} />
      </Routes>
    </div>
  );
}

export default App;