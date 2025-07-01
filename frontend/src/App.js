import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
const App = () => (
  <Router>
    <Navbar />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetails />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route path="/portfolio/:title" element={<Portfolio/>} />
            <Route path="/portfolio" element={<AllPortfolio />}/>
      </Routes>
    </main>
    <ChatBot/>
    <Footer />
  </Router>
);

export default App;
