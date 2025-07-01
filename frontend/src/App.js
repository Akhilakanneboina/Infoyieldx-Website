import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/Chatbot';

import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails'; 
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import AllPortfolio from './pages/AllPortfolio';
import Portfolio from './pages/Portfolio';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// HRMS
import HRMSNavbar from './components/HrmsNavbar';
import EmployeeList from './pages/hrms/EmployeeList';
import Attendance from './pages/hrms/Attendance';
import LeaveRequests from './pages/hrms/LeaveRequest';
import Payroll from './pages/hrms/PayRoll';
import Dashboard from './pages/hrms/Dashboard'; // <== Add this if not already

// Wrapper to show HRMSNavbar conditionally
const Layout = ({ children }) => {
  const location = useLocation();
  const isHRMS = location.pathname.startsWith('/hrms');

  return (
    <>
      <Navbar />
      {isHRMS && <HRMSNavbar />}
      <main>{children}</main>
      <ChatBot />
      <Footer />
    </>
  );
};

const App = () => (
  <Router>
    <Layout>
      <Routes>
        {/* General Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/portfolio/:title" element={<Portfolio />} />
        <Route path="/portfolio" element={<AllPortfolio />} />

        {/* HRMS Routes */}
        <Route path="/hrms/dashboard" element={<Dashboard />} />
        <Route path="/hrms/employees" element={<EmployeeList />} />
        <Route path="/hrms/attendance" element={<Attendance />} />
        <Route path="/hrms/leaves" element={<LeaveRequests />} />
        <Route path="/hrms/payroll" element={<Payroll />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;
