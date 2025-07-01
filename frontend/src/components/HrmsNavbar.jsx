import React from 'react';
import { NavLink } from 'react-router-dom';
import './HRMSNavbar.css';

const HRMSNavbar = () => (
  <nav className="hrms-navbar">
    <NavLink to="/hrms/dashboard">Dashboard</NavLink>
    <NavLink to="/hrms/employees">Employees</NavLink>
    <NavLink to="/hrms/attendance">Attendance</NavLink>
    <NavLink to="/hrms/leaves">Leaves</NavLink>
    <NavLink to="/hrms/payroll">Payroll</NavLink>
  </nav>
);

export default HRMSNavbar;
